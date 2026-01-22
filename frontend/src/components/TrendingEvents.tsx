import EventCard from "./EventCard"

export default function TrendingEvents() {
  return (
    <section
    className="py-16"
    style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)" }}
    >
  <div className="max-w-6xl mx-auto px-16 sm:px-20 lg:px-24">
    <div className="flex items-center justify-between mb-12">
      <div>
        <h2
          className="font-display text-4xl md:text-5xl tracking-wide"
          style={{ color: "#ff3366" }}
        >
          TRENDING EVENTS
        </h2>
        <p className="text-gray-400 mt-2">
          Don't miss out on the hottest shows
        </p>
      </div>
      <a
        href="#"
        className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
        style={{ color: "#ff3366" }}
      >
        {" "}
        View All Events
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="events-grid">
      <EventCard></EventCard>
      <EventCard></EventCard>
      <EventCard></EventCard>
      <EventCard></EventCard>
      <EventCard></EventCard>
      <EventCard></EventCard>
    </div>
  </div>
</section>

  )
}
