import api from "./api";
import {
  DEMO_ADMIN_FLIGHTS,
  DEMO_AIRPORTS,
  DEMO_AIRCRAFTS,
  DEMO_BRANCH_BOOKINGS,
  DEMO_TICKETS,
  DEMO_PAYMENTS,
  DEMO_STAFF_REPORTS,
} from "./authLocalStore";

/**
 * Staff Service - Manage staff-level operations
 * Uses mock data from authLocalStore for demo
 */

// Helper to simulate API response
const mockResponse = (data) => Promise.resolve({ data });

/**
 * ================= FLIGHT (READ ONLY) =================
 */

// GET /api/flights - Staff can view all flights
export const getStaffFlights = (params) => {
  try {
    let flights = DEMO_ADMIN_FLIGHTS;
    if (params?.search) {
      flights = flights.filter(
        (f) =>
          f.code.includes(params.search) ||
          f.departure.includes(params.search) ||
          f.arrival.includes(params.search)
      );
    }
    return mockResponse(flights);
  } catch (err) {
    return api.get("/api/flights", { params });
  }
};

// GET /api/flights/{id}
export const getStaffFlight = (id) => {
  try {
    const flight = DEMO_ADMIN_FLIGHTS.find((f) => f.id === id);
    return mockResponse(flight);
  } catch (err) {
    return api.get(`/api/flights/${id}`);
  }
};

/**
 * ================= AIRPORT (READ ONLY) =================
 */

// GET /api/airports - Staff can view all airports
export const getStaffAirports = () => {
  try {
    return mockResponse(DEMO_AIRPORTS);
  } catch (err) {
    return api.get("/api/airports");
  }
};

/**
 * ================= AIRCRAFT (READ ONLY) =================
 */

// GET /api/aircrafts - Staff can view all aircrafts
export const getStaffAircrafts = () => {
  try {
    return mockResponse(DEMO_AIRCRAFTS);
  } catch (err) {
    return api.get("/api/aircrafts");
  }
};

/**
 * ================= BOOKING =================
 */

// GET /api/bookings - Get bookings at staff's branch
export const getStaffBookings = (params) => {
  try {
    let bookings = DEMO_BRANCH_BOOKINGS;
    if (params?.status) {
      bookings = bookings.filter((b) => b.status === params.status);
    }
    return mockResponse(bookings);
  } catch (err) {
    return api.get("/api/bookings", { params });
  }
};

// POST /api/bookings - Create new booking
export const createStaffBooking = (data) => {
  try {
    const newBooking = {
      id: `BK${Date.now().toString().slice(-6)}`,
      ...data,
      bookingDate: new Date().toISOString(),
      status: "pending",
    };
    DEMO_BRANCH_BOOKINGS.push(newBooking);
    return mockResponse(newBooking);
  } catch (err) {
    return api.post("/api/bookings", data);
  }
};

// GET /api/bookings/{id}
export const getStaffBooking = (id) => {
  try {
    const booking = DEMO_BRANCH_BOOKINGS.find((b) => b.id === id);
    return mockResponse(booking);
  } catch (err) {
    return api.get(`/api/bookings/${id}`);
  }
};

// PUT /api/bookings/{id} - Update booking
export const updateStaffBooking = (id, data) => {
  try {
    const index = DEMO_BRANCH_BOOKINGS.findIndex((b) => b.id === id);
    if (index !== -1) {
      DEMO_BRANCH_BOOKINGS[index] = {
        ...DEMO_BRANCH_BOOKINGS[index],
        ...data,
      };
      return mockResponse(DEMO_BRANCH_BOOKINGS[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/bookings/${id}`, data);
  }
};

// DELETE /api/bookings/{id} - Delete booking
export const deleteStaffBooking = (id) => {
  try {
    const index = DEMO_BRANCH_BOOKINGS.findIndex((b) => b.id === id);
    if (index !== -1) DEMO_BRANCH_BOOKINGS.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/bookings/${id}`);
  }
};

/**
 * ================= TICKET =================
 */

// GET /api/tickets - Get all tickets issued by staff
export const getStaffTickets = (params) => {
  try {
    let tickets = DEMO_TICKETS;
    if (params?.status) {
      tickets = tickets.filter((t) => t.status === params.status);
    }
    return mockResponse(tickets);
  } catch (err) {
    return api.get("/api/tickets", { params });
  }
};

// POST /api/tickets - Issue new ticket
export const createStaffTicket = (data) => {
  try {
    const newTicket = {
      id: `ticket-${Date.now()}`,
      ...data,
      issueDate: new Date().toISOString(),
      status: "issued",
    };
    DEMO_TICKETS.push(newTicket);
    return mockResponse(newTicket);
  } catch (err) {
    return api.post("/api/tickets", data);
  }
};

// GET /api/tickets/{id}
export const getStaffTicket = (id) => {
  try {
    const ticket = DEMO_TICKETS.find((t) => t.id === id);
    return mockResponse(ticket);
  } catch (err) {
    return api.get(`/api/tickets/${id}`);
  }
};

// PUT /api/tickets/{id} - Update ticket
export const updateStaffTicket = (id, data) => {
  try {
    const index = DEMO_TICKETS.findIndex((t) => t.id === id);
    if (index !== -1) {
      DEMO_TICKETS[index] = { ...DEMO_TICKETS[index], ...data };
      return mockResponse(DEMO_TICKETS[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/tickets/${id}`, data);
  }
};

// DELETE /api/tickets/{id} - Delete ticket
export const deleteStaffTicket = (id) => {
  try {
    const index = DEMO_TICKETS.findIndex((t) => t.id === id);
    if (index !== -1) DEMO_TICKETS.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/tickets/${id}`);
  }
};

/**
 * ================= PAYMENT =================
 */

// GET /api/payments - Get all payments
export const getStaffPayments = (params) => {
  try {
    let payments = DEMO_PAYMENTS;
    if (params?.status) {
      payments = payments.filter((p) => p.status === params.status);
    }
    return mockResponse(payments);
  } catch (err) {
    return api.get("/api/payments", { params });
  }
};

// POST /api/payments - Create new payment
export const createStaffPayment = (data) => {
  try {
    const newPayment = {
      id: `payment-${Date.now()}`,
      ...data,
      paymentDate: new Date().toISOString(),
    };
    DEMO_PAYMENTS.push(newPayment);
    return mockResponse(newPayment);
  } catch (err) {
    return api.post("/api/payments", data);
  }
};

// GET /api/payments/{id}
export const getStaffPayment = (id) => {
  try {
    const payment = DEMO_PAYMENTS.find((p) => p.id === id);
    return mockResponse(payment);
  } catch (err) {
    return api.get(`/api/payments/${id}`);
  }
};

// PUT /api/payments/{id} - Update payment
export const updateStaffPayment = (id, data) => {
  try {
    const index = DEMO_PAYMENTS.findIndex((p) => p.id === id);
    if (index !== -1) {
      DEMO_PAYMENTS[index] = { ...DEMO_PAYMENTS[index], ...data };
      return mockResponse(DEMO_PAYMENTS[index]);
    }
    return mockResponse(null);
  } catch (err) {
    return api.put(`/api/payments/${id}`, data);
  }
};

// DELETE /api/payments/{id} - Delete payment
export const deleteStaffPayment = (id) => {
  try {
    const index = DEMO_PAYMENTS.findIndex((p) => p.id === id);
    if (index !== -1) DEMO_PAYMENTS.splice(index, 1);
    return mockResponse({ success: true });
  } catch (err) {
    return api.delete(`/api/payments/${id}`);
  }
};

/**
 * ================= REPORTS =================
 */

// GET /api/reports/financial
export const getStaffFinancialReport = () => {
  try {
    return mockResponse(DEMO_STAFF_REPORTS.financial);
  } catch (err) {
    return api.get("/api/reports/financial");
  }
};

// GET /api/reports/flights
export const getStaffFlightsReport = () => {
  try {
    return mockResponse(DEMO_STAFF_REPORTS.flights);
  } catch (err) {
    return api.get("/api/reports/flights");
  }
};

// GET /api/reports/sales
export const getStaffSalesReport = () => {
  try {
    return mockResponse(DEMO_STAFF_REPORTS.sales);
  } catch (err) {
    return api.get("/api/reports/sales");
  }
};

// GET /api/reports/customers
export const getStaffCustomersReport = () => {
  try {
    return mockResponse(DEMO_STAFF_REPORTS.customers);
  } catch (err) {
    return api.get("/api/reports/customers");
  }
};
