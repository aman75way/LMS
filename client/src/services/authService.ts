import axios from "axios";
import { store } from "../store/store";
import { loginStart, loginEnd, signUpStart, signUpUser, signUpEnd, logout, userUpdate } from "../store/slices/authSlice";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`; // Adjust if needed

// ---------------- Sign Up ----------------
export const signUp = async (fullName: string, email: string, password: string, role: "STUDENT" | "INSTRUCTOR") => {
  store.dispatch(signUpStart());
  
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      fullName,
      email,
      password,
      confirmPassword: password,
      role,
    });

    store.dispatch(signUpUser(response.data.user));
    return response.data;
  } catch (error: any) {
    store.dispatch(signUpEnd());
    throw new Error(error.response?.data?.message || "Sign-up failed");
  }
};

// ---------------- Log In ----------------
export const logIn = async (email: string, password: string) => {
  store.dispatch(loginStart());

  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    store.dispatch(userUpdate(response.data.user));
    store.dispatch(loginEnd());
    return response.data;
  } catch (error: any) {
    store.dispatch(loginEnd());
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// ---------------- Log Out ----------------
export const logOut = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    store.dispatch(logout());
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

// ---------------- Fetch User ----------------
export const fetchUser = async (dispatch: any) => {
  try {
    const response = await axios.get(`${API_URL}/`);
    dispatch(userUpdate(response.data.user));
  } catch (error) {
    console.error("Failed to fetch user", error);
  }
};

// ---------------- Refresh Token ----------------
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) throw new Error("No refresh token found");

    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });

    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Token refresh failed");
  }
};

// ---------------- Attach Authorization Token to Requests ----------------
axios.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      token = await refreshAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
