import axios from 'axios';
import { refreshTokenService } from '../services';
import store from "../store/store";
import { clearUser } from "../store/slices/auth.slice";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});

export const privateApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});

privateApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if(
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await refreshTokenService();
        return privateApiClient(originalRequest);
      } catch (error) {
        store.dispatch(clearUser());

        return Promise.reject({
          success: false,
          status: 401,
          message: "Session expired. Please login again.",
        });
      }
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        success: false,
        message: "Request timeout. Please try again."
      });
    }

    return Promise.reject({
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || error.message || "Something went wrong"
    });
  }
);