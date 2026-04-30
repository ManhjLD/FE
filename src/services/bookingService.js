import api from "./api";

/**
 * Booking API Service - Aligned with backend endpoints
 * Database Schema:
 * - booking_id (PK), user_id (FK), booking_date, status, MaCN (branch)
 * - Statuses: pending, confirmed, cancelled
 */

// POST /api/bookings - Create new booking (User/Staff)
export const createBooking = (bookingData) =>
  api.post("/bookings", bookingData);

// GET /api/bookings/my - Get user booking history (User)
export const getMyBookings = () => api.get("/bookings/my");

// GET /api/bookings - Get all bookings list (Staff/Admin)
export const getAllBookings = () => api.get("/bookings");

// GET /api/bookings/{id} - Get booking details (All)
export const getBookingDetail = (id) => api.get(`/bookings/${id}`);

// PUT /api/bookings/{id} - Update/Cancel booking (User/Staff)
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);

// DELETE /api/bookings/{id} - Delete booking (Staff/Admin)
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// Alias for backward compatibility
export const myBookings = () => getMyBookings();

// Alias for backward compatibility
export const cancelBooking = (id) => updateBooking(id, { status: "cancelled" });
