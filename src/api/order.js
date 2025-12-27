// Order API calls
import { http } from "./http";

export const orderApi = {
  create: (payload) => http.post("/api/orders", payload),
  listByPatient: (patientId) => http.get(`/api/orders?patientId=${patientId}`),
  getById: (orderId) => http.get(`/api/orders/${orderId}`),
};

