import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/lectures`;

export const fetchLectures = createAsyncThunk("lectures/fetchByCourse", async (courseId) => {
  const response = await axios.get(`${API_URL}/${courseId}`);
  return response.data;
});

export const fetchLecture = createAsyncThunk("lectures/fetchOne", async (id) => {
  const response = await axios.get(`${API_URL}/single/${id}`);
  return response.data;
});

const lectureSlice = createSlice({
  name: "lectures",
  initialState: { lectures: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLectures.fulfilled, (state, action) => {
      state.lectures = action.payload;
    });
  },
});

export default lectureSlice.reducer;
