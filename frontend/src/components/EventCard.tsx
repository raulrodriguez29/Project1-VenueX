import RoleGate from "../auth/RoleGate"
import type { Event } from "../types/Events"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { createBooking } from "../api/bookings.api"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

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
        <img
          src={imageUrl}
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/400/300?random=${event.id}`
          }}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
          style={
            event.status === "OPEN"
              ? { background: "rgba(34,197,94,0.9)" }
              : { background: "rgba(255,51,102,0.9)" }
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
            <svg
                className="w-4 h-4"
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
                />
              </svg>
            <span>{event.venueName}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* EDIT EVENT (LEFT) HOST stuff only*/}
          <RoleGate allow={["HOST", "ADMIN"]}>
            <button
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 border border-gray-600 hover:text-white hover:border-pink-400 transition-all"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/events/${event.id}/edit`)
              }}>
              Edit Event
            </button>
          </RoleGate>
          
          {/* GET TICKETS (RIGHT) - UPDATED WITH BOOKING API */}
          <button
            className="ml-auto px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #ff3366, #ff6699)",
            }}
            onClick={async (e) => {
              e.stopPropagation()
              if (!isLoggedIn) {
                navigate("/register")
                return
              }
              
              try {
                const bookingId = await createBooking(event.id)
                console.log('Booking created:', bookingId)
                navigate(`/events/${event.id}/tickets`, { 
                  state: { bookingId } 
                })
              } catch (error) {
                console.error('Booking failed:', error)
              }
            }}>
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  )
}