import api from "axios";

export interface Booking {
  id: number;
  status: string;
  bookedAt: string;
}

export const getUserBookings = async (): Promise<Booking[]> => {
  const { data } = await api.get<Booking[]>("/user/bookings");
  return data;
};
