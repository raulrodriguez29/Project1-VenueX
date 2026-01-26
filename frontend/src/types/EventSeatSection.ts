export interface EventSeatSection {
  seatSectionName: string
  price: number
  capacity: number
}

export interface CreateEventSeatSectionRequest {
  seatSectionName: string;
  price: string;
};

export interface EventSeatSectionForm {
  VIP?: string;
  Premium?: string;
  Floor?: string;
  General?: string;
}