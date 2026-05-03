import api, { extractApiResponse } from "./api";
import { USE_BACKEND_API } from "../config/apiConfig";

/**
 * Ticket API Service - Aligned with backend endpoints
 *
 * API Spec:
 * - GET /api/tickets: Get all tickets
 * - POST /api/tickets: Create ticket
 * - PUT /api/tickets/{id}: Update ticket
 * - DELETE /api/tickets/{id}: Delete ticket
 *
 * Response Format: { status: "success"/"error", message: "...", data: {...} }
 */

// GET /api/tickets - Get all issued tickets
export const getAllTickets = async () => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/tickets (commented)");
    return { success: false, status: "error", message: "Demo mode", data: [] };
  }
  try {
    const response = await api.get("/tickets");
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy danh sách vé thất bại",
      data: [],
    };
  }
};

// POST /api/tickets - Add ticket
export const createTicket = async (ticketData) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] POST /api/tickets (commented)", ticketData);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.post("/tickets", ticketData);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message || error?.message || "Thêm vé thất bại",
      data: null,
    };
  }
};

// PUT /api/tickets/{id} - Edit ticket info
export const updateTicket = async (id, data) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] PUT /api/tickets/{id} (commented)", id, data);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.put(`/tickets/${id}`, data);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Cập nhật vé thất bại",
      data: null,
    };
  }
};

// DELETE /api/tickets/{id} - Delete ticket
export const deleteTicket = async (id) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] DELETE /api/tickets/{id} (commented)", id);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.delete(`/tickets/${id}`);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message || error?.message || "Xóa vé thất bại",
      data: null,
    };
  }
};
