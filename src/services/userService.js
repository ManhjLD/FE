import api, { extractApiResponse } from "./api";
import { USE_BACKEND_API } from "../config/apiConfig";

/**
 * User API Service - Aligned with backend endpoints
 *
 * API Spec:
 * - GET /api/users/me: Get current user profile
 * - PUT /api/users/me: Update current user profile
 * - GET /api/users: Get all users (staff/admin)
 * - POST /api/users: Create new user (staff)
 * - PUT /api/users/{id}: Update user (staff)
 * - DELETE /api/users/{id}: Delete user (staff)
 * - PUT /api/users/{id}/role: Update user role (admin)
 *
 * Response Format: { status: "success"/"error", message: "...", data: {...} }
 */

export const getMeApi = async () => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/users/me (commented)");
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.get("/users/me");
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy thông tin hồ sơ thất bại",
      data: null,
    };
  }
};

export const updateMeApi = async (data) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] PUT /api/users/me (commented)", data);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.put("/users/me", data);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Cập nhật thông tin thất bại",
      data: null,
    };
  }
};

export const changePasswordApi = async (password) => {
  if (!USE_BACKEND_API) {
    console.log(
      "[DEMO MODE] PUT /api/users/me (password change) (commented)",
      password,
    );
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.put("/users/me", { password });
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Đổi mật khẩu thất bại",
      data: null,
    };
  }
};

export const listUsersApi = async () => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] GET /api/users (commented)");
    return { success: false, status: "error", message: "Demo mode", data: [] };
  }
  try {
    const response = await api.get("/users");
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Lấy danh sách người dùng thất bại",
      data: [],
    };
  }
};

export const createUserApi = async (data) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] POST /api/users (commented)", data);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.post("/users", data);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Tạo tài khoản thất bại",
      data: null,
    };
  }
};

export const updateUserApi = async (id, data) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] PUT /api/users/{id} (commented)", id, data);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.put(`/users/${id}`, data);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Cập nhật tài khoản thất bại",
      data: null,
    };
  }
};

export const deleteUserApi = async (id) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] DELETE /api/users/{id} (commented)", id);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.delete(`/users/${id}`);
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Xóa tài khoản thất bại",
      data: null,
    };
  }
};

export const updateUserRoleApi = async (id, role) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] PUT /api/users/{id}/role (commented)", id, role);
    return {
      success: false,
      status: "error",
      message: "Demo mode",
      data: null,
    };
  }
  try {
    const response = await api.put(`/users/${id}/role`, { role });
    return extractApiResponse(response);
  } catch (error) {
    return {
      success: false,
      status: "error",
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Cập nhật quyền thất bại",
      data: null,
    };
  }
};
