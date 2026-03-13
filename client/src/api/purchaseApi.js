import api from "./axios";

const purchaseApi = {
  list: (params = {}) => api.get("/purchases", { params }),
  get: (id) => api.get(`/purchases/${id}`),
  create: (payload) => api.post("/purchases", payload),
  update: (id, payload) => api.put(`/purchases/${id}`, payload),
  remove: (id) => api.delete(`/purchases/${id}`),

  listOrders: (params = {}) => api.get("/purchases/orders/list", { params }),
  createOrder: (payload) => api.post("/purchases/orders", payload),
  listReturns: (params = {}) => api.get("/purchases/returns/list", { params }),
  createReturn: (payload) => api.post("/purchases/returns", payload),
};

export default purchaseApi;
