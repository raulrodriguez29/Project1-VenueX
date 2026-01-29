import api from "./axios.config";
import type { BookingReturnDTO } from "./bookings.api";

export interface TicketReturnDTO {
  id: number;
  seatSections: string;
  price: number;
}

export interface AddTicketDTO {
  seatSectionName: string;
  quantity: number;
}

export const addTicketsToBooking = async (
  bookingId: number, 
  tickets: AddTicketDTO[]
): Promise<BookingReturnDTO> => {
  const { data } = await api.post(`/user/bookings/${bookingId}/tickets`, tickets);
  return data;
};

export const getTicketsForBooking = async (
  bookingId: number
): Promise<TicketReturnDTO[]> => {
  const { data } = await api.get<TicketReturnDTO[]>(
    `/user/bookings/${bookingId}/tickets`
  );
  return data;
};