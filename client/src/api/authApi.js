import api from "./axios";

const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
  register: (payload) => api.post("/auth/register", payload),
};

export default authApi;
