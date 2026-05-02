import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add MaCN header for branch staff if available
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.MaCN) {
      config.headers["MaCN"] = user.MaCN;
    }
  } catch (e) {
    // Ignore parsing errors
  }

  return config;
});

/**
 * Normalize API response format for consistent handling
 * API always returns: { status, message, data }
 * Axios wraps it: { data: { status, message, data }, status: 200, ... }
 */
export const extractApiResponse = (axiosResponse) => {
  const responseBody = axiosResponse?.data || axiosResponse;
  return {
    status: responseBody?.status || "error",
    message: responseBody?.message || "",
    data: responseBody?.data || null,
    success: responseBody?.status === "success" || false,
  };
};

export default api;
