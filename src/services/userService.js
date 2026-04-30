import api from "./api";

export const getMeApi = () => api.get("/users/me");

export const updateMeApi = (data) => api.put("/users/me", data);

export const changePasswordApi = (password) =>
  api.put("/users/me", { password });

export const listUsersApi = () => api.get("/users");

export const createUserApi = (data) => api.post("/users", data);

export const updateUserApi = (id, data) => api.put(`/users/${id}`, data);

export const deleteUserApi = (id) => api.delete(`/users/${id}`);

export const updateUserRoleApi = (id, role) =>
  api.put(`/users/${id}/role`, { role });
