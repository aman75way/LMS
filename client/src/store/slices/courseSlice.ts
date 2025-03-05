import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../service/authService";

const API_URL = `${import.meta.env.VITE_API_URL}/courses`;

// ---------------- Thunks ----------------

// Fetch all courses
export const fetchCourses = createAsyncThunk<Course[]>("courses/fetchAll", async () => {
  const response = await axios.get<Course[]>(API_URL);
  console.log(response.data);
  return response.data;
});

// Fetch a single course by ID
export const fetchCourse = createAsyncThunk<Course, string>("courses/fetchOne", async (id) => {
  const response = await axios.get<Course>(`${API_URL}/${id}`);
  return response.data;
});

// Create a new course
export const createCourse = createAsyncThunk<Course, Omit<Course, "id" | "createdAt" | "updatedAt">>(
  "courses/create",
  async (course) => {
    const response = await axios.post<Course>(API_URL, course);
    return response.data;
  }
);

// Delete a course by ID
export const deleteCourse = createAsyncThunk<string, string>("courses/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// ---------------- Initial State ----------------

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

// ---------------- Slice ----------------

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch courses";
      })

      .addCase(fetchCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch course";
      })

      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.courses.push(action.payload);
        state.loading = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create course";
      })

      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<string>) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete course";
      });
  },
});

export default courseSlice.reducer;
