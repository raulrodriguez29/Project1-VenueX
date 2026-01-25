import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getVenueById, getSeatSections } from "../../api/venue.api"
import type { Venue } from "../../types/Venue"
import type { SeatSection } from "../../types/SeatSection"

export default function VenueDetails() {
  const { id } = useParams()
  const [venue, setVenue] = useState<Venue | null>(null)
  const [seatSections, setSeatSections] = useState<SeatSection[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id || isNaN(Number(id))) return

    Promise.all([
      getVenueById(Number(id)),
      getSeatSections(Number(id)),
    ])
      .then(([eventRes, seatRes]) => {
        setVenue(eventRes.data)
        setSeatSections(seatRes.data)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="text-white text-center py-20">Loading venue…</div>
  }

  if (!venue) {
    return <div className="text-white text-center py-20">Venue not found</div>
  }

  return (
    <div className="max-w-6xl mx-auto py-25 px-6 text-white">
      {/* Venue Name */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        {venue.name}
      </h1>

      {/* EVENT INFO CARD */}
      <div
        className="mt-10 rounded-2xl border border-gray-700 p-8"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location */}
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Location
            </p>
            <p className="mt-1 text-lg font-semibold">
              {venue.location}
            </p>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Description
            </p>
            <p className="mt-1 text-lg font-semibold">
              {venue.description}
            </p>
          </div>
        </div>
      </div>

      {/* SEAT SECTIONS */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-8">
          Seat Sections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {seatSections.map((section) => (
            <div
              key={section.id}
              className="rounded-xl border border-gray-700 p-6 bg-[#1a1a1a]"
            >
              <h3 className="text-lg font-semibold">
                {section.type}
              </h3>

              <p className="text-gray-400 mt-2">
                Capacity: {section.capacity}
              </p>
            </div>
          ))}
        </div>

        <button
          className="mt-6 w-full py-2 rounded-lg text-white font-medium hover:scale-105 transition"
          style={{
            background: "linear-gradient(135deg, #ff3366, #ff6699)",
          }}
          onClick={(e) => {
            e.stopPropagation()
            navigate("/venues")
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}
