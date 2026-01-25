import Navbar from "../../components/navbar/Navbar";
import Blank from "../../components/Blank";
import VenueCard from "../../components/VenueCard";
import Footer from "../../components/Footer";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllVenues } from "../../api/venue.api"; 
import type { Venue } from "../../types/Venue";

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
          <div className="flex justify-between">
            <h2
            className="font-display text-4xl md:text-5xl tracking-wide"
            style={{ color: "#720a24" }}
            >
              VENUES
            </h2>
            {/*Plus Icon*/}
            <Link to="/venues/create">
              <button
                aria-label="Create a new venue"
                className="cursor-pointer">
                <svg className="w-8 h-8" viewBox="0 0 20 20" fill="none">
                  <path d="M5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5Z" fill="#720a24"/>
                  <path d="M9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V5Z" fill="#720a24"/>
                </svg>
              </button>
            </Link>
          </div>
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

