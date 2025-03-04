import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/enrollments`;

export const enrollCourse = createAsyncThunk("enrollments/enroll", async (courseId) => {
  const response = await axios.post(`${API_URL}/`, { courseId });
  return response.data;
});

export const getUserEnrollments = createAsyncThunk("enrollments/getUser", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState: { enrollments: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(enrollCourse.fulfilled, (state, action) => {
      state.enrollments.push(action.payload);
    });
  },
});

export default enrollmentSlice.reducer;
