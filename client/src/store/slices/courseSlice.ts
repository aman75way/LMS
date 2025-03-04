import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/courses`;

export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchCourse = createAsyncThunk("courses/fetchOne", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const createCourse = createAsyncThunk("courses/create", async (course) => {
  const response = await axios.post(API_URL, course);
  return response.data;
});

export const deleteCourse = createAsyncThunk("courses/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const courseSlice = createSlice({
  name: "courses",
  initialState: { courses: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      });
  },
});

export default courseSlice.reducer;
