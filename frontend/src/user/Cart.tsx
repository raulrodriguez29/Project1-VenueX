import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../api/bookings.api";
import { getTicketsForBooking } from "../api/tickets.api";

interface CartTicket {
  id: number;
  seatSection: string;
  price: number;
}

type UiState = "loading" | "ready" | "empty" | "loginRequired" | "error";

function formatMoney(n: number) {
  const safe = Number.isFinite(n) ? n : 0;
  return `$${safe.toFixed(2)}`;
}

// Small helper to detect 401-ish errors coming from axios/fetch without tightly coupling to axios types
function isUnauthorized(err: unknown): boolean {
  const anyErr = err as any;
  return (
    anyErr?.response?.status === 401 ||
    anyErr?.status === 401 ||
    (typeof anyErr?.message === "string" &&
      anyErr.message.toLowerCase().includes("unauthorized"))
  );
}

export default function Cart() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<CartTicket[]>([]);
  const [uiState, setUiState] = useState<UiState>("loading");
  const [message, setMessage] = useState<string | null>(null);

  // If your auth stores token under a different key, update here
  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    const loadCart = async () => {
      setMessage(null);

      // ✅ Friendly: if user isn’t logged in, don’t even call protected endpoints
      if (!token) {
        setTickets([]);
        setUiState("loginRequired");
        return;
      }

      try {
        setUiState("loading");

        const bookings = await getUserBookings();

        // ✅ empty bookings → friendly empty cart
        if (!bookings || bookings.length === 0) {
          setTickets([]);
          setUiState("empty");
          return;
        }

        // most recent booking (you said cart should be most recent booking)
        const latest = bookings[bookings.length - 1];

        const ticketData = await getTicketsForBooking(latest.id);

        // ✅ Map backend TicketReturnDTO safely:
        // TicketReturnDTO fields: id, seatSection, price
        // Your earlier backend code: private String seatSection;
        const mapped: CartTicket[] = (ticketData ?? []).map((t: any) => ({
          id: Number(t.id),
          seatSection: String(t.seatSection ?? t.seatSections ?? ""),
          price: Number(t.price),
        }));

        setTickets(mapped);
        setUiState(mapped.length > 0 ? "ready" : "empty");
      } catch (err) {
        console.error(err);

        // ✅ Friendly: 401 → login required, not “failed”
        if (isUnauthorized(err)) {
          setTickets([]);
          setUiState("loginRequired");
          return;
        }

        setTickets([]);
        setUiState("error");
        setMessage("We couldn’t load your cart right now. Please try again.");
      }
    };

    loadCart();
  }, [token]);

  const total = useMemo(() => {
    return tickets.reduce((sum, t) => sum + (Number.isFinite(t.price) ? t.price : 0), 0);
  }, [tickets]);

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
          {uiState === "loading" && (
            <p className="text-center text-gray-500">Loading cart...</p>
          )}

          {/* Login Required */}
          {uiState === "loginRequired" && (
            <div className="text-center text-gray-700 space-y-4 bg-white p-8 rounded shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Login required</h2>
              <p className="text-gray-600">
                Please log in to view your bookings and continue to checkout.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 rounded text-white font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #ff3366, #ff6699)",
                  }}
                >
                  Go to Login
                </button>

                <button
                  onClick={() => navigate("/venues")}
                  className="px-6 py-2 rounded font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition"
                >
                  Browse Events
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Tip: After logging in, return here and refresh
              </p>
            </div>
          )}

          {/* Empty cart */}
          {uiState === "empty" && (
            <div className="text-center text-gray-700 space-y-4 bg-white p-8 rounded shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your cart is empty</h2>
              <p className="text-gray-600">Add tickets from an event to begin.</p>
              <button
                onClick={() => navigate("/venues")}
                className="px-6 py-2 rounded text-white font-semibold"
                style={{
                  background: "linear-gradient(135deg, #ff3366, #ff6699)",
                }}
              >
                Browse Events
              </button>
            </div>
          )}

          {/* Error (non-auth, non-empty) */}
          {uiState === "error" && (
            <div className="text-center text-gray-700 space-y-4 bg-white p-8 rounded shadow-sm border border-red-200">
              <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>
              <p className="text-gray-600">{message ?? "Please try again."}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 rounded text-white font-semibold"
                style={{
                  background: "linear-gradient(135deg, #ff3366, #ff6699)",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Ticket list */}
          {uiState === "ready" && tickets.length > 0 && (
            <>
              <div className="space-y-4">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center bg-white p-4 rounded shadow-sm border border-gray-200"
                  >
                    <span className="font-medium text-gray-800">{t.seatSection}</span>
                    <span className="font-semibold text-gray-900">
                      {formatMoney(t.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between mt-8 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span style={{ color: "#ff3366" }}>{formatMoney(total)}</span>
              </div>

              {/* Checkout button */}
              <button
                onClick={() => navigate("/user/checkout")}
                className="w-full mt-6 py-3 rounded text-white font-semibold transition"
                style={{
                  background: "linear-gradient(135deg, #ff3366, #ff6699)",
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