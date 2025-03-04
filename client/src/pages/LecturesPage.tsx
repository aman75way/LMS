import React, { useEffect, useState } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../store/slices/lectureSlice";
import { getUserPurchases, initiatePurchase } from "../store/slices/purchaseSlice";
import { AppDispatch, RootState } from "../store/store";
import LecturePlayer from "../components/LecturePlayer";

const LecturesPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const lectures = useSelector((state: RootState) => state.lectures.lectures);
  const purchases = useSelector((state: RootState) => state.purchase.purchases);
  const user = useSelector((state: RootState) => state.auth.user);

  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

  // Check if user has purchased this course
  const hasPurchased = purchases.some((purchase : Purchase) => purchase.courseId === courseId);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLectures(courseId));
      dispatch(getUserPurchases());
    }
  }, [dispatch, courseId]);

  const handleBuyCourse = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(initiatePurchase({ courseId, amount: 49.99 }))
      .unwrap()
      .then(() => {
        dispatch(getUserPurchases());
      });
  };

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Course Lectures
      </Typography>

      {hasPurchased ? (
        <List>
          {lectures.map((lecture) => (
            <React.Fragment key={lecture.id}>
              <ListItem button onClick={() => setSelectedLecture(lecture.contentUrl)}>
                <ListItemText primary={lecture.title} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box>
          <Typography variant="h6" color="error" sx={{ mt: 3, mb: 2 }}>
            You need to purchase this course to access lectures.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleBuyCourse}>
            Buy Course
          </Button>
        </Box>
      )}

      {/* Video Player */}
      {selectedLecture && (
        <Box sx={{ mt: 4 }}>
          <LecturePlayer videoUrl={selectedLecture} />
        </Box>
      )}
    </Box>
  );
};

export default LecturesPage;
