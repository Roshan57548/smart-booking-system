/**
 * Axios API Client (Clean Version - No Auth)
 * -----------------------------------------
 * Centralized HTTP layer using Axios.
 *
 * Responsibilities:
 * - Base URL configuration (env-based)
 * - Default headers
 * - Response normalization
 * - Global error handling (basic)
 */

import axios from "axios";

/**
 * Create Axios instance
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // e.g. http://127.0.0.1:8000/api
  withCredentials: false, // No auth for now
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Response Interceptor
 * --------------------
 * Simplifies response handling across app
 */
api.interceptors.response.use(
  (response) => {
    /**
     * If backend wraps response like:
     * { success: true, data: {...} }
     * → return only data
     */
    if (response.data?.data !== undefined) {
      return response.data.data;
    }

    return response.data;
  },
  (error) => {
    /**
     * Global Error Handling (Basic)
     */
    if (error.response) {
      const { status, data } = error.response;

      console.error(`API Error [${status}]:`, data?.message || "Unknown error");

      switch (status) {
        case 400:
          console.error("Bad Request");
          break;
        case 404:
          console.error("Resource Not Found");
          break;
        case 500:
          console.error("Server Error");
          break;
      }
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Wrapper methods → keeps service layer clean
 */
export const ApiClient = {
  get: <T>(url: string) => api.get<T>(url) as any,
  post: <T>(url: string, data?: any) => api.post<T>(url, data) as any,
};

export default api;