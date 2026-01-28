import api from "./axios.config";

export interface BookingReturnDTO {
  id: number;
  userName: string;
  eventName: string;
  bookedAt: string;      // ISO string from backend
  totalAmount: number;   // could come as string; we’ll normalize
}

export const getUserBookings = async (eventId?: number): Promise<BookingReturnDTO[]> => {
  const { data } = await api.get<BookingReturnDTO[]>("/user/bookings", {
    params: eventId ? { eventId } : undefined,
  });
  // normalize totalAmount just in case backend sends it as string (BigDecimal)
  return (data ?? []).map((b) => ({
    ...b,
    totalAmount: Number((b as any).totalAmount),
  }));
};

export const createBooking = async (eventId: number): Promise<number> => {
  const params = { eventId };
  const response = await api.post('/user/bookings', null, { params });
  return response.data; 
};