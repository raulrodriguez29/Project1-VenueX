import type { Event } from "../types/Events";
import type { EventSeatSection } from "../types/EventSeatSection";
import api from './axios.config';

export const getAllEvents = () =>
  api.get<Event[]>(`/events`);

export const getEventById = (id: number) =>
  api.get<Event>(`/events/${id}`);

export const getEventSeatSections = (id: number) =>
  api.get<EventSeatSection[]>(
    `/events/${id}/event-seat-section`
  );