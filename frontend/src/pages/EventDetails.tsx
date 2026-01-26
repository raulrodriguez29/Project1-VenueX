import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getEventById, getEventSeatSections } from "../api/events.api"
import type { Event } from "../types/Events"
import type { EventSeatSection } from "../types/EventSeatSection"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"

export default function EventDetails() {
  const { id } = useParams()

  const [event, setEvent] = useState<Event | null>(null)
  const [seatSections, setSeatSections] = useState<EventSeatSection[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id || isNaN(Number(id))) return

    Promise.all([
      getEventById(Number(id)),
      getEventSeatSections(Number(id)),
    ])
      .then(([eventRes, seatRes]) => {
        setEvent(eventRes.data)
        setSeatSections(seatRes.data)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="text-white text-center py-20">Loading event…</div>
  }

  if (!event) {
    return <div className="text-white text-center py-20">Event not found</div>
  }

  return (
    <>
    <Navbar />
    <div className="max-w-6xl mx-auto py-20 px-6 text-white">
      {/* EVENT TITLE */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        {event.name}
      </h1>

      {/* EVENT INFO CARD */}
      <div
        className="mt-10 rounded-2xl border border-gray-700 p-8"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* VENUE */}
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Venue
            </p>
            <p className="mt-1 text-lg font-semibold">
              {event.venueName}
            </p>
          </div>

          {/* DATE */}
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Date & Time
            </p>
            <p className="mt-1 text-lg font-semibold">
              {new Date(event.startTime).toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* STATUS */}
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Status
            </p>

            <span
              className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium"
              style={
                event.status === "OPEN"? {
                  background: "rgba(34,197,94,0.2)", // green
                  color: "#22c55e",
                }:{
                  background: "rgba(255,51,102,0.2)", // red/pink
                  color: "#ff3366",
                }
              }>
              {event.status}
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10 max-w-3xl text-gray-300 leading-relaxed">
        {event.description}
      </div>

      {/* SEAT SECTIONS */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-8">
          Seat Sections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {seatSections.map((section) => (
            <div
              key={section.seatSectionName}
              className="rounded-xl border border-gray-700 p-6 bg-[#1a1a1a]"
            >
              <h3 className="text-lg font-semibold">
                {section.seatSectionName}
              </h3>

              <p className="text-gray-400 mt-2">
                Capacity: {section.capacity}
              </p>

              <p className="mt-4 text-2xl font-bold text-pink-400">
                ${section.price}
              </p>
            </div>
          ))}
        </div>
        <button
          className="mt-6 w-full py-2 rounded-lg text-white font-medium hover:scale-105 transition"
          style={{
            background: "linear-gradient(135deg, #ff3366, #ff6699)",}}
            onClick={(e) => {
              e.stopPropagation()
              navigate("/")
            }}>
          Back
        </button>
      </div>
    </div>
    </>
  )
}