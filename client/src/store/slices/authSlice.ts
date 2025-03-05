import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/authService";
import {store} from "../store"

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// ---------------- Thunks ----------------


// Signup Thunk
export const signup = createAsyncThunk<User, SignupData>(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      localStorage.setItem("accessToken", response.data.user.accessToken);
      localStorage.setItem("refreshToken", response.data.user.refreshToken);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Login Thunk
export const login = createAsyncThunk<User, { email: string; password: string }>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Refresh Token Thunk
export const refreshToken = createAsyncThunk<string>(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");

      const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error: any) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return rejectWithValue(error.response?.data?.message || "Token refresh failed");
    }
  }
);

// Fetch Logged-In User Thunk
export const fetchUser = createAsyncThunk<User>(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Fetching user failed");
    }
  }
);

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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => { state.isLoading = true; })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state) => { state.isLoading = false; })

      // Login cases
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => { state.isLoading = false; })

      // Refresh Token case
      .addCase(refreshToken.fulfilled, (state, action) => {
        localStorage.setItem("accessToken", action.payload);
      })

      // Fetch user case
      .addCase(fetchUser.pending, (state) => { state.isLoading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => { state.isLoading = false; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
