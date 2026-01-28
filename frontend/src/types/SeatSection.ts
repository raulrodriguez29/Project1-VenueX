import type { Venue } from "./Venue";
export interface SeatSection {
  id: number;     
  type: string;       
  capacity: number;    
  venue: Venue;        
}

export interface SeatSectionForm {
  VIP?: number;
  Premium?: number;
  Floor?: number;
  General?: number;
}

export interface CreateSeatSectionRequest {
  type: string;
  capacity: number;
}