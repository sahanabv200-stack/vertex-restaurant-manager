import api from "./axios";

const kitchenApi = {
  listKots: (params = {}) => api.get("/kitchen/kots", { params }),
  getKot: (id) => api.get(`/kitchen/kots/${id}`),
  updateKotStatus: (id, status) => api.patch(`/kitchen/kots/${id}/status`, { status }),
  updateKotItemStatus: (itemId, status) => api.patch(`/kitchen/kots/items/${itemId}/status`, { status }),
};

export default kitchenApi;
