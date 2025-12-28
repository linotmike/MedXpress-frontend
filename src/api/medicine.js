// Medicine API calls
// Medicine API calls
import { http } from "./http";

const BASE = "/api/medicines";

export const listMedicines = (q) =>
  http.get(BASE, { params: q ? { q } : {} });

export const getMedicineById = (medicineId) =>
  http.get(`${BASE}/${medicineId}`);

export const createMedicine = (payload) =>
  http.post(BASE, payload);
