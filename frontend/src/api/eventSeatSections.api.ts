import api from "./axios.config";

export type SeatSectionName = "VIP" | "Premium" | "Floor" | "General";

export interface EventSeatSectionDTO {
  seatSectionName: SeatSectionName | string;
  price: number;
  capacity: number;
}

export const getEventSeatSections = async (
  eventId: number
): Promise<EventSeatSectionDTO[]> => {
  const { data } = await api.get<EventSeatSectionDTO[]>(
    `/events/${eventId}/event-seat-section`
  );

  return (data ?? []).map((s) => ({
    seatSectionName: s.seatSectionName,
    price: Number(s.price),
    capacity: Number(s.capacity),
  }));
};