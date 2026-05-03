import api from "./api";
import {
  DEMO_ADMIN_USERS,
  DEMO_ADMIN_FLIGHTS,
  DEMO_ADMIN_BRANCHES,
  DEMO_ADMIN_DASHBOARD,
  DEMO_ADMIN_STATISTICS,
  DEMO_ADMIN_REPORTS,
  DEMO_AIRPORTS,
  DEMO_AIRCRAFTS,
  DEMO_TICKETS,
  DEMO_PAYMENTS,
  DEMO_STAFF_REPORTS,
} from "./authLocalStore";

// Mock helper
const mockResponse = (data) => Promise.resolve({ data });

/**
 * ================= USER MANAGEMENT =================
 */

// GET /api/users
export const getAdminUsers = (params) => {
    // Ensure only user, staff, and admin roles are fetched
  try {
    return mockResponse(DEMO_ADMIN_USERS);
  } catch (err) {
    return api.get("/api/users", { params });
  }
};

// GET /api/users/{id}
export const getAdminUser = (id) => {
  try {
    const user = DEMO_ADMIN_USERS.find((u) => u.id === id);
    return mockResponse(user);
  } catch (err) {
    return api.get(`/api/users/${id}`);
  }
};

// POST /api/users
export const createAdminUser = (data) => {
  try {
    const newUser = { id: `admin-${Date.now()}`, ...data };
    DEMO_ADMIN_USERS.push(newUser);
    return mockResponse(newUser);
  } catch (err) {
    return api.post("/api/users", data);
  }
};

// PUT /api/users/{id}
export const updateAdminUser = (id, data) => {
  try {
    const index = DEMO_ADMIN_USERS.findIndex((u) => u.id === id);
    if (index !== -1) {
      DEMO_ADMIN_USERS[index] = { ...DEMO_ADMIN_USERS[index], ...data };
      return mockResponse(DEMO_ADMIN_USERS[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/users/${id}`, data);
  }
};

// DELETE /api/users/{id}
export const deleteAdminUser = (id) => {
  try {
    const index = DEMO_ADMIN_USERS.findIndex((u) => u.id === id);
    if (index !== -1) DEMO_ADMIN_USERS.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/users/${id}`);
  }
};

// PUT /api/users/{id}/role
export const updateAdminUserRole = (id, role) => {
  try {
    const user = DEMO_ADMIN_USERS.find((u) => u.id === id);
    if (user) user.role = role;
    return mockResponse(user);
  } catch (err) {
    return api.put(`/api/users/${id}/role`, { role });
  }
};

// PUT /api/users/{id}/status
export const updateAdminUserStatus = (id, status) => {
  try {
    const user = DEMO_ADMIN_USERS.find((u) => u.id === id);
    if (user) user.status = status;
    return mockResponse(user);
  } catch (err) {
    return api.put(`/api/users/${id}/status`, { status });
  }
};

/**
 * ================= FLIGHT =================
 */

// GET /api/flights
export const getAdminFlights = () => {
  try {
    return mockResponse(DEMO_ADMIN_FLIGHTS);
  } catch (err) {
    return api.get("/api/flights");
  }
};

// POST /api/flights
export const createAdminFlight = (data) => {
  try {
    const newFlight = { id: `flight-${Date.now()}`, ...data };
    DEMO_ADMIN_FLIGHTS.push(newFlight);
    return mockResponse(newFlight);
  } catch (err) {
    return api.post("/api/flights", data);
  }
};

// PUT /api/flights/{id}
export const updateAdminFlight = (id, data) => {
  try {
    const index = DEMO_ADMIN_FLIGHTS.findIndex((f) => f.id === id);
    if (index !== -1) {
      DEMO_ADMIN_FLIGHTS[index] = { ...DEMO_ADMIN_FLIGHTS[index], ...data };
      return mockResponse(DEMO_ADMIN_FLIGHTS[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/flights/${id}`, data);
  }
};

// DELETE /api/flights/{id}
export const deleteAdminFlight = (id) => {
  try {
    const index = DEMO_ADMIN_FLIGHTS.findIndex((f) => f.id === id);
    if (index !== -1) DEMO_ADMIN_FLIGHTS.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/flights/${id}`);
  }
};

/**
 * ================= BRANCH =================
 */

// GET /api/branches
export const getAdminBranches = () => {
  try {
    return mockResponse(DEMO_ADMIN_BRANCHES);
  } catch (err) {
    return api.get("/api/branches");
  }
};

// POST /api/branches
export const createAdminBranch = (data) => {
  try {
    const newBranch = { id: `branch-${Date.now()}`, ...data };
    DEMO_ADMIN_BRANCHES.push(newBranch);
    return mockResponse(newBranch);
  } catch (err) {
    return api.post("/api/branches", data);
  }
};

// PUT /api/branches/{id}
export const updateAdminBranch = (id, data) => {
  try {
    const index = DEMO_ADMIN_BRANCHES.findIndex((b) => b.id === id);
    if (index !== -1) {
      DEMO_ADMIN_BRANCHES[index] = {
        ...DEMO_ADMIN_BRANCHES[index],
        ...data,
      };
      return mockResponse(DEMO_ADMIN_BRANCHES[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/branches/${id}`, data);
  }
};

// DELETE /api/branches/{id}
export const deleteAdminBranch = (id) => {
  try {
    const index = DEMO_ADMIN_BRANCHES.findIndex((b) => b.id === id);
    if (index !== -1) DEMO_ADMIN_BRANCHES.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/branches/${id}`);
  }
};

/**
 * ================= REPORT =================
 */

// GET /api/reports/financial
export const getAdminRevenueReport = () => {
  try {
    return mockResponse(DEMO_ADMIN_REPORTS.revenue);
  } catch (err) {
    return api.get("/api/reports/financial");
  }
};

// GET /api/reports/users
export const getAdminUsersReport = () => {
  try {
    return mockResponse(DEMO_ADMIN_REPORTS.users);
  } catch (err) {
    return api.get("/api/reports/users");
  }
};

// GET /api/reports/flights
export const getAdminFlightsReport = () => {
  try {
    return mockResponse(DEMO_ADMIN_REPORTS.flights);
  } catch (err) {
    return api.get("/api/reports/flights");
  }
};

// GET /api/reports/sales
export const getAdminBookingsReport = () => {
  try {
    return mockResponse(DEMO_ADMIN_REPORTS.bookings);
  } catch (err) {
    return api.get("/api/reports/sales");
  }
};

/**
 * ================= DASHBOARD =================
 */

// GET /api/admin/dashboard
export const getAdminDashboard = () => {
  try {
    return mockResponse(DEMO_ADMIN_DASHBOARD);
  } catch (err) {
    return api.get("/api/admin/dashboard");
  }
};

// GET /api/admin/statistics
export const getAdminStatistics = () => {
  try {
    return mockResponse(DEMO_ADMIN_STATISTICS);
  } catch (err) {
    return api.get("/api/admin/statistics");
  }
};

/**
 * ================= AIRPORT =================
 */

// GET /api/airports
export const getAdminAirports = () => {
  try {
    return mockResponse(DEMO_AIRPORTS);
  } catch (err) {
    return api.get("/api/airports");
  }
};

// POST /api/airports
export const createAdminAirport = (data) => {
  try {
    const newAirport = { id: `airport-${Date.now()}`, ...data };
    DEMO_AIRPORTS.push(newAirport);
    return mockResponse(newAirport);
  } catch (err) {
    return api.post("/api/airports", data);
  }
};

// PUT /api/airports/{id}
export const updateAdminAirport = (id, data) => {
  try {
    const index = DEMO_AIRPORTS.findIndex((a) => a.id === id);
    if (index !== -1) {
      DEMO_AIRPORTS[index] = { ...DEMO_AIRPORTS[index], ...data };
      return mockResponse(DEMO_AIRPORTS[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/airports/${id}`, data);
  }
};

// DELETE /api/airports/{id}
export const deleteAdminAirport = (id) => {
  try {
    const index = DEMO_AIRPORTS.findIndex((a) => a.id === id);
    if (index !== -1) DEMO_AIRPORTS.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/airports/${id}`);
  }
};

/**
 * ================= AIRCRAFT =================
 */

// GET /api/aircrafts
export const getAdminAircrafts = () => {
  try {
    return mockResponse(DEMO_AIRCRAFTS);
  } catch (err) {
    return api.get("/api/aircrafts");
  }
};

// POST /api/aircrafts
export const createAdminAircraft = (data) => {
  try {
    const newAircraft = { id: `aircraft-${Date.now()}`, ...data };
    DEMO_AIRCRAFTS.push(newAircraft);
    return mockResponse(newAircraft);
  } catch (err) {
    return api.post("/api/aircrafts", data);
  }
};

// PUT /api/aircrafts/{id}
export const updateAdminAircraft = (id, data) => {
  try {
    const index = DEMO_AIRCRAFTS.findIndex((a) => a.id === id);
    if (index !== -1) {
      DEMO_AIRCRAFTS[index] = { ...DEMO_AIRCRAFTS[index], ...data };
      return mockResponse(DEMO_AIRCRAFTS[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/aircrafts/${id}`, data);
  }
};

// DELETE /api/aircrafts/{id}
export const deleteAdminAircraft = (id) => {
  try {
    const index = DEMO_AIRCRAFTS.findIndex((a) => a.id === id);
    if (index !== -1) DEMO_AIRCRAFTS.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/aircrafts/${id}`);
  }
};
