import api from "./axios.config";
import type { Venue } from "../types/Venue";
import type { SeatSection, CreateSeatSectionRequest } from "../types/SeatSection";
import type { SeatSectionForm } from "../types/SeatSection";

export const getAllVenues = () => api.get<Venue[]>(`/venues`);

export const getVenueById = (id: number) =>
  api.get<Venue>(`/venues/${id}`);

export const getSeatSections = (id: number) =>
  api.get<SeatSection[]>(`/venues/${id}/seat-sections`);

// ADMIN
export const createVenue = (venue: Partial<Venue>) =>
  api.post<Venue>("/admin/venues", venue);

export const updateVenue = (venueId: number, venue: Partial<Venue>) =>
  api.put<Venue>(`/admin/venues/${venueId}`, venue);

export const deleteVenue = (venueId: number) =>
  api.delete<Venue>(`/admin/venues/${venueId}`);

export const createSeatSections = (venueId: number,sections: CreateSeatSectionRequest[]) =>
  api.post<SeatSection[]>(`/admin/venues/${venueId}/seat-sections`,sections);

export const updateSeatSections = (venueId: number, sections: SeatSectionForm) =>
  api.put<SeatSection[]>(`/admin/venues/${venueId}/seat-sections`, sections);