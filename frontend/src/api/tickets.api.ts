import api from "axios";

export interface TicketReturnDTO {
  id: number;
  seatSections: string;
  price: number;
}

export const getTicketsForBooking = async (
  bookingId: number
): Promise<TicketReturnDTO[]> => {
  const { data } = await api.get<TicketReturnDTO[]>(
    `/user/bookings/${bookingId}/tickets`
  );
  return data;
};
