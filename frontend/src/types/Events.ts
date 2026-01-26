export interface Event {
    id: number
    venueName: string
    name: string
    description: string
    startTime: string
    status: string
}

export interface CreateEventRequest {
  venue: { id: number };
  name: string;
  description: string;
  startTime: string;
}

export interface UpdateEvents {
  name: string;
  description: string;
  startTime: string;
}