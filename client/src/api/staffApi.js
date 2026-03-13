import api from "./axios";

const staffApi = {
  list: (params = {}) => api.get("/staff", { params }),
  get: (id) => api.get(`/staff/${id}`),
  create: (payload) => api.post("/staff", payload),
  update: (id, payload) => api.put(`/staff/${id}`, payload),
  remove: (id) => api.delete(`/staff/${id}`),
  listShifts: () => api.get("/staff/shifts/list"),
  createShift: (payload) => api.post("/staff/shifts", payload),
};

export default staffApi;
