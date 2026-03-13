import api from "./axios";

const orderApi = {
  list: (params = {}) => api.get("/orders", { params }),
  get: (id) => api.get(`/orders/${id}`),
  create: (payload) => api.post("/orders", payload),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  addItem: (id, payload) => api.post(`/orders/${id}/items`, payload),
  removeItem: (id, itemId) => api.delete(`/orders/${id}/items/${itemId}`),
  remove: (id) => api.delete(`/orders/${id}`),
};

export default orderApi;
