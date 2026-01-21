import { useEffect, useState } from "react";
import { getAllVenues } from "../api/venue.api"; 
import type { Venue } from "../types/Venue";

const Venues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);

  // READ: fetch venues when page loads
  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      const res = await getAllVenues();
      setVenues(res.data);
    } catch (error) {
      console.error("Failed to fetch venues", error);
    }
  };

  return (
    <div>
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              {venue.name} — {venue.location} (Description: {venue.description})
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Venues;

