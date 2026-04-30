import api from "./api";

/**
 * Payment API Service - Aligned with backend endpoints
 * Database Schema:
 * - payment_id (PK), booking_id (FK unique), amount, payment_method, payment_status, payment_time
 * - Statuses: pending, success, failed
 */

// POST /api/payments - Create new payment (User/Staff)
export const createPayment = (paymentData) =>
  api.post("/payments", paymentData);

// GET /api/payments - Get all payments list (Staff/Admin)
export const getAllPayments = () => api.get("/payments");

// GET /api/payments/{id} - Get payment details (All)
export const getPaymentDetail = (id) => api.get(`/payments/${id}`);

// PUT /api/payments/{id} - Update payment status (Staff/Admin)
export const updatePayment = (id, data) => api.put(`/payments/${id}`, data);

// DELETE /api/payments/{id} - Delete payment (Staff/Admin)
export const deletePayment = (id) => api.delete(`/payments/${id}`);
