//import EventCard from "./EventCard"

export default function TrendingEvents() {
  return (
    <section
    className="py-16"
    style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)" }}
    >
  <div className="max-w-6xl mx-auto px-16 sm:px-20 lg:px-24">
    <div className="flex items-center justify-between mb-12">
      <div>
        <h2
          className="font-display text-4xl md:text-5xl tracking-wide"
          style={{ color: "#ff3366" }}
        >
          TRENDING EVENTS
        </h2>
        <p className="text-gray-400 mt-2">
          Don't miss out on the hottest shows
        </p>
      </div>
      <a
        href="#"
        className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
        style={{ color: "#ff3366" }}
      >
        {" "}
        View All Events
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="events-grid">
      {/* Event Card 1 */}
      <div
        className="card-hover group rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "#1a1a1a", border: "1px solid #333" }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
            <defs>
              <linearGradient
                id="card1Grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#1a1a2e" }} />
                <stop offset="100%" style={{ stopColor: "#16213e" }} />
              </linearGradient>
            </defs>{" "}
            <rect width={400} height={300} fill="url(#card1Grad)" />{" "}
            <circle cx={200} cy={150} r={60} fill="#ff3366" opacity="0.3" />{" "}
            <circle cx={200} cy={150} r={40} fill="#ff3366" opacity="0.5" />{" "}
            <circle cx={200} cy={150} r={20} fill="#ff3366" />{" "}
            <path
              d="M0 250 Q100 220 200 240 Q300 260 400 230 L400 300 L0 300 Z"
              fill="#0a0a0a"
              opacity="0.6"
            />{" "}
            <text
              x={200}
              y={160}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
            >
              🎸
            </text>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(255,51,102,0.9)" }}
          >
            Rock
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition-colors">
            Arctic Monkeys
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Apr 22, 2025 • 7:30 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>The Forum, Los Angeles</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              From{" "}
              <span className="font-bold" style={{ color: "#ff3366" }}>
                $75
              </span>
            </span>{" "}
            <button
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)"
              }}
            >
              {" "}
              Get Tickets{" "}
            </button>
          </div>
        </div>
      </div>
      {/* Event Card 2 */}
      <div
        className="card-hover group rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "#1a1a1a", border: "1px solid #333" }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
            <defs>
              <linearGradient
                id="card2Grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#2d1b4e" }} />
                <stop offset="100%" style={{ stopColor: "#1a0a2e" }} />
              </linearGradient>
            </defs>{" "}
            <rect width={400} height={300} fill="url(#card2Grad)" />{" "}
            <rect
              x={150}
              y={100}
              width={100}
              height={100}
              rx={10}
              fill="#9333ea"
              opacity="0.3"
              transform="rotate(15 200 150)"
            />{" "}
            <rect
              x={160}
              y={110}
              width={80}
              height={80}
              rx={8}
              fill="#9333ea"
              opacity="0.5"
              transform="rotate(15 200 150)"
            />{" "}
            <rect
              x={170}
              y={120}
              width={60}
              height={60}
              rx={6}
              fill="#9333ea"
              transform="rotate(15 200 150)"
            />{" "}
            <path
              d="M0 260 Q100 230 200 250 Q300 270 400 240 L400 300 L0 300 Z"
              fill="#0a0a0a"
              opacity="0.6"
            />{" "}
            <text
              x={200}
              y={160}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
            >
              🎹
            </text>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(147,51,234,0.9)" }}
          >
            Electronic
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition-colors">
            Disclosure
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>May 8, 2025 • 9:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>Avant Gardner, Brooklyn</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              From{" "}
              <span className="font-bold" style={{ color: "#ff3366" }}>
                $65
              </span>
            </span>{" "}
            <button
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)"
              }}
            >
              {" "}
              Get Tickets{" "}
            </button>
          </div>
        </div>
      </div>
      {/* Event Card 3 */}
      <div
        className="card-hover group rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "#1a1a1a", border: "1px solid #333" }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
            <defs>
              <linearGradient
                id="card3Grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#1e3a5f" }} />
                <stop offset="100%" style={{ stopColor: "#0d1b2a" }} />
              </linearGradient>
            </defs>{" "}
            <rect width={400} height={300} fill="url(#card3Grad)" />{" "}
            <polygon
              points="200,80 250,180 150,180"
              fill="#3b82f6"
              opacity="0.3"
            />{" "}
            <polygon
              points="200,100 240,170 160,170"
              fill="#3b82f6"
              opacity="0.5"
            />{" "}
            <polygon points="200,120 225,160 175,160" fill="#3b82f6" />{" "}
            <path
              d="M0 255 Q100 225 200 245 Q300 265 400 235 L400 300 L0 300 Z"
              fill="#0a0a0a"
              opacity="0.6"
            />{" "}
            <text
              x={200}
              y={155}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
            >
              🎤
            </text>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(59,130,246,0.9)" }}
          >
            Hip-Hop
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition-colors">
            Tyler, The Creator
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Jun 3, 2025 • 8:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>United Center, Chicago</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              From{" "}
              <span className="font-bold" style={{ color: "#ff3366" }}>
                $95
              </span>
            </span>{" "}
            <button
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)"
              }}
            >
              {" "}
              Get Tickets{" "}
            </button>
          </div>
        </div>
      </div>
      {/* Event Card 4 */}
      <div
        className="card-hover group rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "#1a1a1a", border: "1px solid #333" }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
            <defs>
              <linearGradient
                id="card4Grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#3d1a1a" }} />
                <stop offset="100%" style={{ stopColor: "#1a0a0a" }} />
              </linearGradient>
            </defs>{" "}
            <rect width={400} height={300} fill="url(#card4Grad)" />{" "}
            <circle cx={170} cy={140} r={40} fill="#ef4444" opacity="0.3" />{" "}
            <circle cx={230} cy={140} r={40} fill="#ef4444" opacity="0.3" />{" "}
            <circle cx={200} cy={170} r={40} fill="#ef4444" opacity="0.5" />{" "}
            <path
              d="M0 260 Q100 230 200 250 Q300 270 400 240 L400 300 L0 300 Z"
              fill="#0a0a0a"
              opacity="0.6"
            />{" "}
            <text
              x={200}
              y={160}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
            >
              🎵
            </text>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(239,68,68,0.9)" }}
          >
            Pop
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition-colors">
            Dua Lipa
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Jul 12, 2025 • 7:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>Hard Rock Stadium, Miami</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              From{" "}
              <span className="font-bold" style={{ color: "#ff3366" }}>
                $110
              </span>
            </span>{" "}
            <button
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)"
              }}
            >
              {" "}
              Get Tickets{" "}
            </button>
          </div>
        </div>
      </div>
      {/* Event Card 5 */}
      <div
        className="card-hover group rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "#1a1a1a", border: "1px solid #333" }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
            <defs>
              <linearGradient
                id="card5Grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#1a2e1a" }} />
                <stop offset="100%" style={{ stopColor: "#0a1a0a" }} />
              </linearGradient>
            </defs>{" "}
            <rect width={400} height={300} fill="url(#card5Grad)" />{" "}
            <rect
              x={160}
              y={100}
              width={80}
              height={80}
              rx={40}
              fill="#22c55e"
              opacity="0.3"
            />{" "}
            <rect
              x={175}
              y={115}
              width={50}
              height={50}
              rx={25}
              fill="#22c55e"
              opacity="0.5"
            />{" "}
            <rect
              x={188}
              y={128}
              width={24}
              height={24}
              rx={12}
              fill="#22c55e"
            />{" "}
            <path
              d="M0 255 Q100 225 200 245 Q300 265 400 235 L400 300 L0 300 Z"
              fill="#0a0a0a"
              opacity="0.6"
            />{" "}
            <text
              x={200}
              y={155}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
            >
              🎷
            </text>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(34,197,94,0.9)" }}
          >
            Jazz
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition-colors">
            Kamasi Washington
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Aug 18, 2025 • 8:30 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>Blue Note Jazz Club, NYC</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              From{" "}
              <span className="font-bold" style={{ color: "#ff3366" }}>
                $85
              </span>
            </span>{" "}
            <button
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)"
              }}
            >
              {" "}
              Get Tickets{" "}
            </button>
          </div>
        </div>
      </div>
      {/* Event Card 6 */}
      <div
        className="card-hover group rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "#1a1a1a", border: "1px solid #333" }}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
            <defs>
              <linearGradient
                id="card6Grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#2e1a3d" }} />
                <stop offset="100%" style={{ stopColor: "#1a0a2e" }} />
              </linearGradient>
            </defs>{" "}
            <rect width={400} height={300} fill="url(#card6Grad)" />{" "}
            <path
              d="M150 120 L200 80 L250 120 L250 180 L200 220 L150 180 Z"
              fill="#f59e0b"
              opacity="0.3"
            />{" "}
            <path
              d="M165 130 L200 100 L235 130 L235 170 L200 200 L165 170 Z"
              fill="#f59e0b"
              opacity="0.5"
            />{" "}
            <path
              d="M180 140 L200 120 L220 140 L220 160 L200 180 L180 160 Z"
              fill="#f59e0b"
            />{" "}
            <path
              d="M0 260 Q100 230 200 250 Q300 270 400 240 L400 300 L0 300 Z"
              fill="#0a0a0a"
              opacity="0.6"
            />{" "}
            <text
              x={200}
              y={160}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
            >
              🎻
            </text>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(245,158,11,0.9)" }}
          >
            Classical
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition-colors">
            Yo-Yo Ma
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Sep 5, 2025 • 7:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                style={{ color: "#ff3366" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>Carnegie Hall, NYC</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              From{" "}
              <span className="font-bold" style={{ color: "#ff3366" }}>
                $120
              </span>
            </span>{" "}
            <button
              className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff3366, #ff6699)"
              }}
            >
              {" "}
              Get Tickets{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}
