import { useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export default function Checkout(): JSX.Element {
  const navigate = useNavigate();

  const subtotal = 325;
  const fees = 15;
  const total = subtotal + fees;

  const handlePayment = (): void => {
    // Mock payment success
    navigate("/user/payments");
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
          <h1
            className="font-display text-4xl md:text-5xl tracking-wide mb-8"
            style={{ color: "#ff3366" }}
          >
            Checkout
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Order Summary */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Order Summary
              </h2>

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fees</span>
                  <span>${fees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span style={{ color: "#ff3366" }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Payment Details
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full border rounded-md p-3"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border rounded-md p-3"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 border rounded-md p-3"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 border rounded-md p-3"
                  />
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full mt-4 py-4 rounded-lg text-white font-semibold transition"
                  style={{
                    background: "linear-gradient(135deg, #ff3366, #ff6699)",
                  }}
                >
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}