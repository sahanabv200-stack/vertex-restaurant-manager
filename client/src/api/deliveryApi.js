import api from "./axios";

const deliveryApi = {
  list: (params = {}) => api.get("/delivery", { params }),
  get: (id) => api.get(`/delivery/${id}`),
  create: (payload) => api.post("/delivery", payload),
  update: (id, payload) => api.put(`/delivery/${id}`, payload),
  remove: (id) => api.delete(`/delivery/${id}`),
  listStaff: () => api.get("/delivery/staff/list"),
  createStaff: (payload) => api.post("/delivery/staff", payload),
};

export default deliveryApi;
