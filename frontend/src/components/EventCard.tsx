import type { Event } from "../types/Events"
import { useNavigate } from "react-router-dom"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate()

  const formattedDate = new Date(event.startTime).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  const imageUrl = `https://picsum.photos/seed/${event.id}/400/300`;
  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="card-hover group rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "#1a1a1a", border: "1px solid #333" }}
    >
    {/* IMAGE / VISUAL SECTION */}
    <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
      {/* Random image for the event */}
      <img
        src={imageUrl}
        onError={(e) => {
          e.currentTarget.src = `https://picsum.photos/400/300?random=${event.id}`
        }}
        alt={event.name}
        className="w-full h-full object-cover"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
          style={
            event.status === "OPEN"
            ? { background: "rgba(34,197,94,0.9)" }   // green
            : { background: "rgba(255,51,102,0.9)" } // pink/red
          }>
          {event.status}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition-colors">
          {event.name}
        </h3>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{event.venueName}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #ff3366, #ff6699)",
            }}
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/events/${event.id}`)
            }}
          >
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  )
}