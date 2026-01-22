interface EventCardProps {
  title: string
  genre: string
  date: string
  venue: string
  price: number
  bgClass: string
  emoji: string
}

export default function EventCard({
  title,
  genre,
  date,
  venue,
  price,
  bgClass,
  emoji
}: EventCardProps) {
  return (
    <div className="card-hover group rounded-2xl overflow-hidden cursor-pointer">
      <div className="aspect-[4/3] relative overflow-hidden">
        <div className={`absolute inset-0 ${bgClass}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-pink-500">
          {genre}
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          {emoji}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-white group-hover:text-pink-400 transition">
          {title}
        </h3>

        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>{date}</p>
          <p>{venue}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            From <span className="font-bold text-pink-500">${price}</span>
          </span>

          <button className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-pink-400 hover:scale-105 transition">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  )
}
