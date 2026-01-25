import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import { getAllEvents } from "../api/events.api"
import type{ Event } from "../types/Events"

export default function TrendingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEvents()
      .then(res => setEvents(res.data))
      .finally(() => setLoading(false))}, [])
  if (loading) return <div className="text-white">Loading events...</div>
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-16">
        {/* TRENDING HEADER */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Events
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}