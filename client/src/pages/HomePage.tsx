import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { motion } from "motion/react";
import CourseCard from "../components/CourseCard";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useState, useEffect } from "react";
import { fetchCourses } from "../store/slices/courseSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const courses = useSelector((state: RootState) => state.courses.courses);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const coursesPerPage = 9;

  const [filters, setFilters] = useState({ category: "" });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      filters.category
        ? course.category.toLowerCase().includes(filters.category.toLowerCase())
        : true
    );
    setFilteredCourses(filtered);
  }, [filters, courses]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [page]);

  const displayedCourses = filteredCourses.slice(0, page * coursesPerPage);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white", paddingBottom: 6 }}>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginTop: "5rem" }}>
        <Typography variant="h1" sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "2rem", md: "3.5rem" } }}>
          Learn from the Best Instructors
        </Typography>
        <Typography variant="h5" sx={{ color: "#333", mt: 2, mb: 4, fontSize: { xs: "1rem", md: "1.5rem" } }}>
          Explore top courses to upskill yourself
        </Typography>
        {!user && (
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Button variant="contained" onClick={() => navigate("/signup")} sx={{ backgroundColor: "black", color: "white", px: 4, py: 1.5, borderRadius: "20px", "&:hover": { backgroundColor: "#333" } }}>
              Sign Up
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Filters */}
      <Box sx={{ mt: 6, width: "80%", display: "flex", justifyContent: "center" }}>
        <TextField select label="Category" name="category" value={filters.category} onChange={(e) => setFilters({ category: e.target.value })} sx={{ width: "250px" }}>
          <MenuItem value="">All Categories</MenuItem>
          {Array.from(new Set(courses.map((course) => course.category))).map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Course Listings */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "black" }}>
          Available Courses
        </Typography>

        <Grid container spacing={4} sx={{ maxWidth: "90vw", px: 2, justifyContent: "center" }}>
          {loading
            ? Array.from({ length: 9 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "16px" }} />
                </Grid>
              ))
            : displayedCourses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
                    <CourseCard course={course} />
                  </motion.div>
                </Grid>
              ))}
        </Grid>
      </Box>

      {/* Load More Button */}
      {displayedCourses.length < filteredCourses.length && (
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <Button variant="contained" onClick={() => setPage((prev) => prev + 1)} sx={{ mt: 4, backgroundColor: "black", color: "white", px: 4, py: 1.5, borderRadius: "20px", "&:hover": { backgroundColor: "#333" } }}>
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Load More Courses"}
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default HomePage;
