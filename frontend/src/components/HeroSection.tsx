export default function HeroSection() {
  return (
    <main className="pt-16">
  {/* Featured Event Hero */}
  <section className="relative hero-gradient overflow-hidden">
    <div className="absolute inset-0 geometric-pattern opacity-30" />
    {/* Decorative Elements */}
    <div
      className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
      style={{ background: "rgba(255,51,102,0.2)" }}
    />
    <div
      className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
      style={{ background: "rgba(102,51,255,0.15)" }}
    />
    <div className="relative max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Hero Text */}
        <div className="space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{
              background: "rgba(255,51,102,0.2)",
              border: "1px solid rgba(255,51,102,0.3)"
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />{" "}
            <span className="text-gray-300">Featured Event</span>
          </div>
          <h1
            className="font-display text-6xl md:text-8xl tracking-wide leading-none"
            id="featured-artist"
            style={{ color: "#ff3366" }}
          >
            AURORA
          </h1>
          <h2
            className="font-display text-3xl md:text-4xl tracking-wider text-white/80"
            id="featured-tour"
          >
            WHAT HAPPENED TO THE HEART TOUR
          </h2>
          <div className="flex flex-wrap gap-6 text-gray-400 justify-center">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                
              </svg>
              <span id="featured-date">March 15, 2025 • 8:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />{" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span id="featured-venue">Madison Square Garden, NYC</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-4 justify-center">
            <button
              id="buy-tickets-btn"
              className="glow-button px-8 py-4 rounded-full text-lg font-bold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)"
              }}
            >
              {" "}
              Buy Tickets Now{" "}
            </button>
          </div>
          <div className="flex items-center gap-4 pt-4 justify-center">
            <span className="text-sm text-gray-500">Starting from</span>{" "}
            <span className="text-2xl font-bold" style={{ color: "#ff3366" }}>
              $89
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

  )
}
