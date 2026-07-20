function StatsCard({ title, value, icon, color = "text-[#D4A017]", subtitle }) {
  return (
    <div
      className="
        group
        bg-[#2A2D34]
        border
        border-white/10
        rounded-3xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#D4A017]
        hover:shadow-2xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>

          <h2 className="mt-3 text-3xl font-black">{value}</h2>

          {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        </div>

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-[#17191D]
            border
            border-white/10
            flex
            items-center
            justify-center
            group-hover:scale-110
            transition
          "
        >
          <span className={color}>{icon}</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
