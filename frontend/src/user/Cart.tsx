import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../api/bookings.api";
import { getTicketsForBooking } from "../api/tickets.api";

interface CartTicket {
  id: number;
  seatSection: string;
  price: number;
}

export default function Cart() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<CartTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------
     Load latest booking + tickets
  --------------------------*/
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);

        const bookings = await getUserBookings();

        // ✅ empty bookings → empty cart
        if (!bookings || bookings.length === 0) {
          setTickets([]);
          return;
        }

        // most recent booking
        const latest = bookings[bookings.length - 1];

        const ticketData = await getTicketsForBooking(latest.id);

        setTickets(ticketData.map(t => ({id: t.id, seatSection: t.seatSections, price: Number(t.price)})));
      } catch (err) {
        console.error(err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  /* -------------------------
     Calculations
  --------------------------*/
  const total = tickets.reduce((sum, t) => sum + t.price, 0);

  /* -------------------------
     UI
  --------------------------*/
  return (
    <main className="pt-16 flex-1">
      <section className="min-h-[calc(100vh-4rem)] py-16 px-8 sm:px-12 lg:px-16 geometric-pattern hero-gradient">
        <div
          className="max-w-4xl mx-auto"
          style={{
            background: "#f5f5f5f5",
            padding: "3rem",
            borderRadius: "0.5rem",
          }}
        >
          {/* Title */}
          <h1
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "#ff3366" }}
          >
            Your Cart
          </h1>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500">Loading cart...</p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}

          {/* Empty cart */}
          {!loading && !error && tickets.length === 0 && (
            <div className="text-center text-gray-600 space-y-4">
              <p>Your cart is empty</p>
              <button
                onClick={() => navigate("/events")}
                className="px-6 py-2 rounded text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #ff3366, #ff6699)",
                }}
              >
                Browse Events
              </button>
            </div>
          )}

          {/* Ticket list */}
          {!loading && tickets.length > 0 && (
            <>
              <div className="space-y-4">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center bg-white p-4 rounded shadow"
                  >
                    <span className="font-medium">
                      {t.seatSection}
                    </span>

                    <span className="font-semibold">
                      ${t.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between mt-8 text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Checkout button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 py-3 rounded text-white font-semibold transition"
                style={{
                  background:
                    "linear-gradient(135deg, #ff3366, #ff6699)",
                }}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}