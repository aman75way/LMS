import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../service/authService";

const API_URL = `${import.meta.env.VITE_API_URL}/lectures`;

// ---------------- Thunks ----------------

export const fetchLectures = createAsyncThunk<Lecture[], string>(
  "lectures/fetchByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Lecture[]>(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch lectures");
    }
  }
);

export const fetchLecture = createAsyncThunk<Lecture, string>(
  "lectures/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<Lecture>(`${API_URL}/single/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch lecture");
    }
  }
);

export const createLecture = createAsyncThunk<Lecture, { courseId: string; title: string; contentUrl: string; duration: number }>(
  "lectures/create",
  async ({ courseId, title, contentUrl, duration }, { rejectWithValue }) => {
    try {
      const response = await axios.post<Lecture>(`${API_URL}/`, { courseId, title, contentUrl, duration });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create lecture");
    }
  }
);

export const deleteLecture = createAsyncThunk<string, string>(
  "lectures/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete lecture");
    }
  }
);

// ---------------- Initial State ----------------

const initialState: LectureState = {
  lectures: [],
  loading: false,
  error: null,
};

// ---------------- Slice ----------------

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLectures.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLectures.fulfilled, (state, action: PayloadAction<Lecture[]>) => {
        state.lectures = action.payload;
        state.loading = false;
      })
      .addCase(fetchLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch lectures";
      })

      .addCase(fetchLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLecture.fulfilled, (state, action: PayloadAction<Lecture>) => {
        state.lectures.push(action.payload);
        state.loading = false;
      })
      .addCase(fetchLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch lecture";
      })

      .addCase(createLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLecture.fulfilled, (state, action: PayloadAction<Lecture>) => {
        state.lectures.push(action.payload);
        state.loading = false;
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create lecture";
      })

      .addCase(deleteLecture.fulfilled, (state, action: PayloadAction<string>) => {
        state.lectures = state.lectures.filter((lecture) => lecture.id !== action.payload);
      })
      .addCase(deleteLecture.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete lecture";
      });
  },
});

export default lectureSlice.reducer;
