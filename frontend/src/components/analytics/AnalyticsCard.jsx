function AnalyticsCard({ title, value, icon, description }) {
  return (
    <div
      className="
      bg-[#393E46]
      border
      border-white/10
      rounded-3xl
      p-6
      hover:scale-105
      transition
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        "
      >
        <div
          className="
          bg-[#D4A017]
          text-black
          p-3
          rounded-xl
          "
        >
          {icon}
        </div>
      </div>

      <h2
        className="
        text-white
        text-3xl
        font-bold
        mt-5
        "
      >
        {value}
      </h2>

      <p
        className="
        text-gray-300
        font-semibold
        mt-2
        "
      >
        {title}
      </p>

      <p
        className="
        text-gray-400
        text-sm
        mt-1
        "
      >
        {description}
      </p>
    </div>
  );
}

export default AnalyticsCard;
