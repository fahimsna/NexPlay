import { HiCheckCircle, HiClock, HiXCircle, HiSparkles } from "react-icons/hi2";

function RecentActivity({ company }) {
  const status = company?.status || "pending";

  const statusConfig = {
    pending: {
      icon: HiClock,

      title: "Verification Pending",

      message:
        "Your company profile has been submitted and is waiting for admin approval.",

      color: "text-yellow-400",

      bg: "bg-yellow-500/10",

      border: "border-yellow-500/20",
    },

    approved: {
      icon: HiCheckCircle,

      title: "Company Verified",

      message:
        "Your company has been successfully verified. You can now promote your content.",

      color: "text-green-400",

      bg: "bg-green-500/10",

      border: "border-green-500/20",
    },

    rejected: {
      icon: HiXCircle,

      title: "Verification Rejected",

      message:
        "Your company verification was rejected. Please update your information.",

      color: "text-red-400",

      bg: "bg-red-500/10",

      border: "border-red-500/20",
    },
  };

  const current = statusConfig[status];

  const Icon = current.icon;

  return (
    <section
      className="

bg-[#1B1D22]

border

border-white/10

rounded-3xl

p-6

sm:p-8

"
    >
      {/* Header */}

      <div
        className="

flex

items-center

gap-3

mb-6

"
      >
        <div
          className="

w-10

h-10

rounded-xl

bg-[#D4A017]/10

flex

items-center

justify-center

"
        >
          <HiSparkles className="text-[#D4A017]" size={22} />
        </div>

        <div>
          <h2
            className="

text-xl

font-bold

text-white

"
          >
            Recent Activity
          </h2>

          <p
            className="

text-gray-400

text-sm

"
          >
            Company verification updates
          </p>
        </div>
      </div>

      {/* Activity */}

      <div
        className={`

rounded-2xl

p-5

border

${current.bg}

${current.border}

`}
      >
        <div
          className="

flex

gap-4

"
        >
          {/* Icon */}

          <div
            className={`

w-12

h-12

rounded-xl

flex

items-center

justify-center

bg-black/20

${current.color}

`}
          >
            <Icon size={26} />
          </div>

          {/* Content */}

          <div className="flex-1">
            <h3
              className={`

font-bold

text-lg

${current.color}

`}
            >
              {current.title}
            </h3>

            <p
              className="

text-gray-300

mt-2

leading-7

text-sm

sm:text-base

"
            >
              {current.message}
            </p>

            <div
              className="

mt-4

flex

items-center

gap-3

"
            >
              <span
                className={`

px-4

py-1.5

rounded-full

text-xs

font-semibold

capitalize

bg-black/20

${current.color}

`}
              >
                {status}
              </span>

              <span
                className="

text-gray-500

text-xs

"
              >
                Latest update
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentActivity;
