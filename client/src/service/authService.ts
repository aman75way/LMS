import axios from "axios";
import { logout, refreshToken } from "../store/slices/authSlice";
import type { RootState } from "../store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

// Create a function to attach authentication logic
export const attachAuthInterceptor = (dispatch: ThunkDispatch<RootState, void, any>) => {
  axios.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        try {
          const newToken = await dispatch(refreshToken()).unwrap();
          token = newToken;
          localStorage.setItem("accessToken", newToken);
        } catch (error) {
          dispatch(logout());
          return Promise.reject(error);
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axios;