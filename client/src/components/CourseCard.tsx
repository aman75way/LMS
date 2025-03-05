import { Box, Typography, Button } from "@mui/material";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { enrollCourse } from "../store/slices/enrollmentSlice";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const handleEnroll = (event: any) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    dispatch(enrollCourse(course.id))
      .unwrap()
      .finally(() => setLoading(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: "16px",
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
          width: "100%",
          maxWidth: 350,
          margin: "auto",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            transform: "scale(1.05)",
          },
        }}
        data-course-id={course.id}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "black" }}>
          {course.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "black" }}>
          Category: {course.category}
        </Typography>
        <Typography variant="body2" sx={{ color: "black" }}>
          Price: ${course.price.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
            borderRadius: "12px",
            width: "100%",
          }}
          onClick={() => navigate(`/course/${course.id}`)}
        >
          View Course
        </Button>

        {/* {user && user.role === "STUDENT" && (
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#007bff",
              color: "white",
              "&:hover": { backgroundColor: "#0056b3" },
              borderRadius: "12px",
              width: "100%",
            }}
            onClick={handleEnroll}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Enroll Now"}
          </Button>
        )} */}
      </Box>
    </motion.div>
  );
};

export default CourseCard;
