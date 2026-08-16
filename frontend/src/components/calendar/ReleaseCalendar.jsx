import { useState } from "react";

function createDateKey(year, month, day) {
  const monthValue = String(month + 1).padStart(2, "0");
  const dayValue = String(day).padStart(2, "0");

  return `${year}-${monthValue}-${dayValue}`;
}

function ReleaseCalendar({
  releases = [],
  selectedDate,
  onSelectDate,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  const releaseCountByDate = releases.reduce((result, item) => {
    if (!item.releaseDate) {
      return result;
    }

    const dateKey = item.releaseDate.split("T")[0];

    result[dateKey] = (result[dateKey] || 0) + 1;

    return result;
  }, {});

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];

  for (let index = 0; index < firstDay; index += 1) {
    days.push(
      <div
        key={`empty-${index}`}
        className="h-16 sm:h-20"
      />,
    );
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = createDateKey(year, month, day);
    const releaseCount = releaseCountByDate[dateKey] || 0;

    const hasRelease = releaseCount > 0;
    const isSelected = selectedDate === dateKey;

    days.push(
      <button
        type="button"
        key={dateKey}
        onClick={() => onSelectDate(dateKey)}
        className={`
          relative flex h-16 flex-col items-center justify-center
          rounded-xl border text-sm font-semibold transition
          sm:h-20 sm:text-base
          ${
            isSelected
              ? "border-yellow-400 bg-yellow-500 text-black"
              : hasRelease
                ? "border-yellow-500/70 bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500 hover:text-black"
                : "border-white/5 bg-[#23272F] text-white hover:bg-[#303640]"
          }
        `}
      >
        <span>{day}</span>

        {hasRelease && (
          <span
            className={`
              mt-1 rounded-full px-2 py-0.5 text-[10px]
              ${
                isSelected
                  ? "bg-black/20 text-black"
                  : "bg-yellow-500 text-black"
              }
            `}
          >
            {releaseCount} release
          </span>
        )}
      </button>,
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#17191D] p-4 shadow-xl sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={previousMonth}
          className="rounded-lg bg-[#23272F] px-4 py-2 text-white transition hover:bg-yellow-500 hover:text-black"
          aria-label="Previous month"
        >
          ←
        </button>

        <h2 className="text-xl font-bold text-white sm:text-2xl">
          {currentDate.toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h2>

        <button
          type="button"
          onClick={nextMonth}
          className="rounded-lg bg-[#23272F] px-4 py-2 text-white transition hover:bg-yellow-500 hover:text-black"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="mb-3 grid grid-cols-7 gap-2 sm:gap-3">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-yellow-400 sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {days}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        Highlighted dates contain scheduled releases.
      </div>
    </div>
  );
}

export default ReleaseCalendar;