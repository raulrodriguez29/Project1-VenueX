import { Link } from "react-router-dom";
 
export default function OrganizerPromo() {
  return (
    <section
  className="relative py-20 overflow-hidden"
  style={{
    background: "linear-gradient(135deg, #1a0a2a 0%, #2a1a3a 50%, #1a0a2a 100%)"
  }}
>
  <div className="absolute inset-0 geometric-pattern opacity-20" />
  {/* Decorative blobs */}
  <div
    className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
    style={{ background: "rgba(255,51,102,0.15)" }}
  />
  <div
    className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl"
    style={{ background: "rgba(102,51,255,0.1)" }}
  />
  <div className="relative max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
    <div className="max-w-3xl mx-auto text-center">
      {/* Promo Content */}
      <div className="space-y-6">
        <h2
          className="font-display text-4xl md:text-6xl tracking-wide leading-tight"
          id="promo-title"
          style={{ color: "#ff3366" }}
        >
          BRING YOUR EVENTS TO LIFE
        </h2>
        <p
          className="text-xl text-gray-300 leading-relaxed"
          id="promo-subtitle"
        >
          Partner with VenueX and reach millions of passionate music fans. Our
          platform offers powerful tools for ticketing, marketing, and
          analytics.
        </p>
        <div className="flex flex-wrap gap-4 pt-4 justify-center">
          <Link to="/contact-form">
            <button
              id="get-in-touch-btn"
              className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
            >
              {" "}
              Get in Touch{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}
