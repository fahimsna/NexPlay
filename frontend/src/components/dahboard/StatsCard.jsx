function StatsCard({ title, value, subtitle }) {
  return (
    <div
      className="
        bg-[#2A2D34]
        rounded-2xl
        border
        border-white/10
        p-6
        transition
        hover:border-[#D4A017]
        hover:-translate-y-1
      "
    >
      <h3 className="text-gray-400 text-sm">{title}</h3>

      <h2 className="text-3xl font-bold text-white mt-3">{value}</h2>

      <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
    </div>
  );
}

export default StatsCard;
