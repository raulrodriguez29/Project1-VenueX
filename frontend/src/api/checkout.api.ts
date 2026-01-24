import api from "axios";
import { CheckoutSummary, PaymentRequest, PaymentResponse } from "../types/Checkout";

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
export const submitPayment = async (bookingId: number) => {
  const { data } = await api.post("/payments", {
    bookingId,
    paymentMethod: "CREDIT_CARD"
  });

  return data;
};