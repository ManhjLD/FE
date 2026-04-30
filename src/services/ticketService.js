import api from "./api";

/**
 * Ticket API Service - Aligned with backend endpoints
 * Database Schema:
 * - ticket_id (PK), booking_id (FK), flight_id (FK), passenger_name, resident_id
 */

// GET /api/tickets - Get all issued tickets (Staff/Admin)
export const getAllTickets = () => api.get("/tickets");

// POST /api/tickets - Add ticket manually (Staff/Admin)
export const createTicket = (ticketData) => api.post("/tickets", ticketData);

// PUT /api/tickets/{id} - Edit ticket info (Staff/Admin)
export const updateTicket = (id, data) => api.put(`/tickets/${id}`, data);

// DELETE /api/tickets/{id} - Delete ticket (Staff/Admin)
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);
