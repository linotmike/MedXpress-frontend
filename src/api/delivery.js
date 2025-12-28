// Delivery API calls
import { http } from "./http";

const BASE = "/api/deliveries";

export const getDeliveryById = (deliveryId) =>
  http.get(`${BASE}/${deliveryId}`);

export const getDeliveryByOrderId = (orderId) =>
  http.get(`${BASE}/by-order/${orderId}`);

export const listDeliveriesByRider = (riderId) =>
  http.get(BASE, { params: { riderId } });

export const updateDeliveryStatus = (deliveryId, payload) =>
  http.patch(`${BASE}/${deliveryId}/status`, payload);
