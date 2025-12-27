// Pharmacy API calls
import { http } from "./http";

export const pharmacyApi = {
  list: () => http.get("/api/pharmacies"),
  nearby: ({ lat, lng, radiusKm }) =>
    http.get(`/api/pharmacies/nearby?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`),
  getById: (id) => http.get(`/api/pharmacies/${id}`),
};

