import axiosClient from "./axiosClient";

export const getDashboardSummaryApi = (params) =>
  axiosClient.get("/dashboard/summary", { params });
