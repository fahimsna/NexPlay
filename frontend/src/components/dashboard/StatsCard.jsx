import {
  HiMegaphone,
  HiRocketLaunch,
  HiCalendarDays,
  HiChartBar,
} from "react-icons/hi2";

function StatsCard({ title, value, subtitle }) {
  const icons = {
    Advertisements: HiMegaphone,

    Campaigns: HiRocketLaunch,

    "Upcoming Content": HiCalendarDays,

    Engagement: HiChartBar,
  };

  const Icon = icons[title] || HiChartBar;

  return (
    <div
      className="

group

bg-linear-to-br

from-[#24272D]

to-[#1B1D22]

border

border-white/10

rounded-3xl

p-6

transition

hover:-translate-y-1

hover:border-[#D4A017]/40

"
    >
      {/* Top */}

      <div
        className="

flex

items-center

justify-between

"
      >
        <div
          className="

w-12

h-12

rounded-2xl

bg-[#D4A017]/10

flex

items-center

justify-center

"
        >
          <Icon
            size={25}
            className="

text-[#D4A017]

"
          />
        </div>

        <span
          className="

text-xs

uppercase

tracking-wider

text-gray-500

"
        >
          NexPlay
        </span>
      </div>

      {/* Value */}

      <h2
        className="

mt-6

text-4xl

font-black

text-white

"
      >
        {value}
      </h2>

      {/* Title */}

      <p
        className="

mt-2

text-gray-300

font-semibold

"
      >
        {title}
      </p>

      {/* Subtitle */}

      <p
        className="

mt-1

text-sm

text-gray-500

"
      >
        {subtitle}
      </p>
    </div>
  );
}

export default StatsCard;
