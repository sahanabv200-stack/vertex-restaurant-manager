import api from "./axios";

const expenseApi = {
  list: (params = {}) => api.get("/expenses", { params }),
  get: (id) => api.get(`/expenses/${id}`),
  create: (payload) => api.post("/expenses", payload),
  update: (id, payload) => api.put(`/expenses/${id}`, payload),
  remove: (id) => api.delete(`/expenses/${id}`),
  listCategories: () => api.get("/expenses/categories/list"),
  createCategory: (payload) => api.post("/expenses/categories", payload),
};

export default expenseApi;
