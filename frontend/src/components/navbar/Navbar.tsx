import { UserActions } from "./UserActions";
// import {UserActions} from "./UserActions";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
    className="fixed top-0 left-0 right-0 z-50 nav-bg border-b border-white/10"
    style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
    >
  <div className=" flex flex-nowrap row-gap:px-30 justify-between max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
    <div className="flex items-center justify-between h-16 gap-4 ">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
            </svg>
          </div>
          <span
            className="font-display text-2xl tracking-wider"
            id="logo-text"
            style={{ color: "#ff3366" }}
          >
            VENUEX
          </span>
        </div>
      </Link>
        <div id = "offcenter-navbar" className ="flex gap-4 relative left-2">  
          <div className="relative">
            <Link to="/venues">
              <button
                id="venues-btn"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
              >
                {" "}
                <span>Venues</span>
              </button>
            </Link>
          </div>
          <div className="relative">
            <button
              id="events-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
            >
              {" "}
              <span>Events</span>
            </button>
          </div>
          </div>
        </div>
      {/* Auth Buttons */}
      <UserActions/>
  </div>
</nav>
  );
}
