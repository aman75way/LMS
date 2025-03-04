import { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, MenuItem, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCourses } from "../store/slices/courseSlice";
import CourseCard from "../components/CourseCard";
import { motion } from "motion/react";

const CoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses.courses);
  const loading = useSelector((state: RootState) => state.courses.loading);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) =>
        categoryFilter ? course.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true
      )
    );
  }, [categoryFilter, courses]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 6 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
          Explore Courses
        </Typography>
      </motion.div>

      {/* Category Filter */}
      <Box sx={{ mt: 2, width: "80%", display: "flex", justifyContent: "center" }}>
        <TextField
          select
          label="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ width: "250px" }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {Array.from(new Set(courses.map((course) => course.category))).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Course Listings */}
      <Box sx={{ mt: 4, textAlign: "center", width: "90%" }}>
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <CourseCard course={course} />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ mt: 4 }}>
                No courses available.
              </Typography>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CoursesPage;
