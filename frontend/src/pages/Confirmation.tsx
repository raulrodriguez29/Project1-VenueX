import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import { Link } from "react-router"

export default function Confirmation() {
    return (
    <>
    <Navbar />
    <Blank>
        <h2
            className="font-display text-5xl md:text-6xl tracking-wide mb-3"
            id="page-title"
            style={{ color: "#ff3366" }}
        >
        Your Tickets have been booked!
        </h2>
        <p
          className="text-xl text-gray-700 leading-relaxed"
        >
          Let the party begin!
        </p>
        <br></br>
        <p
          className="text-xl text-gray-700 leading-relaxed"
        >
          Thank you for choosing VenueX to book your tickets. A 
          notification confirming your booking has been sent to your inbox.
        </p>
        <br></br>
        <Link to="/">
            <button
                className="px-4 py-2 rounded-full text-lg font-bold text-white transition-all hover:scale-105"
                style={{background: "linear-gradient(135deg, #ff3366, #ff6699)"}}
                >
                Return to Home
            </button>
        </Link>
    </Blank>
    <Footer />
    </>
    )
}