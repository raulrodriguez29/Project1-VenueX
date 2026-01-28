import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventSeatSections } from "../api/eventSeatSections.api";
import type { EventSeatSectionDTO } from "../api/eventSeatSections.api";

type SeatSectionKey = "VIP" | "Premium" | "Floor" | "General";

interface SeatSectionRow {
  seatSectionName: SeatSectionKey;
  price: number;
  capacity: number; // remaining capacity
}

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

const STORAGE_KEY = (eventId: number) => `venuex_ticket_selection_event_${eventId}`;

// Normalize backend DTO into what the UI needs (based on your backend DTO shape)
function normalizeSeatSections(raw: EventSeatSectionDTO[]): SeatSectionRow[] {
  const allowed: SeatSectionKey[] = ["VIP", "Premium", "Floor", "General"];

  return (raw ?? [])
    .map((x) => {
      const normalizedName = (x.seatSectionName ?? "").trim();

      const matched = allowed.find(
        (s) => s.toLowerCase() === normalizedName.toLowerCase()
      );

      return {
        seatSectionName: (matched ?? "General") as SeatSectionKey,
        price: Number(x.price),
        capacity: Number(x.capacity),
      } satisfies SeatSectionRow;
    })
    // ensure stable order
    .sort(
      (a, b) =>
        ["VIP", "Premium", "Floor", "General"].indexOf(a.seatSectionName) -
        ["VIP", "Premium", "Floor", "General"].indexOf(b.seatSectionName)
    );
}

export default function Ticket() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const parsedEventId = Number(eventId);

  const [rows, setRows] = useState<SeatSectionRow[]>([]);
  const [qtyBySection, setQtyBySection] = useState<Record<SeatSectionKey, number>>({
    VIP: 0,
    Premium: 0,
    Floor: 0,
    General: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load seat sections for the event
  useEffect(() => {
    const load = async () => {
      setError(null);

      if (!Number.isFinite(parsedEventId) || parsedEventId <= 0) {
        setLoading(false);
        setError("Invalid event ID. Please go back and try again.");
        return;
      }

      try {
        setLoading(true);

        const data = await getEventSeatSections(parsedEventId);
        const normalized = normalizeSeatSections(data);
        setRows(normalized);

        // Restore selections if user previously picked quantities for this event
        const saved = sessionStorage.getItem(STORAGE_KEY(parsedEventId));
        if (saved) {
          try {
            const parsed: StoredTicketSelection = JSON.parse(saved);

            const restored: Record<SeatSectionKey, number> = {
              VIP: 0,
              Premium: 0,
              Floor: 0,
              General: 0,
            };

            for (const item of parsed.selections) {
              restored[item.seatSectionName] = item.quantity;
            }

            setQtyBySection(restored);
          } catch {
            // ignore bad cache
          }
        }
      } catch (e: any) {
    console.error(e);
    const status = e?.response?.status;
    setError(status ? `Failed to load seat sections (HTTP ${status})` : "Failed to load seat sections for this event.");
  }
  finally {
        setLoading(false);
      }
    };

    load();
  }, [parsedEventId]);

  // Validation per row
  const validation = useMemo(() => {
    const errors: Partial<Record<SeatSectionKey, string>> = {};

    for (const r of rows) {
      const qty = qtyBySection[r.seatSectionName] ?? 0;

      if (!Number.isInteger(qty) || qty < 0) {
        errors[r.seatSectionName] = "Quantity must be 0 or more.";
        continue;
      }

      if (qty > r.capacity) {
        errors[r.seatSectionName] = `Cannot exceed remaining capacity (${r.capacity}).`;
      }
    }

    return errors;
  }, [rows, qtyBySection]);

  const totalTickets = useMemo(() => {
    return rows.reduce((sum, r) => sum + (qtyBySection[r.seatSectionName] ?? 0), 0);
  }, [rows, qtyBySection]);

  const totalPrice = useMemo(() => {
    return rows.reduce((sum, r) => {
      const qty = qtyBySection[r.seatSectionName] ?? 0;
      return sum + qty * r.price;
    }, 0);
  }, [rows, qtyBySection]);

  const canAddToCart =
    !loading &&
    !error &&
    rows.length > 0 &&
    Object.keys(validation).length === 0 &&
    totalTickets > 0;

  const onQtyChange = (section: SeatSectionKey, nextValue: string) => {
    const num = nextValue.trim() === "" ? 0 : Number(nextValue);

    setQtyBySection((prev) => ({
      ...prev,
      [section]: Number.isFinite(num) ? Math.max(0, Math.floor(num)) : prev[section],
    }));
  };

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    const selections: SelectionItem[] = rows
      .map((r) => ({
        seatSectionName: r.seatSectionName,
        quantity: qtyBySection[r.seatSectionName] ?? 0,
        price: r.price,
      }))
      .filter((x) => x.quantity > 0);

    const payload: StoredTicketSelection = {
      eventId: parsedEventId,
      selections,
      total: Number(totalPrice.toFixed(2)),
      savedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(STORAGE_KEY(parsedEventId), JSON.stringify(payload));

    navigate("/user/cart");
  };

  return (
    <main className="pt-16 flex-1">
      <section className="min-h-[calc(100vh-4rem)] py-16 px-8 sm:px-12 lg:px-16 geometric-pattern hero-gradient">
        <div
          className="max-w-6xl mx-auto h-full"
          style={{ background: "#f5f5f5f5", padding: "3rem", borderRadius: "0.25rem" }}
        >
          <h1
            className="font-display text-4xl md:text-5xl tracking-wide mb-6"
            style={{ color: "#ff3366" }}
          >
            Select Tickets
          </h1>

          <p className="text-gray-600 mb-8">
            Choose quantities for each seat section. You can’t exceed the remaining capacity.
          </p>

          {loading && <p className="text-gray-600">Loading seat sections...</p>}

          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-white p-4">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                className="mt-4 px-6 py-2 rounded text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {rows.length === 0 ? (
                <p className="text-gray-600">No seat sections found for this event.</p>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="p-4 font-semibold text-gray-700">Seat Section</th>
                        <th className="p-4 font-semibold text-gray-700">Price</th>
                        <th className="p-4 font-semibold text-gray-700">Remaining</th>
                        <th className="p-4 font-semibold text-gray-700">Your Qty</th>
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map((r) => {
                        const qty = qtyBySection[r.seatSectionName] ?? 0;
                        const rowError = validation[r.seatSectionName];

                        return (
                          <tr key={r.seatSectionName} className="border-b last:border-b-0">
                            <td className="p-4 font-medium text-gray-800">{r.seatSectionName}</td>
                            <td className="p-4 text-gray-700">${r.price.toFixed(2)}</td>
                            <td className="p-4 text-gray-700">{r.capacity}</td>

                            <td className="p-4">
                              <input
                                type="number"
                                min={0}
                                step={1}
                                value={qty}
                                onChange={(e) => onQtyChange(r.seatSectionName, e.target.value)}
                                className="w-28 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                                style={{ outlineColor: "#ff3366" }}
                              />
                              {rowError && <p className="mt-2 text-sm text-red-600">{rowError}</p>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 w-full md:w-auto">
                  <p className="text-gray-700">
                    Tickets Selected: <span className="font-semibold">{totalTickets}</span>
                  </p>
                  <p className="text-gray-700 mt-2">
                    Total:{" "}
                    <span className="font-bold" style={{ color: "#ff3366" }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </p>
                  {totalTickets === 0 && (
                    <p className="text-sm text-gray-500 mt-2">Select at least 1 ticket to continue.</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    className="px-6 py-3 rounded font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>

                  <button
                    disabled={!canAddToCart}
                    onClick={handleAddToCart}
                    className="px-8 py-3 rounded text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}