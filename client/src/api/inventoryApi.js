import api from "./axios";

const inventoryApi = {
  listRawMaterials: (params = {}) => api.get("/raw-materials", { params }),
  createRawMaterial: (payload) => api.post("/raw-materials", payload),
  updateRawMaterial: (id, payload) => api.put(`/raw-materials/${id}`, payload),
  removeRawMaterial: (id) => api.delete(`/raw-materials/${id}`),

  listStockEntries: (params = {}) => api.get("/inventory/stock-entries", { params }),
  createStockEntry: (payload) => api.post("/inventory/stock-entries", payload),
  updateStockEntry: (id, payload) => api.put(`/inventory/stock-entries/${id}`, payload),
  removeStockEntry: (id) => api.delete(`/inventory/stock-entries/${id}`),

  listStockIssues: (params = {}) => api.get("/inventory/stock-issues", { params }),
  createStockIssue: (payload) => api.post("/inventory/stock-issues", payload),

  listStockAdjustments: (params = {}) => api.get("/inventory/stock-adjustments", { params }),
  createStockAdjustment: (payload) => api.post("/inventory/stock-adjustments", payload),

  listWastage: (params = {}) => api.get("/inventory/wastage", { params }),
  createWastage: (payload) => api.post("/inventory/wastage", payload),
};

export default inventoryApi;
