import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserBookings, type BookingReturnDTO } from "../api/bookings.api";
import React from "react";
import { getTicketsForBooking, type TicketReturnDTO } from "../api/tickets.api";

export default function Bookings() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  // Use bookingId in the URL (not eventId)
  const bookingIdParam = params.get("bookingId");
  const parsedBookingId = bookingIdParam ? Number(bookingIdParam) : undefined;

  const [bookings, setBookings] = useState<BookingReturnDTO[]>([]);
  const [ticketsByBooking, setTicketsByBooking] = useState<Record<number, TicketReturnDTO[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Input box state mirrors URL param
  const [bookingIdInput, setBookingIdInput] = useState<string>(bookingIdParam ?? "");

  useEffect(() => {
    const load = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await getUserBookings();
        
        // Load tickets for ALL bookings automatically
        const bookingsWithTickets = await Promise.all(
          data.map(async (booking) => {
            try {
              const tickets = await getTicketsForBooking(booking.id);
              setTicketsByBooking(prev => ({ ...prev, [booking.id]: tickets }));
              return booking;
            } catch (err) {
              console.error(`Failed to load tickets for booking ${booking.id}:`, err);
              setTicketsByBooking(prev => ({ ...prev, [booking.id]: [] }));
              return booking;
            }
          })
        );
        
        setBookings(bookingsWithTickets);
      } catch (e: any) {
        const status = e?.response?.status;
        if (status === 401) setError("Please log in to view your bookings.");
        else setError(status ? `Failed to load bookings (HTTP ${status})` : "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Apply bookingId filter client-side
  const filtered = useMemo(() => {
    if (!Number.isFinite(parsedBookingId) || (parsedBookingId as number) <= 0) return bookings;
    return bookings.filter((b) => b.id === parsedBookingId);
  }, [bookings, parsedBookingId]);

  const formatted = useMemo(() => {
    return filtered.map((b) => ({
      ...b,
      bookedAtPretty: b.bookedAt ? new Date(b.bookedAt).toLocaleString() : "—",
    }));
  }, [filtered]);

  return (
    <main className="pt-16 flex-1">
      <section className="min-h-[calc(100vh-4rem)] py-16 px-8 sm:px-12 lg:px-16 geometric-pattern hero-gradient">
        <div
          className="max-w-5xl mx-auto h-full"
          style={{ background: "#f5f5f5f5", padding: "3rem", borderRadius: "0.25rem" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="font-display text-4xl md:text-5xl tracking-wide" style={{ color: "#ff3366" }}>
              Your Bookings
            </h1>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full font-semibold border border-gray-300 bg-white text-black hover:bg-gray-50 transition"
            >
              Back
            </button>
          </div>

          <p className="text-gray-600 mb-6">View all bookings here or filter by Booking ID</p>

          {/* Filter */}
          <div className="bg-white rounded-lg border border-gray-200 text-black placeholder-gray-400 p-5 mb-8 flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Booking ID (optional)
              </label>
              <input
                value={bookingIdInput}
                onChange={(e) => setBookingIdInput(e.target.value)}
                placeholder="e.g. 1"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 text-black"
                style={{ outlineColor: "#ff3366" }}
                inputMode="numeric"
              />
            </div>

            <div className="flex gap-3">
              <button
                className="px-6 py-2 rounded-full text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
                onClick={() => {
                  const n = Number(bookingIdInput);

                  if (!bookingIdInput.trim()) {
                    params.delete("bookingId");
                    setParams(params, { replace: true });
                    return;
                  }

                  if (Number.isFinite(n) && n > 0) {
                    setParams({ bookingId: String(n) }, { replace: true });
                  }
                }}
              >
                Apply
              </button>

              <button
                className="px-6 py-2 rounded-full text-black font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition"
                onClick={() => {
                  setBookingIdInput("");
                  params.delete("bookingId");
                  setParams(params, { replace: true });
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* States */}
          {loading && <p className="text-gray-600">Loading bookings...</p>}

          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-white p-4">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && formatted.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-700 font-medium">
                {bookingIdParam ? "No booking found with that Booking ID." : "No bookings found."}
              </p>
              <p className="text-gray-500 mt-2">
                {bookingIdParam ? "Try a different Booking ID or clear the filter" : "Book an event to see it show up here."}
              </p>
              <button
                className="mt-5 px-6 py-2 rounded-full text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
                onClick={() => navigate("/")}
              >
                Browse Events
              </button>
            </div>
          )}

          {/* Table -with tickets*/}
          {!loading && !error && formatted.length > 0 && (
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-4 font-semibold text-gray-700">Booking ID</th>
                    <th className="p-4 font-semibold text-gray-700">User</th>
                    <th className="p-4 font-semibold text-gray-700">Event</th>
                    <th className="p-4 font-semibold text-gray-700">Booked At</th>
                    <th className="p-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {formatted.map((b) => (
                    <React.Fragment key={b.id}>
                      {/* Main booking row */}
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 text-gray-800 font-medium">{b.id}</td>
                        <td className="p-4 text-gray-700">{b.userName}</td>
                        <td className="p-4 text-gray-700">{b.eventName}</td>
                        <td className="p-4 text-gray-700">{b.bookedAtPretty}</td>
                        <td className="p-4 font-semibold" style={{ color: "#ff3366" }}>
                          ${Number(b.totalAmount).toFixed(2)}
                        </td>
                      </tr>

                      {/* Tickets always show underneath */}
                      {ticketsByBooking[b.id]?.length ? (
                        <>
                          <tr>
                            <td colSpan={5} className="p-0">
                              <div className="bg-gray-50 border-t border-gray-200">
                                <div className="px-4 py-2 border-b border-gray-100">
                                  <h4 className="font-semibold text-gray-800 text-sm">
                                    Tickets ({ticketsByBooking[b.id].length})
                                  </h4>
                                </div>
                                <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
                                  {ticketsByBooking[b.id].map((ticket) => (
                                    <div 
                                      key={ticket.id} 
                                      className="px-4 py-2 grid grid-cols-[auto_1fr_auto] gap-4 text-xs items-center"
                                    >
                                      <span className="font-medium text-gray-700 min-w-[50px]">Section:</span>
                                      <span className="text-gray-800">{ticket.seatSections}</span>
                                      <span className="font-semibold text-[#ff3366]">${ticket.price.toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
