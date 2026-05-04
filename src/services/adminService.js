import api, { extractApiResponse } from "./api";
import { USE_BACKEND_API } from "../config/apiConfig";
import {
  DEMO_ADMIN_USERS,
  DEMO_ADMIN_FLIGHTS,
  DEMO_ADMIN_BRANCHES,
  DEMO_ADMIN_DASHBOARD,
  DEMO_ADMIN_STATISTICS,
  DEMO_ADMIN_REPORTS,
  DEMO_AIRPORTS,
  DEMO_AIRCRAFTS,
} from "./authLocalStore";

const mockResponse = (data) =>
  Promise.resolve({
    success: true,
    data,
  });

/**
 * ============================================================
 * USER
 * ============================================================
 */

export const getAdminUsers = async (params = {}) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.get("/api/users", { params });
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error?.message || "Không thể lấy danh sách user",
      };
    }
  }

  let users = [...DEMO_ADMIN_USERS];

  if (params?.role && params.role !== "all") {
    users = users.filter((user) => user.role === params.role);
  }

  return mockResponse(users);
};

export const getAdminUser = async (id) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.get(`/api/users/${id}`);
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.message || "Không thể lấy user",
      };
    }
  }

  return mockResponse(DEMO_ADMIN_USERS.find((u) => u.id === id));
};

export const createAdminUser = async (data) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.post("/api/users", data);
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.message || "Không thể tạo user",
      };
    }
  }

  const newUser = {
    id: `admin-user-${Date.now()}`,
    ...data,
  };

  DEMO_ADMIN_USERS.push(newUser);

  return mockResponse(newUser);
};

export const updateAdminUser = async (id, data) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.put(`/api/users/${id}`, data);
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.message || "Không thể cập nhật user",
      };
    }
  }

  const index = DEMO_ADMIN_USERS.findIndex((u) => u.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_ADMIN_USERS[index] = {
    ...DEMO_ADMIN_USERS[index],
    ...data,
  };

  return mockResponse(DEMO_ADMIN_USERS[index]);
};

export const deleteAdminUser = async (id) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.delete(`/api/users/${id}`);
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.message || "Không thể xóa user",
      };
    }
  }

  const index = DEMO_ADMIN_USERS.findIndex((u) => u.id === id);

  if (index !== -1) {
    DEMO_ADMIN_USERS.splice(index, 1);
  }

  return mockResponse({ success: true });
};

export const updateAdminUserRole = async (id, role) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.put(`/api/users/${id}/role`, { role });
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.message || "Không thể cập nhật role",
      };
    }
  }

  const user = DEMO_ADMIN_USERS.find((u) => u.id === id);

  if (user) {
    user.role = role;
  }

  return mockResponse(user || null);
};

export const updateAdminUserStatus = async (id, status) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.put(`/api/users/${id}/status`, { status });
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.message || "Không thể cập nhật trạng thái",
      };
    }
  }

  const user = DEMO_ADMIN_USERS.find((u) => u.id === id);

  if (user) {
    user.status = status;
  }

  return mockResponse(user || null);
};

/**
 * ============================================================
 * FLIGHT
 * ============================================================
 */

export const getAdminFlights = async () => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.get("/api/flights");
      return extractApiResponse(response);
    } catch {
      return { success: false, data: [] };
    }
  }

  return mockResponse(DEMO_ADMIN_FLIGHTS);
};

export const createAdminFlight = async (data) => {
  if (USE_BACKEND_API) {
    const response = await api.post("/api/flights", data);
    return extractApiResponse(response);
  }

  const newFlight = {
    id: `flight-${Date.now()}`,
    ...data,
  };

  DEMO_ADMIN_FLIGHTS.push(newFlight);

  return mockResponse(newFlight);
};

export const updateAdminFlight = async (id, data) => {
  if (USE_BACKEND_API) {
    const response = await api.put(`/api/flights/${id}`, data);
    return extractApiResponse(response);
  }

  const index = DEMO_ADMIN_FLIGHTS.findIndex((f) => f.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_ADMIN_FLIGHTS[index] = {
    ...DEMO_ADMIN_FLIGHTS[index],
    ...data,
  };

  return mockResponse(DEMO_ADMIN_FLIGHTS[index]);
};

export const deleteAdminFlight = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.delete(`/api/flights/${id}`);
    return extractApiResponse(response);
  }

  const index = DEMO_ADMIN_FLIGHTS.findIndex((f) => f.id === id);

  if (index !== -1) {
    DEMO_ADMIN_FLIGHTS.splice(index, 1);
  }

  return mockResponse({ success: true });
};

/**
 * ============================================================
 * BRANCH
 * ============================================================
 */

export const getAdminBranches = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/branches");
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_ADMIN_BRANCHES);
};

export const createAdminBranch = async (data) => {
  if (USE_BACKEND_API) {
    const response = await api.post("/api/branches", data);
    return extractApiResponse(response);
  }

  const newBranch = {
    id: `branch-${Date.now()}`,
    ...data,
  };

  DEMO_ADMIN_BRANCHES.push(newBranch);

  return mockResponse(newBranch);
};

export const updateAdminBranch = async (id, data) => {
  if (USE_BACKEND_API) {
    const response = await api.put(`/api/branches/${id}`, data);
    return extractApiResponse(response);
  }

  const index = DEMO_ADMIN_BRANCHES.findIndex((b) => b.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_ADMIN_BRANCHES[index] = {
    ...DEMO_ADMIN_BRANCHES[index],
    ...data,
  };

  return mockResponse(DEMO_ADMIN_BRANCHES[index]);
};

export const deleteAdminBranch = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.delete(`/api/branches/${id}`);
    return extractApiResponse(response);
  }

  const index = DEMO_ADMIN_BRANCHES.findIndex((b) => b.id === id);

  if (index !== -1) {
    DEMO_ADMIN_BRANCHES.splice(index, 1);
  }

  return mockResponse({ success: true });
};

/**
 * ============================================================
 * REPORT / DASHBOARD
 * ============================================================
 */

export const getAdminRevenueReport = async () =>
  USE_BACKEND_API
    ? extractApiResponse(await api.get("/api/reports/financial"))
    : mockResponse(DEMO_ADMIN_REPORTS.revenue);

export const getAdminUsersReport = async () =>
  USE_BACKEND_API
    ? extractApiResponse(await api.get("/api/reports/customers"))
    : mockResponse(DEMO_ADMIN_REPORTS.users);

export const getAdminFlightsReport = async () =>
  USE_BACKEND_API
    ? extractApiResponse(await api.get("/api/reports/flights"))
    : mockResponse(DEMO_ADMIN_REPORTS.flights);

export const getAdminBookingsReport = async () =>
  USE_BACKEND_API
    ? extractApiResponse(await api.get("/api/reports/sales"))
    : mockResponse(DEMO_ADMIN_REPORTS.bookings);

export const getAdminDashboard = async () =>
  USE_BACKEND_API
    ? extractApiResponse(await api.get("/api/admin/dashboard"))
    : mockResponse(DEMO_ADMIN_DASHBOARD);

export const getAdminStatistics = async () =>
  USE_BACKEND_API
    ? extractApiResponse(await api.get("/api/admin/statistics"))
    : mockResponse(DEMO_ADMIN_STATISTICS);

/**
 * ============================================================
 * AIRPORT
 * ============================================================
 */

export const getAdminAirports = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/airports");
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_AIRPORTS);
};

export const createAdminAirport = async (data) => {
  if (USE_BACKEND_API) {
    const response = await api.post("/api/airports", data);
    return extractApiResponse(response);
  }

  const newAirport = {
    id: `airport-${Date.now()}`,
    ...data,
  };

  DEMO_AIRPORTS.push(newAirport);

  return mockResponse(newAirport);
};

export const updateAdminAirport = async (id, data) => {
  if (USE_BACKEND_API) {
    const response = await api.put(`/api/airports/${id}`, data);
    return extractApiResponse(response);
  }

  const index = DEMO_AIRPORTS.findIndex((a) => a.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_AIRPORTS[index] = {
    ...DEMO_AIRPORTS[index],
    ...data,
  };

  return mockResponse(DEMO_AIRPORTS[index]);
};

export const deleteAdminAirport = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.delete(`/api/airports/${id}`);
    return extractApiResponse(response);
  }

  const index = DEMO_AIRPORTS.findIndex((a) => a.id === id);

  if (index !== -1) {
    DEMO_AIRPORTS.splice(index, 1);
  }

  return mockResponse({ success: true });
};

/**
 * ============================================================
 * AIRCRAFT
 * ============================================================
 */

export const getAdminAircrafts = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/aircrafts");
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_AIRCRAFTS);
};

export const createAdminAircraft = async (data) => {
  if (USE_BACKEND_API) {
    const response = await api.post("/api/aircrafts", data);
    return extractApiResponse(response);
  }

  const newAircraft = {
    id: `aircraft-${Date.now()}`,
    ...data,
  };

  DEMO_AIRCRAFTS.push(newAircraft);

  return mockResponse(newAircraft);
};

export const updateAdminAircraft = async (id, data) => {
  if (USE_BACKEND_API) {
    const response = await api.put(`/api/aircrafts/${id}`, data);
    return extractApiResponse(response);
  }

  const index = DEMO_AIRCRAFTS.findIndex((a) => a.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_AIRCRAFTS[index] = {
    ...DEMO_AIRCRAFTS[index],
    ...data,
  };

  return mockResponse(DEMO_AIRCRAFTS[index]);
};

export const deleteAdminAircraft = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.delete(`/api/aircrafts/${id}`);
    return extractApiResponse(response);
  }

  const index = DEMO_AIRCRAFTS.findIndex((a) => a.id === id);

  if (index !== -1) {
    DEMO_AIRCRAFTS.splice(index, 1);
  }

  return mockResponse({ success: true });
};