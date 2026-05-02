import api, { extractApiResponse } from "./api";
import { USE_BACKEND_API } from "../config/apiConfig";

/**
 * Payment API Service - Aligned with backend endpoints
 *
 * API Spec:
 * - POST /api/payments: Create payment
 * - GET /api/payments: Get all payments
 * - GET /api/payments/{id}: Get payment detail
 * - PUT /api/payments/{id}: Update payment status
 * - DELETE /api/payments/{id}: Delete payment
 *
 * Response Format: { status: "success"/"error", message: "...", data: {...} }
 */

// POST /api/payments - Create new payment
export const createPayment = async (paymentData) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] POST /api/payments (commented)", paymentData);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.post("/payments", paymentData);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Tạo thanh toán thất bại",
      data: null,
    };
  }
};

// GET /api/payments - Get all payments
export const getAllPayments = async () => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/payments (commented)");
    return { success: false, status: "error", message: "Demo mode", data: [] };
  }
  try {
    const response = await api.get("/payments");
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy danh sách thanh toán thất bại",
      data: [],
    };
  }
};

// GET /api/payments/{id} - Get payment details
export const getPaymentDetail = async (id) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/payments/{id} (commented)", id);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.get(`/payments/${id}`);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy chi tiết thanh toán thất bại",
      data: null,
    };
  }
};

// PUT /api/payments/{id} - Update payment status
export const updatePayment = async (id, data) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] PUT /api/payments/{id} (commented)", id, data);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.put(`/payments/${id}`, data);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Cập nhật thanh toán thất bại",
      data: null,
    };
  }
};

// DELETE /api/payments/{id} - Delete payment
export const deletePayment = async (id) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] DELETE /api/payments/{id} (commented)", id);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.delete(`/payments/${id}`);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Xóa thanh toán thất bại",
      data: null,
    };
  }
};
