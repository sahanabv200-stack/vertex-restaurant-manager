import api from "./axios";

const dashboardApi = {
  summary: () => api.get("/dashboard/summary"),
};

export default dashboardApi;
