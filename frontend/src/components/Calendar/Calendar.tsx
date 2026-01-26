import './Calendar.css';
import { useMemo, useState } from "react";

interface SelectedDate {
    year: number;
    month: number;
    day: number;
}

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);

  const [hour, setHour] = useState("8");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }

    return days;
  }, [firstDay, daysInMonth]);

  const handleDayClick = (day: number) => {
    setSelectedDate({ year, month, day });
  };

  const formattedDate = selectedDate
    ? `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`
    : "";

  const formattedDateTime = selectedDate
    ? `${formattedDate} ${hour}:${minute}`
    : "";

  return (
    <div>
      <label className="block text-sm text-gray-700 mb-2">
        Select Date &amp; Time
      </label>

      {/* Header */}
      <div className="flex calendar-header items-center justify-between mb-3">
        <button
          onClick={() =>
            setCurrentDate(new Date(year, month - 1, 1))
          }
        >
          ◀
        </button>

        <div className="text-lg font-bold">
          {monthNames[month]} {year}
        </div>

        <button
          onClick={() =>
            setCurrentDate(new Date(year, month + 1, 1))
          }
        >
          ▶
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(d => (
          <div key={d} className="text-center font-semibold">
            {d}
          </div>
        ))}

        {calendarDays.map((day, idx) => {
          if (!day) {
            return <div key={idx} />;
          }

          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          const isSelected =
            selectedDate?.year === year &&
            selectedDate?.month === month &&
            selectedDate?.day === day;

          return (
            <button
              key={idx}
              onClick={() => handleDayClick(day)}
              className={`calendar-day
                ${isToday ? "today" : ""}
                ${isSelected ? "selected" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Time Picker */}
      <div className="flex justify-center gap-2 mt-4 text-gray-700">
        <select value={hour} onChange={e => setHour(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <span>:</span>

        <select value={minute} onChange={e => setMinute(e.target.value)}>
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>

        <select
          value={period}
          onChange={e => setPeriod(e.target.value as "AM" | "PM")}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      {/* Display */}
      {selectedDate && (
        <div className="mt-3 text-center text-sm text-gray-700">
          Selected: {monthNames[selectedDate.month]} {selectedDate.day},{" "}
          {selectedDate.year} at {hour}:{minute} {period}
        </div>
      )}

      {/* Hidden Inputs */}
      <input type="hidden" name="date" value={formattedDate} />
      <input type="hidden" name="datetime" value={formattedDateTime} />
    </div>
  );
}
