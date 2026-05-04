import api, { extractApiResponse } from "./api";
import { USE_BACKEND_API } from "../config/apiConfig";
import {
  DEMO_BRANCH_USERS,
  DEMO_BRANCH_BOOKINGS,
  DEMO_BRANCH_REVENUE,
  DEMO_BRANCH_DASHBOARD,
  DEMO_TICKETS,
  DEMO_PAYMENTS,
  DEMO_STAFF_REPORTS,
} from "./authLocalStore";

const mockResponse = (data) =>
  Promise.resolve({
    success: true,
    data,
  });

/**
 * ============================================================
 * USER MANAGEMENT
 * ============================================================
 */

export const getBranchUsers = async (params = {}) => {
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

  let users = [...DEMO_BRANCH_USERS];

  if (params?.role && params.role !== "all") {
    users = users.filter((u) => u.role === params.role);
  }

  return mockResponse(users);
};

export const getBranchUser = async (id) => {
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

  return mockResponse(DEMO_BRANCH_USERS.find((u) => u.id === id));
};

export const createBranchUser = async (userData) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.post("/api/users", userData);
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
    id: `br-user-${Date.now()}`,
    ...userData,
  };

  DEMO_BRANCH_USERS.push(newUser);

  return mockResponse(newUser);
};

export const updateBranchUser = async (id, userData) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.put(`/api/users/${id}`, userData);
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.message || "Không thể cập nhật user",
      };
    }
  }

  const index = DEMO_BRANCH_USERS.findIndex((u) => u.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_BRANCH_USERS[index] = {
    ...DEMO_BRANCH_USERS[index],
    ...userData,
  };

  return mockResponse(DEMO_BRANCH_USERS[index]);
};

export const deleteBranchUser = async (id) => {
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

  const index = DEMO_BRANCH_USERS.findIndex((u) => u.id === id);

  if (index !== -1) {
    DEMO_BRANCH_USERS.splice(index, 1);
  }

  return mockResponse({ success: true });
};

/**
 * ============================================================
 * BOOKING MANAGEMENT
 * ============================================================
 */

export const getBranchBookings = async (params = {}) => {
  if (USE_BACKEND_API) {
    try {
      const response = await api.get("/api/bookings", { params });
      return extractApiResponse(response);
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error?.message || "Không thể lấy bookings",
      };
    }
  }

  let bookings = [...DEMO_BRANCH_BOOKINGS];

  if (params?.status) {
    bookings = bookings.filter((b) => b.status === params.status);
  }

  return mockResponse(bookings);
};

export const getBranchBookingDetail = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.get(`/api/bookings/${id}`);
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_BRANCH_BOOKINGS.find((b) => b.id === id));
};

export const updateBranchBooking = async (id, data) => {
  if (USE_BACKEND_API) {
    const response = await api.put(`/api/bookings/${id}`, data);
    return extractApiResponse(response);
  }

  const index = DEMO_BRANCH_BOOKINGS.findIndex((b) => b.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_BRANCH_BOOKINGS[index] = {
    ...DEMO_BRANCH_BOOKINGS[index],
    ...data,
  };

  return mockResponse(DEMO_BRANCH_BOOKINGS[index]);
};

/**
 * ============================================================
 * REVENUE
 * ============================================================
 */

export const getBranchRevenue = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/financial");
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_BRANCH_REVENUE);
};

export const getBranchDailyRevenue = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/financial", {
      params: { type: "daily" },
    });
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_BRANCH_REVENUE.daily);
};

export const getBranchMonthlyRevenue = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/financial", {
      params: { type: "monthly" },
    });
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_BRANCH_REVENUE.monthly);
};

export const getBranchRevenueSummary = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/financial", {
      params: { type: "summary" },
    });
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_BRANCH_REVENUE.summary);
};

/**
 * ============================================================
 * DASHBOARD
 * ============================================================
 */

export const getBranchDashboard = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/sales");
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_BRANCH_DASHBOARD);
};

export const getBranchStatistics = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/customers");
    return extractApiResponse(response);
  }

  return mockResponse({
    customersCount: DEMO_BRANCH_DASHBOARD.totalCustomers,
    todayTickets: DEMO_BRANCH_DASHBOARD.todayTickets,
    revenue: DEMO_BRANCH_DASHBOARD.revenue,
    flightsCount: DEMO_BRANCH_DASHBOARD.totalFlights,
  });
};

export const getBranchSalesReport = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/sales");
    return extractApiResponse(response);
  }

  return mockResponse({
    totalBookings: DEMO_STAFF_REPORTS.sales.totalBookings,
    soldTickets: DEMO_STAFF_REPORTS.sales.soldTickets,
    revenue: DEMO_STAFF_REPORTS.sales.revenue,
    averageTicketPrice: DEMO_STAFF_REPORTS.sales.averageTicketPrice,
  });
};

export const getBranchFinancialReport = async () => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/reports/financial");
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_STAFF_REPORTS.financial);
};

/**
 * ============================================================
 * TICKET MANAGEMENT
 * ============================================================
 */

export const getBranchTickets = async (params = {}) => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/tickets", { params });
    return extractApiResponse(response);
  }

  let tickets = [...DEMO_TICKETS];

  if (params?.status) {
    tickets = tickets.filter((t) => t.status === params.status);
  }

  return mockResponse(tickets);
};

export const getBranchTicketDetail = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.get(`/api/tickets/${id}`);
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_TICKETS.find((t) => t.id === id));
};

export const createBranchTicket = async (ticketData) => {
  if (USE_BACKEND_API) {
    const response = await api.post("/api/tickets", ticketData);
    return extractApiResponse(response);
  }

  const newTicket = {
    id: `ticket-${Date.now()}`,
    status: "issued",
    issueDate: new Date().toISOString(),
    ...ticketData,
  };

  DEMO_TICKETS.push(newTicket);

  return mockResponse(newTicket);
};

export const updateBranchTicket = async (id, data) => {
  if (USE_BACKEND_API) {
    const response = await api.put(`/api/tickets/${id}`, data);
    return extractApiResponse(response);
  }

  const index = DEMO_TICKETS.findIndex((t) => t.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_TICKETS[index] = {
    ...DEMO_TICKETS[index],
    ...data,
  };

  return mockResponse(DEMO_TICKETS[index]);
};

export const deleteBranchTicket = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.delete(`/api/tickets/${id}`);
    return extractApiResponse(response);
  }

  const index = DEMO_TICKETS.findIndex((t) => t.id === id);

  if (index !== -1) {
    DEMO_TICKETS.splice(index, 1);
  }

  return mockResponse({ success: true });
};

/**
 * ============================================================
 * PAYMENT MANAGEMENT
 * ============================================================
 */

export const getBranchPayments = async (params = {}) => {
  if (USE_BACKEND_API) {
    const response = await api.get("/api/payments", { params });
    return extractApiResponse(response);
  }

  let payments = [...DEMO_PAYMENTS];

  if (params?.status) {
    payments = payments.filter((p) => p.status === params.status);
  }

  return mockResponse(payments);
};

export const getBranchPaymentDetail = async (id) => {
  if (USE_BACKEND_API) {
    const response = await api.get(`/api/payments/${id}`);
    return extractApiResponse(response);
  }

  return mockResponse(DEMO_PAYMENTS.find((p) => p.id === id));
};

export const createBranchPayment = async (paymentData) => {
  if (USE_BACKEND_API) {
    const response = await api.post("/api/payments", paymentData);
    return extractApiResponse(response);
  }

  const newPayment = {
    id: `payment-${Date.now()}`,
    transactionId: `TXN-${Date.now()}`,
    paymentDate: new Date().toISOString(),
    ...paymentData,
  };

  DEMO_PAYMENTS.push(newPayment);

  return mockResponse(newPayment);
};

export const updateBranchPayment = async (id, data) => {
  if (USE_BACKEND_API) {
    const response = await api.put(`/api/payments/${id}`, data);
    return extractApiResponse(response);
  }

  const index = DEMO_PAYMENTS.findIndex((p) => p.id === id);

  if (index === -1) {
    return mockResponse(null);
  }

  DEMO_PAYMENTS[index] = {
    ...DEMO_PAYMENTS[index],
    ...data,
  };

  return mockResponse(DEMO_PAYMENTS[index]);
};