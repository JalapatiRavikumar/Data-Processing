import axiosClient from "./axiosClient";

export const getUsersApi = () => axiosClient.get("/users");
export const createUserApi = (payload) => axiosClient.post("/users", payload);
export const updateUserApi = (id, payload) => axiosClient.put(`/users/${id}`, payload);
export const deleteUserApi = (id) => axiosClient.delete(`/users/${id}`);
