export interface CheckoutItem {
  ticketId: number;
  seatSection: string;
  price: number;
  quantity: number;
}

export interface CheckoutSummary {
  bookingId: number;
  items: CheckoutItem[];
  subtotal: number;
  fees: number;
  total: number;
}

export interface PaymentRequest {
  bookingId: number;
  paymentMethod: "CREDIT_CARD";
  amount: number;
}

export interface PaymentResponse {
  status: "PAID" | "UNPAID";
}