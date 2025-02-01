import apiClient from "../utils/api-client";

export function checkoutAPI(orderData) {
  return apiClient.post("/order/checkout", orderData);
}
