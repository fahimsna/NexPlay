import {
  HiBuildingOffice2,
  HiGlobeAlt,
  HiCheckBadge,
  HiPencilSquare,
} from "react-icons/hi2";

import { Link } from "react-router-dom";

function CompanyProfileSummary({ company, dashboard = false }) {
  if (!company) return null;

  const API_URL = import.meta.env.VITE_API_URL || "https://nexplay-6jls.onrender.com";

  const logo = company.logo ? `${API_URL}${company.logo}` : null;

  const statusStyle = {
    approved: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
    },

    pending: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
    },

    rejected: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
    },
  };

  const current = statusStyle[company.status] || statusStyle.pending;

  return (
    <section
      className="

bg-[#1B1D22]

border

border-white/10

rounded-3xl

p-5

sm:p-7

shadow-xl

"
    >
      <div
        className="

flex

flex-col

md:flex-row

md:items-center

justify-between

gap-6

"
      >
        {/* Left Section */}

        <div
          className="

flex

items-center

gap-5

"
        >
          {/* Logo */}

          <div
            className="

relative

w-20

h-20

sm:w-24

sm:h-24

rounded-3xl

bg-[#D4A017]

flex

items-center

justify-center

overflow-hidden

shadow-lg

"
          >
            {logo ? (
              <img
                src={logo}
                alt={company.companyName}
                className="

w-full

h-full

object-cover

"
              />
            ) : (
              <HiBuildingOffice2 size={42} className="text-[#17191D]" />
            )}
          </div>

          {/* Company Details */}

          <div>
            <h1
              className="

text-xl

sm:text-3xl

font-bold

text-white

"
            >
              {company.companyName}
            </h1>

            <p
              className="

text-gray-400

mt-1

"
            >
              {company.industry}
            </p>

            <div
              className="

flex

items-center

gap-2

mt-3

text-sm

text-gray-300

"
            >
              <HiGlobeAlt className="text-[#D4A017]" />

              <span className="truncate max-w-55">
                {company.website || "No website"}
              </span>
            </div>

            {/* Status */}

            <div
              className={`

inline-flex

items-center

gap-2

mt-4

px-4

py-2

rounded-full

border

text-sm

font-semibold

capitalize

${current.bg}

${current.border}

${current.text}

`}
            >
              <HiCheckBadge size={18} />

              {company.status}
            </div>
          </div>
        </div>

        {/* Button */}

        {!dashboard && (
          <Link
            to="/company/profile"
            className="

flex

items-center

justify-center

gap-2

bg-[#D4A017]

text-[#17191D]

px-6

py-3

rounded-xl

font-semibold

hover:scale-105

transition

"
          >
            <HiPencilSquare size={20} />
            Edit Profile
          </Link>
        )}
      </div>
    </section>
  );
}

export default CompanyProfileSummary;
