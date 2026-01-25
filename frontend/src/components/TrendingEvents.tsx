import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import { getAllEvents } from "../api/events.api"
import type{ Event } from "../types/Events"
import RoleGate from "../auth/RoleGate"

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
        <div className="mb-10 flex items-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Events
          </h2>
          <RoleGate allow={["USER"]}>
            <button
              //onClick={() => navigate("/events/create")}
              className="ml-auto px-5 py-2 rounded-full text-md font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)",}}>
              Request to host an event
            </button>
          </RoleGate>
          {/* ONLY for host and admin*/}
          <RoleGate allow={["HOST", "ADMIN"]}>
            <button
              //onClick={() => navigate("/events/create")}
              className="ml-10 px-5 py-2 rounded-full text-md font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)",}}>
              My Events
            </button>
            <button
              //onClick={() => navigate("/events/create")}
              className="ml-10 px-5 py-2 rounded-full text-md font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)",}}>
              + Create Event
            </button>
          </RoleGate>
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