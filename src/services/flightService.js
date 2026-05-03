import api, { extractApiResponse } from "./api";
import { USE_BACKEND_API } from "../config/apiConfig";

/**
 * Flight API Service
 * Response Format: { status: "success"/"error", message: "...", data: {...} }
 */

export const searchFlights = async (params) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/flights/search (commented)", params);
    return { success: false, status: "error", message: "Demo mode", data: [] };
  }
  try {
    const response = await api.get("/flights/search", { params });
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Tìm kiếm chuyến bay thất bại",
      data: [],
    };
  }
};

export const getAllFlights = async () => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/flights (commented)");
    return { success: false, status: "error", message: "Demo mode", data: [] };
  }
  try {
    const response = await api.get("/flights");
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy danh sách chuyến bay thất bại",
      data: [],
    };
  }
};
