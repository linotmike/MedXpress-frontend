import { http } from "./http";

export const pharmacyMedicineApi = {
  listByPharmacy: (pharmacyId) => http.get(`/api/pharmacy-medicines/pharmacy/${pharmacyId}`),
};
