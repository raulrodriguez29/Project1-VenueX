import type { CreateEventRequest, Event, UpdateEvents } from "../types/Events";
import type { CreateEventSeatSectionRequest, EventSeatSectionForm } from "../types/EventSeatSection";
import type { EventSeatSection } from "../types/EventSeatSection";
import api from './axios.config';

export const getAllEvents = () =>
  api.get<Event[]>(`/events`);

export const getEventById = (id: number) =>
  api.get<Event>(`/events/${id}`);

export const getMyEvents = () =>
  api.get<Event[]>('/host/events');

//host 
export const createEvent = (event: CreateEventRequest) =>
  api.post<Event>(`/host/events`, event);

export const updateEvent = (eventId: number, event : Partial<UpdateEvents>) =>
  api.put<Event>(`/host/events/${eventId}`, event);

export const deleteEvent = (eventId: number) => 
  api.delete<Event>(`/host/events/${eventId}`);

export const getEventSeatSections = (id: number) =>
  api.get<EventSeatSection[]>(
    `/events/${id}/event-seat-section`
  );

export const createEventSeatSections = (eventId: number, sections: CreateEventSeatSectionRequest[]) =>
  api.post<EventSeatSection[]>(`/host/events/${eventId}/event-seat-section`, sections);

export const updateEventSeatSection = (eventId : number, sections: EventSeatSectionForm) =>
  api.put<EventSeatSection[]>(`/host/events/${eventId}/event-seat-section`, sections);