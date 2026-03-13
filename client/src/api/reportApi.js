import api from "./axios";

const reportApi = {
  summary: () => api.get("/reports/summary"),
  sales: () => api.get("/reports/sales"),
  stock: () => api.get("/reports/stock"),
};

export default reportApi;
