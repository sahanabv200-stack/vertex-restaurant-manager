import api from "./axios";

const billingApi = {
  listInvoices: (params = {}) => api.get("/invoices", { params }),
  getInvoice: (id) => api.get(`/invoices/${id}`),
  createInvoice: (payload) => api.post("/invoices", payload),
  updateInvoice: (id, payload) => api.put(`/invoices/${id}`, payload),
  removeInvoice: (id) => api.delete(`/invoices/${id}`),
  listPayments: (params = {}) => api.get("/payments", { params }),
  createPayment: (payload) => api.post("/payments", payload),
};

export default billingApi;
