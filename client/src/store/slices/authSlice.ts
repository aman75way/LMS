import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// ---------------- Thunks ----------------

export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error : any) {
    return rejectWithValue(error.response?.data || "Signup failed");
  }
});

export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error : any) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`);
    return response.data;
  } catch (error : any) {
    return rejectWithValue(error.response?.data || "Token refresh failed");
  }
});

// ---------------- Initial State ----------------

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

// ---------------- Slice ----------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        const { password, ...userWithoutPassword } = action.payload.user;
        state.user = userWithoutPassword;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        const { password, ...userWithoutPassword } = action.payload.user;
        state.user = userWithoutPassword;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
