import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitPayment } from "../api/checkout.api";

type SeatSectionKey = "VIP" | "Premium" | "Floor" | "General";

interface SelectionItem {
  seatSectionName: SeatSectionKey;
  quantity: number;
  price: number;
}

interface StoredTicketSelection {
  eventId: number;
  selections: SelectionItem[];
  total: number;
  savedAt: string;
}

function formatMoney(n: number) {
  const safe = Number.isFinite(n) ? n : 0;
  return `$${safe.toFixed(2)}`;
}

function getLatestStoredSelection(): StoredTicketSelection | null {
  const keys = Object.keys(sessionStorage).filter((k) =>
    k.startsWith("venuex_ticket_selection_event_")
  );

  let latest: StoredTicketSelection | null = null;

  for (const k of keys) {
    try {
      const parsed = JSON.parse(
        sessionStorage.getItem(k) || "null"
      ) as StoredTicketSelection | null;

      if (!parsed?.savedAt) continue;

      if (
        !latest ||
        new Date(parsed.savedAt).getTime() >
          new Date(latest.savedAt).getTime()
      ) {
        latest = parsed;
      }
    } catch {
      // ignore bad cache
    }
  }

  return latest;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as
    | { selections?: SelectionItem[]; eventId?: number; bookingId?: number }
    | undefined;

  const bookingId = locationState?.bookingId;

  // Use location.state if available, otherwise fall back to sessionStorage
  const cart = useMemo<StoredTicketSelection | null>(() => {
    if (locationState?.selections && locationState.eventId) {
      return {
        eventId: locationState.eventId,
        selections: locationState.selections,
        total: locationState.selections.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        ),
        savedAt: new Date().toISOString(),
      };
    }
    return getLatestStoredSelection();
  }, [locationState]);

  const items = cart?.selections ?? [];

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    [items]
  );

  const serviceFee = useMemo(
    () => (subtotal > 0 ? Math.max(2.5, subtotal * 0.08) : 0),
    [subtotal]
  );

  const total = useMemo(() => subtotal + serviceFee, [subtotal, serviceFee]);

  // Persist cart in sessionStorage
  useEffect(() => {
    if (cart) {
      sessionStorage.setItem(
        `venuex_ticket_selection_event_${cart.eventId}`,
        JSON.stringify(cart)
      );
    }
  }, [cart]);

  // Payment form state
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState(""); // MM/YY
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (items.length === 0) return false;

    const digits = cardNumber.replace(/\D/g, "");
    const cvvDigits = cvv.replace(/\D/g, "");
    const zipDigits = zip.replace(/\D/g, "");
    const expiryOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.trim());

    return (
      nameOnCard.trim().length >= 2 &&
      digits.length >= 12 &&
      expiryOk &&
      (cvvDigits.length === 3 || cvvDigits.length === 4) &&
      zipDigits.length >= 5
    );
  }, [items.length, nameOnCard, cardNumber, expiry, cvv, zip]);

  const handlePay = async () => {
    setError(null);
    if (!canSubmit) {
      setError("Please fill out all payment fields correctly.");
      return;
    }
    if (bookingId === undefined) {
      setError("Booking ID is missing.");
      return;
    }

    try {
      setSubmitting(true);
      const status = await submitPayment(bookingId);
      console.log(status);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-16 flex-1">
      <section className="min-h-[calc(100vh-4rem)] py-16 px-8 sm:px-12 lg:px-16 geometric-pattern hero-gradient">
        <div
          className="max-w-6xl mx-auto h-full"
          style={{
            background: "#f5f5f5f5",
            padding: "3rem",
            borderRadius: "0.25rem",
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
            <div className="w-full">
              <h1
                className="font-display text-4xl md:text-5xl tracking-wide mb-2"
                style={{ color: "#ff3366" }}
              >
                Checkout
              </h1>
              <p className="text-gray-600 mb-8">
                Review your tickets and enter payment details to complete your
                purchase.
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add tickets from an event before checking out.
              </p>
              <button
                className="px-8 py-3 rounded text-white font-semibold"
                style={{
                  background: "linear-gradient(135deg, #ff3366, #ff6699)",
                }}
                onClick={() => navigate("/venues")}
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Payment Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2"
                        style={{ outlineColor: "#ff3366" }}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2"
                        style={{ outlineColor: "#ff3366" }}
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Mock payment — any valid-looking number works.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiration (MM/YY)
                      </label>
                      <input
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="08/29"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2"
                        style={{ outlineColor: "#ff3366" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        inputMode="numeric"
                        placeholder="123"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2"
                        style={{ outlineColor: "#ff3366" }}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Billing ZIP
                      </label>
                      <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        inputMode="numeric"
                        placeholder="75001"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2"
                        style={{ outlineColor: "#ff3366" }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3">
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div className="mt-8 flex items-center justify-end gap-3">
                    <button
                      className="px-6 py-3 rounded font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition"
                      style={{
                        background: "linear-gradient(135deg, #ff3366, #ff6699)",
                      }}
                      onClick={() => navigate("/")}
                      disabled={submitting}
                    >
                      Cancel
                    </button>

                    <button
                      disabled={!canSubmit || submitting}
                      onClick={handlePay}
                      className="px-8 py-3 rounded text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #ff3366, #ff6699)",
                      }}
                    >
                      {submitting ? "Processing..." : `Pay ${formatMoney(total)}`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    {items.map((i) => (
                      <div
                        key={i.seatSectionName}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">
                            {i.seatSectionName}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty {i.quantity} × {formatMoney(i.price)}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          {formatMoney(i.quantity * i.price)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-medium">{formatMoney(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Service Fee</span>
                      <span className="font-medium">{formatMoney(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 text-lg font-bold mt-2">
                      <span>Total</span>
                      <span style={{ color: "#ff3366" }}>{formatMoney(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-sm text-gray-600">
                    This is a <span className="font-semibold">mock</span> credit card
                    payment for your project demo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
