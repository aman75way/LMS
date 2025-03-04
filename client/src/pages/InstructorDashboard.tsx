import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import AddCourseModal from "../components/AddCourseModal";
import { motion } from "motion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchCourses, deleteCourse } from "../store/slices/courseSlice";
import { toast } from "react-toastify";

const InstructorDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; courseId: string | null }>({
    open: false,
    courseId: null,
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const courses = useSelector((state: RootState) => state.courses.courses);
  const instructor = useSelector((state: RootState) => state.auth.user);

  const instructorCourses = instructor ? courses.filter((course) => course.instructorId === instructor.id) : [];

  const handleDeleteCourse = () => {
    if (confirmDelete.courseId) {
      dispatch(deleteCourse(confirmDelete.courseId));
      toast.success("Course Deleted Successfully!");
    }
    setConfirmDelete({ open: false, courseId: null });
  };

  return (
    <Box sx={{ margin: "80px 0" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "900px",
            padding: { xs: "20px", md: "40px" },
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 3 }}>
            Instructor Dashboard
          </Typography>

          {/* Add Course Button */}
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "#333" },
                padding: "12px 24px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
              onClick={() => setOpen(true)}
            >
              + Create New Course
            </Button>
          </Box>

          {/* Course Listings */}
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, textAlign: "center" }}>
            Your Courses
          </Typography>

          {instructorCourses.length > 0 ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {instructorCourses.map((course) => (
                <Grid item xs={12} sm={6} key={course.id}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        padding: "20px",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(12px)",
                        position: "relative",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                          {course.title}
                        </Typography>
                        <Typography sx={{ color: "gray" }}>Category: {course.category}</Typography>
                        <Typography sx={{ color: "gray" }}>Price: ${course.price}</Typography>

                        {/* Delete Button */}
                        <IconButton
                          onClick={() => setConfirmDelete({ open: true, courseId: course.id })}
                          sx={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            color: "red",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="body1"
              sx={{
                mt: 3,
                color: "gray",
                textAlign: "center",
                fontStyle: "italic",
                fontSize: "18px",
                padding: "20px",
              }}
            >
              No courses created yet.
            </Typography>
          )}
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, courseId: null })}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this course?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete({ open: false, courseId: null })}>Cancel</Button>
            <Button onClick={handleDeleteCourse} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <AddCourseModal open={open} handleClose={() => setOpen(false)} />
      </motion.div>
    </Box>
  );
};

export default InstructorDashboard;
