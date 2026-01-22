/*
interface EventCardProps {
  title: string
  genre: string
  date: string
  venue: string
  price: number
  bgClass: string
  emoji: string
} */

export default function EventCard() {
  return (
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
  )
}
