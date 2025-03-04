import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addCourse } from "../store/slices/courseSlice";
import { toast } from "react-toastify";

interface AddCourseModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const instructor = useSelector((state: RootState) => state.auth.user);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  // Submit Course
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!courseData.title || !courseData.description || !courseData.category || !courseData.price || !instructor) {
      toast.error("All fields are required!");
      return;
    }

    const newCourse = {
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      price: parseFloat(courseData.price),
      instructorId: instructor.id,
    };

    try {
      await dispatch(addCourse(newCourse));
      toast.success("Course Created Successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to create course.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          width: 420,
          margin: "auto",
          mt: "10vh",
          background: "rgba(255, 255, 255, 0.15)", // Glassmorphism Effect
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          Create New Course
        </Typography>
        
        <TextField label="Title" name="title" fullWidth onChange={handleChange} sx={{ mt: 2 }} />
        <TextField label="Description" name="description" fullWidth multiline rows={3} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField label="Category" name="category" fullWidth onChange={handleChange} sx={{ mt: 2 }} />
        <TextField label="Price (USD)" name="price" type="number" fullWidth onChange={handleChange} sx={{ mt: 2 }} />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "black", color: "white", "&:hover": { bgcolor: "#333" } }}
          onClick={handleSubmit}
        >
          Create Course
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCourseModal;
