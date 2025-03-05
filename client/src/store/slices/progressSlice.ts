import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../service/authService";

const API_URL = `${import.meta.env.VITE_API_URL}/progress`;

// ---------------- Thunks ----------------

// Fetch progress for a specific course
export const getProgressCourse = createAsyncThunk<Progress[], string>(
  "progress/getProgressCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Progress[]>(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch course progress");
    }
  }
);

// Fetch course completion percentage
export const getProgressCoursePercentage = createAsyncThunk<number, string>(
  "progress/getProgressCoursePercentage",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ completionPercentage: number }>(`${API_URL}/${courseId}/completion`);
      return response.data.completionPercentage;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch course completion percentage");
    }
  }
);

// Create or update progress for a lecture in a course
export const createProgress = createAsyncThunk<Progress, { courseId: string; lectureId: string }>(
  "progress/createProgress",
  async ({ courseId, lectureId }, { rejectWithValue }) => {
    try {
      const response = await axios.post<Progress>(`${API_URL}/`, { courseId, lectureId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update progress");
    }
  }
);

// ---------------- Initial State ----------------

const initialState: ProgressState = {
  progress: [],
  loading: false,
  error: null,
};

// ---------------- Slice ----------------

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProgressCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgressCourse.fulfilled, (state, action: PayloadAction<Progress[]>) => {
        state.progress = action.payload;
        state.loading = false;
      })
      .addCase(getProgressCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch course progress";
      })

      .addCase(getProgressCoursePercentage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgressCoursePercentage.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        // Assuming we might store completion percentage in the state later
      })
      .addCase(getProgressCoursePercentage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch course completion percentage";
      })

      .addCase(createProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProgress.fulfilled, (state, action: PayloadAction<Progress>) => {
        state.progress.push(action.payload);
        state.loading = false;
      })
      .addCase(createProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update progress";
      });
  },
});

export default progressSlice.reducer;
