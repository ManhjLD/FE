import api from "./api";

export const searchFlights = (params) =>
  api.get("/flights/search", { params });

export const getAllFlights = () =>
  api.get("/flights");