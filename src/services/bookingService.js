import api, { extractApiResponse } from "./api";
import { USE_BACKEND_API } from "../config/apiConfig";

/**
 * Booking API Service - Aligned with backend endpoints
 *
 * API Spec:
 * - POST /api/bookings: Create booking
 * - GET /api/bookings/my: Get user bookings
 * - GET /api/bookings: Get all bookings (staff/admin)
 * - GET /api/bookings/{id}: Get booking detail
 * - PUT /api/bookings/{id}: Update/Cancel booking
 * - DELETE /api/bookings/{id}: Delete booking
 *
 * Response Format: { status: "success"/"error", message: "...", data: {...} }
 */

// POST /api/bookings - Create new booking
export const createBooking = async (bookingData) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] POST /api/bookings (commented)", bookingData);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.post("/bookings", bookingData);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Tạo đơn đặt thất bại",
      data: null,
    };
  }
};

// GET /api/bookings/my - Get user booking history
export const getMyBookings = async () => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/bookings/my (commented)");
    return { success: false, status: "error", message: "Demo mode", data: [] };
  }
  try {
    const response = await api.get("/bookings/my");
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy lịch sử đặt vé thất bại",
      data: [],
    };
  }
};

// GET /api/bookings - Get all bookings (staff/admin)
export const getAllBookings = async () => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/bookings (commented)");
    return { success: false, status: "error", message: "Demo mode", data: [] };
  }
  try {
    const response = await api.get("/bookings");
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy danh sách đặt vé thất bại",
      data: [],
    };
  }
};

// GET /api/bookings/{id} - Get booking details
export const getBookingDetail = async (id) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/bookings/{id} (commented)", id);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.get(`/bookings/${id}`);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy chi tiết đặt vé thất bại",
      data: null,
    };
  }
};

// PUT /api/bookings/{id} - Update/Cancel booking
export const updateBooking = async (id, data) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] PUT /api/bookings/{id} (commented)", id, data);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.put(`/bookings/${id}`, data);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Cập nhật đặt vé thất bại",
      data: null,
    };
  }
};

// DELETE /api/bookings/{id} - Delete booking
export const deleteBooking = async (id) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] DELETE /api/bookings/{id} (commented)", id);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.delete(`/bookings/${id}`);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Xóa đặt vé thất bại",
      data: null,
    };
  }
};

// Alias
export const myBookings = () => getMyBookings();
export const cancelBooking = (id) => updateBooking(id, { status: "cancelled" });
