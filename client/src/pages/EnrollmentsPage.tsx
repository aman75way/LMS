import React, { useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, LinearProgress, Button, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserEnrollments } from "../store/slices/enrollmentSlice";
import { getUserProgress } from "../store/slices/progressSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const EnrollmentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const enrollments = useSelector((state: RootState) => state.enrollments.enrollments);
  const progressData = useSelector((state: RootState) => state.progress.progress);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(getUserEnrollments());
    dispatch(getUserProgress());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        My Enrolled Courses
      </Typography>

      {enrollments.length === 0 ? (
        <Typography variant="h6" color="error">
          You are not enrolled in any courses yet.
        </Typography>
      ) : (
        <List>
          {enrollments.map((enrollment) => {
            const progress = progressData.find((p) => p.courseId === enrollment.courseId)?.progress || 0;
            return (
              <React.Fragment key={enrollment.courseId}>
                <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <ListItemText primary={enrollment.courseTitle} secondary={`Progress: ${progress.toFixed(2)}%`} />
                  <Box sx={{ width: "50%", mr: 2 }}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/course/${enrollment.courseId}/lectures`)}
                  >
                    Continue
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default EnrollmentsPage;
