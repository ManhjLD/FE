import api from "./api";

export const createBooking = (data) =>
  api.post("/bookings", data);

export const myBookings = () =>
  api.get("/bookings/my");

export const cancelBooking = (id) =>
  api.delete(`/bookings/${id}`);