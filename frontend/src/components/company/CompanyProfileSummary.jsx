import {
  HiBuildingOffice2,
  HiGlobeAlt,
  HiCheckBadge,
  HiPencilSquare,
} from "react-icons/hi2";

import { Link } from "react-router-dom";

function CompanyProfileSummary({ company, dashboard = false }) {
  if (!company) return null;

  const statusStyles = {
    approved: {
      bg: "bg-green-500/15",

      text: "text-green-400",

      border: "border-green-500/20",
    },

    pending: {
      bg: "bg-yellow-500/15",

      text: "text-yellow-400",

      border: "border-yellow-500/20",
    },

    rejected: {
      bg: "bg-red-500/15",

      text: "text-red-400",

      border: "border-red-500/20",
    },
  };

  const current = statusStyles[company.status] || statusStyles.pending;

  const logo = company.logo ? `http://localhost:8000${company.logo}` : "";

  return (
    <section
      className="
        bg-[#1B1D22]
        rounded-3xl
        p-6
        sm:p-8
        border
        border-white/5
      "
    >
      <div
        className="
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-6
        "
      >
        {/* Left */}

        <div
          className="
            flex
            items-center
            gap-6
          "
        >
          {/* Logo */}

          <div
            className="
              w-24
              h-24
              rounded-3xl
              bg-[#D4A017]
              flex
              items-center
              justify-center
              overflow-hidden
              shrink-0
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
              <HiBuildingOffice2
                size={45}
                className="
                  text-[#17191D]
                "
              />
            )}
          </div>

          {/* Details */}

          <div>
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-white
              "
            >
              {company.companyName}
            </h2>

            <p
              className="
                text-gray-400
                mt-2
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
                text-gray-300
              "
            >
              <HiGlobeAlt className="text-[#D4A017]" />

              <span>{company.website || "No website"}</span>
            </div>

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

                ${current.bg}

                ${current.text}

                ${current.border}

              `}
            >
              <HiCheckBadge size={18} />

              {company.status}
            </div>
          </div>
        </div>

        {/* Buttons only on Profile Page */}

        {!dashboard && (
          <Link
            to="/company/profile"
            className="
                flex
                items-center
                gap-2
                bg-[#D4A017]
                text-[#17191D]
                px-6
                py-3
                rounded-xl
                font-semibold
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
