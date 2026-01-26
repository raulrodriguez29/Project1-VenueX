/*
import api from "./axios";

export type SeatSectionName = "VIP" | "Premium" | "Floor" | "General";

/**
 * Matches backend EventSeatSectionDTO:
 * {
 *   seatSectionName: string,
 *   price: BigDecimal,
 *   capacity: Integer
 * }
 
export interface EventSeatSectionDTO {
  seatSectionName: string;
  price: number;     // BigDecimal comes over JSON as number (or string in some cases)
  capacity: number;  // remaining capacity
}

export const getEventSeatSections = async (
  eventId: number
): Promise<EventSeatSectionDTO[]> => {
  const { data } = await api.get<EventSeatSectionDTO[]>(
    `/events/${eventId}/event-seat-section`
  );

  // Normalize price/capacity just in case backend sends them as strings
  return (data ?? []).map((s) => ({
    seatSectionName: s.seatSectionName,
    price: Number(s.price),
    capacity: Number(s.capacity),
  }));
};
*/

import api from "./axios";

export type SeatSectionName = "VIP" | "Premium" | "Floor" | "General";

/**
 * Matches backend EventSeatSectionDTO:
 * {
 *   seatSectionName: string
 *   price: BigDecimal
 *   capacity: Integer
 * }
 */
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