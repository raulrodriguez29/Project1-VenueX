// import SearchBar from "./SearchBar";
export default function Navbar() {
  return (
    <nav
  className="fixed top-0 left-0 right-0 z-50 nav-bg border-b border-white/10"
  style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
>
  <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
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
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
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
      {/* Search & Filters */}
      <div className="hidden md:flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <div
            id="search-container"
            className="flex items-center rounded-full px-4 py-2 transition-all duration-300"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
          >
            <svg
              className="w-4 h-4 text-gray-400 cursor-pointer"
              id="search-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              id="search-input"
              placeholder="Search events, artists, venues..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 ml-2 w-64 transition-all duration-300"
            />
          </div>
          {/* Search Results Dropdown */}
          <div
            id="search-results"
            className="search-results absolute top-full left-0 mt-2 w-96 rounded-xl shadow-2xl py-2"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
          >
            {/* Popular Searches */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Popular Searches
              </div>
            </div>
            {/* Artists */}{" "}
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ff3366, #ff6699)"
                }}
              >
                <span className="text-lg">🎤</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">The Weeknd</div>
                <div className="text-xs text-gray-500">
                  Artist • 12 upcoming events
                </div>
              </div>
            </a>{" "}
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #9333ea, #a855f7)"
                }}
              >
                <span className="text-lg">🎸</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  Tame Impala
                </div>
                <div className="text-xs text-gray-500">
                  Artist • 8 upcoming events
                </div>
              </div>
            </a>{" "}
            {/* Venues */}
            <div className="px-4 py-2 mt-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Venues
              </div>
            </div>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#333" }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  Madison Square Garden
                </div>
                <div className="text-xs text-gray-500">
                  New York, NY • 45 events
                </div>
              </div>
            </a>{" "}
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#333" }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">The Forum</div>
                <div className="text-xs text-gray-500">
                  Los Angeles, CA • 32 events
                </div>
              </div>
            </a>{" "}
            {/* Events */}
            <div className="px-4 py-2 mt-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Trending Events
              </div>
            </div>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #60a5fa)"
                }}
              >
                <span className="text-lg">🎵</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  Coachella Valley Music Festival
                </div>
                <div className="text-xs text-gray-500">
                  Apr 11-13, 2025 • Indio, CA
                </div>
              </div>
            </a>{" "}
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #f87171)"
                }}
              >
                <span className="text-lg">🎹</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  Electric Daisy Carnival
                </div>
                <div className="text-xs text-gray-500">
                  May 16-18, 2025 • Las Vegas, NV
                </div>
              </div>
            </a>{" "}
            {/* View All */}
            <div className="px-4 py-3 border-t border-white/10 mt-2">
              <a
                href="#"
                className="flex items-center justify-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                style={{ color: "#ff3366" }}
              >
                {" "}
                View all results
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Filter Dropdowns */}
        <div className="relative">
          <button
            id="location-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-colors"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
          >
            {" "}
            <span>Location</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            id="location-dropdown"
            className="nav-dropdown absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl py-2"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              New York
            </a>{" "}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              Los Angeles
            </a>{" "}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              Chicago
            </a>{" "}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              Miami
            </a>{" "}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              Austin
            </a>
          </div>
        </div>
        <div className="relative">
          <button
            id="date-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-colors"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
          >
            {" "}
            <span>Date</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            id="date-dropdown"
            className="nav-dropdown absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl py-2"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              Today
            </a>{" "}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              This Weekend
            </a>{" "}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              This Month
            </a>{" "}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
            >
              Next Month
            </a>
          </div>
        </div>
      </div>
      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <button
          id="login-btn"
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          {" "}
          Log In{" "}
        </button>{" "}
        <button
          id="signup-btn"
          className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
        >
          {" "}
          Sign Up{" "}
        </button>
      </div>
    </div>
  </div>
</nav>
  );
}
