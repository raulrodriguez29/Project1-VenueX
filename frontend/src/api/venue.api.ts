import axios from "axios";
import type { Venue } from "../types/Venue";

const BASE_URL = "http://localhost:8080"; 

export const getAllVenues = () =>
  axios.get<Venue[]>(`${BASE_URL}/api/venues`);

export const getVenueById = (id: number) =>
  axios.get<Venue>(`${BASE_URL}/api/venues/${id}`);