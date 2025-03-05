import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../service/authService";

const API_URL = `${import.meta.env.VITE_API_URL}/enrollments`;

// ---------------- Thunks ----------------

// Enroll in a course
export const enrollCourse = createAsyncThunk<Enrollment, string>(
  "enrollments/enroll",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.post<Enrollment>(`${API_URL}/`, { courseId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Enrollment failed");
    }
  }
);

// Get enrollments for the logged-in user
export const getUserEnrollments = createAsyncThunk<Enrollment[]>(
  "enrollments/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Enrollment[]>(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user enrollments");
    }
  }
);

// Get enrollments for a specific course
export const getCourseEnrollments = createAsyncThunk<Enrollment[], string>(
  "enrollments/getCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Enrollment[]>(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch course enrollments");
    }
  }
);

// ---------------- Initial State ----------------

const initialState: EnrollmentState = {
  enrollments: [],
  loading: false,
  error: null,
};

// ---------------- Slice ----------------

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action: PayloadAction<Enrollment>) => {
        state.enrollments.push(action.payload);
        state.loading = false;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Enrollment failed";
      })

      .addCase(getUserEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        state.enrollments = action.payload;
        state.loading = false;
      })
      .addCase(getUserEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch enrollments";
      })

      .addCase(getCourseEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        state.enrollments = action.payload;
        state.loading = false;
      })
      .addCase(getCourseEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch course enrollments";
      });
  },
});

export default enrollmentSlice.reducer;
