import api from "./axios.config";
import type { Venue } from "../types/Venue";
import type { SeatSection, CreateSeatSectionRequest } from "../types/SeatSection";

export const getAllVenues = () => api.get<Venue[]>(`/venues`);

export const getVenueById = (id: number) =>
  api.get<Venue>(`/venues/${id}`);

export const getSeatSections = (id: number) =>
  api.get<SeatSection[]>(`/venues/${id}/seat-sections`);

// ADMIN
export const createVenue = (venue: Partial<Venue>) =>
  api.post<Venue>("/admin/venues", venue);

export const createSeatSections = (venueId: number,sections: CreateSeatSectionRequest[]) =>
  api.post<SeatSection[]>(`/admin/venues/${venueId}/seat-sections`,sections);