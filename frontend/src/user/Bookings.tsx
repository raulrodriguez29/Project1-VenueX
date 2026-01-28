import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserBookings, type BookingReturnDTO } from "../api/bookings.api";

export default function Bookings() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const eventIdParam = params.get("eventId");
  const parsedEventId = eventIdParam ? Number(eventIdParam) : undefined;

  const [bookings, setBookings] = useState<BookingReturnDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [eventIdInput, setEventIdInput] = useState<string>(eventIdParam ?? "");

  useEffect(() => {
    const load = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await getUserBookings(
          Number.isFinite(parsedEventId) && (parsedEventId as number) > 0 ? parsedEventId : undefined
        );
        setBookings(data);
      } catch (e: any) {
        const status = e?.response?.status;
        if (status === 401) setError("Please log in to view your bookings.");
        else setError(status ? `Failed to load bookings (HTTP ${status})` : "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [eventIdParam]);

  const formatted = useMemo(() => {
    return bookings.map((b) => ({
      ...b,
      bookedAtPretty: b.bookedAt ? new Date(b.bookedAt).toLocaleString() : "—",
    }));
  }, [bookings]);

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
              className="px-6 py-3 rounded font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition"
              style={{
                        background: "linear-gradient(135deg, #ff3366, #ff6699)",
                      }}
            >
              Back
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            View all bookings here or filter by Booking ID
          </p>

          {/* Filter */}
          <div className="bg-white rounded-lg border border-gray-200 text-black placeholder-gray-400 p-5 mb-8 flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Booking ID (optional)</label>
              <input
                value={eventIdInput}
                onChange={(e) => setEventIdInput(e.target.value)}
                placeholder="e.g. 2"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                style={{ outlineColor: "#ff3366" }}
                inputMode="numeric"
              />
            </div>

            <div className="flex gap-3">
              <button
                className="px-6 py-2 rounded text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
                onClick={() => {
                  const n = Number(eventIdInput);
                  if (!eventIdInput.trim()) {
                    params.delete("eventId");
                    setParams(params, { replace: true });
                    return;
                  }
                  if (Number.isFinite(n) && n > 0) {
                    setParams({ eventId: String(n) }, { replace: true });
                  }
                }}
              >
                Apply
              </button>

              <button
                className="px-6 py-2 rounded text-white font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition"
                style={{ background: "linear-gradient(135deg, #e21f1f, #ff6699)" }}
                onClick={() => {
                  setEventIdInput("");
                  params.delete("eventId");
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
              <p className="text-gray-700 font-medium">No bookings found.</p>
              <p className="text-gray-500 mt-2">Book an event to see it show up here.</p>
              <button
                className="mt-5 px-6 py-2 rounded text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
                onClick={() => navigate("/venues")}
              >
                Browse Events
              </button>
            </div>
          )}

          {/* Table */}
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
                    <tr key={b.id} className="border-b last:border-b-0">
                      <td className="p-4 text-gray-800 font-medium">{b.id}</td>
                      <td className="p-4 text-gray-700">{b.userName}</td>
                      <td className="p-4 text-gray-700">{b.eventName}</td>
                      <td className="p-4 text-gray-700">{b.bookedAtPretty}</td>
                      <td className="p-4 font-semibold" style={{ color: "#ff3366" }}>
                        ${Number(b.totalAmount).toFixed(2)}
                      </td>
                    </tr>
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