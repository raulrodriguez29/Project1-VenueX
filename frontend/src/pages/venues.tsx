import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import VenueCard from "../components/VenueCard";
import Footer from "../components/Footer";

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
    <>
      <Navbar/>
      <Blank>    
        <div>
          <h2
          className="font-display text-4xl md:text-5xl tracking-wide"
          style={{ color: "#720a24" }}
          >
            VENUES
          </h2>
          <ul
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            id="events-grid"
          >
            {venues.map((venue) => (
              <li key={venue.id}>
                <VenueCard
                  name={venue.name}
                  location={venue.location}
                  description={venue.description}
                />
              </li>
            ))}
          </ul>
        </div>
      </Blank>
      <Footer/>
    </>
  );
};

export default Venues;

