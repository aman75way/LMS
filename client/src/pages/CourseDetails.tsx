import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCourse } from "../store/slices/courseSlice";
import { fetchLectures } from "../store/slices/lectureSlice";
import { enrollCourse } from "../store/slices/enrollmentSlice";
import { initiatePurchase, getUserPurchases } from "../store/slices/purchaseSlice";
import LecturePlayer from "../components/LecturePlayer";
import { motion } from "motion/react";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const course = useSelector((state: RootState) => state.courses.courses.find((c) => c.id === id));
  const lectures = useSelector((state: RootState) => state.lectures.lectures);
  const isPurchased = useSelector((state: RootState) => state.purchase.purchases.some((p) => p.courseId === id));
  const loading = useSelector((state: RootState) => state.courses.loading);

  const [buying, setBuying] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourse(id));
      dispatch(fetchLectures(id));
      if (user) {
        dispatch(getUserPurchases());
      }
    }
  }, [dispatch, id, user]);

  const handlePurchase = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setBuying(true);
    try {
      await dispatch(initiatePurchase({ courseId: id!, amount: course?.price || 0 })).unwrap();
    } finally {
      setBuying(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    await dispatch(enrollCourse(id!));
  };

  return (
    <Box sx={{ minHeight: "100vh", padding: 4 }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
      ) : (
        <>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
              {course?.title}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center", color: "gray", mb: 4 }}>
              {course?.description}
            </Typography>
          </motion.div>

          {/* Course Details */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Lectures
              </Typography>

              {lectures.length === 0 ? (
                <Typography>No lectures available for this course.</Typography>
              ) : (
                <Grid container spacing={2}>
                  {lectures.map((lecture) => (
                    <Grid item xs={12} key={lecture.id}>
                      <Card
                        sx={{
                          borderRadius: "12px",
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                          cursor: isPurchased ? "pointer" : "default",
                          backgroundColor: isPurchased ? "white" : "rgba(200,200,200,0.2)",
                          backdropFilter: isPurchased ? "none" : "blur(5px)",
                        }}
                        onClick={() => isPurchased && setSelectedLecture(lecture.contentUrl)}
                      >
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold">
                            {lecture.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "gray" }}>
                            Duration: {lecture.duration} min
                          </Typography>
                          {!isPurchased && (
                            <Typography sx={{ color: "red", fontSize: "14px" }}>
                              Purchase required to access
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: 3, borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Course Information
                </Typography>
                <Typography variant="body1">
                  <b>Category:</b> {course?.category}
                </Typography>
                <Typography variant="body1">
                  <b>Price:</b> ${course?.price?.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  <b>Instructor:</b> {course?.instructorId}
                </Typography>

                {!isPurchased ? (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}
                    onClick={handlePurchase}
                    disabled={buying}
                  >
                    {buying ? <CircularProgress size={24} sx={{ color: "white" }} /> : `Buy for $${course?.price}`}
                  </Button>
                ) : (
                  <Typography sx={{ mt: 2, color: "green", fontWeight: "bold", textAlign: "center" }}>
                    You own this course
                  </Typography>
                )}

                {!isPurchased && user?.role === "STUDENT" && (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: "#007bff", color: "white", "&:hover": { backgroundColor: "#0056b3" } }}
                    onClick={handleEnroll}
                  >
                    Enroll for Free Preview
                  </Button>
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Lecture Player */}
          {selectedLecture && isPurchased && <LecturePlayer videoUrl={selectedLecture} />}
        </>
      )}
    </Box>
  );
};

export default CourseDetails;
