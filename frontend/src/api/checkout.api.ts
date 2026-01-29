
import api from "./axios.config";
import type { CheckoutSummary, PaymentResponse } from "../types/Checkout";

// Fetch checkout/cart summary for a booking 
export const getCheckoutSummary = async (
  bookingId: number
): Promise<CheckoutSummary> => {
  const { data } = await api.get<CheckoutSummary>(
    `/bookings/${bookingId}/checkout`
  );
  return data;
};

// Submit checkout payment
export const submitPayment = async (bookingId: number): Promise<PaymentResponse> => {
  const { data } = await api.post(`/user/bookings/${bookingId}/payment`, {
    bookingId,
  });

  return data;
};
