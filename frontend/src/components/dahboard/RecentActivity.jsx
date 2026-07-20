function RecentActivity({ company }) {
  const status = company?.status || "pending";

  const statusConfig = {
    pending: {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      title: "Pending Verification",
      message:
        "Your company profile has been submitted and is waiting for admin approval.",
    },
    approved: {
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      title: "Verified Company",
      message:
        "Congratulations! Your company has been verified by the administrator.",
    },
    rejected: {
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      title: "Verification Rejected",
      message: "Please update your company information and submit it again.",
    },
  };

  const current = statusConfig[status];

  return (
    <div
      className="
        bg-[#2A2D34]
        border
        border-white/10
        rounded-2xl
        p-6
      "
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Verification Status
      </h2>

      <div
        className={`
          rounded-xl
          p-5
          border
          ${current.bg}
          ${current.border}
        `}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className={`text-lg font-semibold ${current.color}`}>
              {current.title}
            </h3>

            <p className="text-gray-300 mt-2 leading-7">{current.message}</p>
          </div>

          <span
            className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              capitalize
              ${current.bg}
              ${current.color}
            `}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
