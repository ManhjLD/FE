import api from "./api";
import {
  DEMO_BRANCH_USERS,
  DEMO_BRANCH_BOOKINGS,
  DEMO_BRANCH_REVENUE,
  DEMO_BRANCH_DASHBOARD,
  DEMO_TICKETS,
  DEMO_PAYMENTS,
  DEMO_STAFF_REPORTS,
} from "./authLocalStore";

/**
 * Branch Service
 * ✔ API thật (comment)
 * ✔ Local mock để chạy demo
 */

// helper
const mockResponse = (data) => Promise.resolve({ data });


// ========== USER MANAGEMENT ==========

// API: GET /api/users (lọc theo chi nhánh ở backend)
export const getBranchUsers = (params) => {
  return mockResponse(DEMO_BRANCH_USERS);
};

// API: GET /api/users/{id}
export const getBranchUser = (id) => {
  const user = DEMO_BRANCH_USERS.find((u) => u.id === id);
  return mockResponse(user);
};

// API: POST /api/users
export const createBranchUser = (userData) => {
  const newUser = {
    id: `br-user-${Date.now()}`,
    ...userData,
  };
  DEMO_BRANCH_USERS.push(newUser);
  return mockResponse(newUser);
};

// API: PUT /api/users/{id}
export const updateBranchUser = (id, userData) => {
  const index = DEMO_BRANCH_USERS.findIndex((u) => u.id === id);
  if (index !== -1) {
    DEMO_BRANCH_USERS[index] = {
      ...DEMO_BRANCH_USERS[index],
      ...userData,
    };
    return mockResponse(DEMO_BRANCH_USERS[index]);
  }
  return mockResponse(null);
};

// API: DELETE /api/users/{id}
export const deleteBranchUser = (id) => {
  const index = DEMO_BRANCH_USERS.findIndex((u) => u.id === id);
  if (index !== -1) {
    DEMO_BRANCH_USERS.splice(index, 1);
  }
  return mockResponse({ success: true });
};


// ========== BOOKING MANAGEMENT ==========

// API: GET /api/bookings
export const getBranchBookings = (params) => {
  let bookings = [...DEMO_BRANCH_BOOKINGS];

  if (params?.status) {
    bookings = bookings.filter((b) => b.status === params.status);
  }

  return mockResponse(bookings);
};

// API: GET /api/bookings/{id}
export const getBranchBookingDetail = (id) => {
  const booking = DEMO_BRANCH_BOOKINGS.find((b) => b.id === id);
  return mockResponse(booking);
};

// API: PUT /api/bookings/{id}
export const updateBranchBooking = (id, data) => {
  const index = DEMO_BRANCH_BOOKINGS.findIndex((b) => b.id === id);

  if (index !== -1) {
    DEMO_BRANCH_BOOKINGS[index] = {
      ...DEMO_BRANCH_BOOKINGS[index],
      ...data,
    };
    return mockResponse(DEMO_BRANCH_BOOKINGS[index]);
  }

  return mockResponse(null);
};


// ========== REVENUE ==========

// API: GET /api/reports/financial
export const getBranchRevenue = () => {
  return mockResponse(DEMO_BRANCH_REVENUE);
};

// API: GET /api/reports/financial?type=daily
export const getBranchDailyRevenue = () => {
  return mockResponse(DEMO_BRANCH_REVENUE.daily);
};

// API: GET /api/reports/financial?type=monthly
export const getBranchMonthlyRevenue = () => {
  return mockResponse(DEMO_BRANCH_REVENUE.monthly);
};

// API: GET /api/reports/financial?type=summary
export const getBranchRevenueSummary = () => {
  return mockResponse(DEMO_BRANCH_REVENUE.summary);
};


// ========== DASHBOARD ==========

// API: GET /api/reports/sales
export const getBranchDashboard = () => {
  return mockResponse(DEMO_BRANCH_DASHBOARD);
};

// API: GET /api/reports/customers
export const getBranchStatistics = () => {
  return mockResponse({
    customersCount: DEMO_BRANCH_DASHBOARD.totalCustomers,
    todayTickets: DEMO_BRANCH_DASHBOARD.todayTickets,
    revenue: DEMO_BRANCH_DASHBOARD.revenue,
    flightsCount: DEMO_BRANCH_DASHBOARD.totalFlights,
  });
};

// API: GET /api/reports/sales
export const getBranchSalesReport = () => {
  return mockResponse({
    totalBookings: DEMO_STAFF_REPORTS.sales.totalBookings,
    soldTickets: DEMO_STAFF_REPORTS.sales.soldTickets,
    revenue: DEMO_STAFF_REPORTS.sales.revenue,
    averageTicketPrice: DEMO_STAFF_REPORTS.sales.averageTicketPrice,
  });
};

// API: GET /api/reports/financial (dữ liệu tài chính staff xem)
export const getBranchFinancialReport = () => {
  return mockResponse(DEMO_STAFF_REPORTS.financial);
};


// ========== TICKET MANAGEMENT ==========

// API: GET /api/tickets - Get all issued tickets
export const getBranchTickets = (params) => {
  let tickets = [...DEMO_TICKETS];

  if (params?.status) {
    tickets = tickets.filter((t) => t.status === params.status);
  }

  return mockResponse(tickets);
};

// API: GET /api/tickets/{id} - Get ticket detail
export const getBranchTicketDetail = (id) => {
  const ticket = DEMO_TICKETS.find((t) => t.id === id);
  return mockResponse(ticket);
};

// API: POST /api/tickets - Add ticket manually
export const createBranchTicket = (ticketData) => {
  const newTicket = {
    id: `ticket-${Date.now()}`,
    status: "issued",
    issueDate: new Date().toISOString(),
    ...ticketData,
  };
  DEMO_TICKETS.push(newTicket);
  return mockResponse(newTicket);
};

// API: PUT /api/tickets/{id} - Edit ticket info
export const updateBranchTicket = (id, data) => {
  const index = DEMO_TICKETS.findIndex((t) => t.id === id);

  if (index !== -1) {
    DEMO_TICKETS[index] = {
      ...DEMO_TICKETS[index],
      ...data,
    };
    return mockResponse(DEMO_TICKETS[index]);
  }

  return mockResponse(null);
};

// API: DELETE /api/tickets/{id} - Delete ticket
export const deleteBranchTicket = (id) => {
  const index = DEMO_TICKETS.findIndex((t) => t.id === id);
  if (index !== -1) {
    DEMO_TICKETS.splice(index, 1);
  }
  return mockResponse({ success: true });
};


// ========== PAYMENT MANAGEMENT ==========

// API: GET /api/payments - Get all payments
export const getBranchPayments = (params) => {
  let payments = [...DEMO_PAYMENTS];

  if (params?.status) {
    payments = payments.filter((p) => p.status === params.status);
  }

  return mockResponse(payments);
};

// API: GET /api/payments/{id} - Get payment detail
export const getBranchPaymentDetail = (id) => {
  const payment = DEMO_PAYMENTS.find((p) => p.id === id);
  return mockResponse(payment);
};

// API: POST /api/payments - Create new payment
export const createBranchPayment = (paymentData) => {
  const newPayment = {
    id: `payment-${Date.now()}`,
    transactionId: `TXN-${Date.now()}`,
    paymentDate: new Date().toISOString(),
    ...paymentData,
  };
  DEMO_PAYMENTS.push(newPayment);
  return mockResponse(newPayment);
};

// API: PUT /api/payments/{id} - Update payment status
export const updateBranchPayment = (id, data) => {
  const index = DEMO_PAYMENTS.findIndex((p) => p.id === id);

  if (index !== -1) {
    DEMO_PAYMENTS[index] = {
      ...DEMO_PAYMENTS[index],
      ...data,
    };
    return mockResponse(DEMO_PAYMENTS[index]);
  }

  return mockResponse(null);
};