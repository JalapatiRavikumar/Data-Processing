import axiosClient from "./axiosClient";

export const getRecordsApi = (params) => axiosClient.get("/records", { params });
export const createRecordApi = (payload) => axiosClient.post("/records", payload);
export const updateRecordApi = (id, payload) => axiosClient.put(`/records/${id}`, payload);
export const deleteRecordApi = (id) => axiosClient.delete(`/records/${id}`);
