import { HiGlobeAlt, HiBuildingOffice2, HiCheckBadge } from "react-icons/hi2";

function CompanyInfoCard({ company }) {
  if (!company) return null;

  const backendURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const logoURL = company.logo ? `${backendURL}${company.logo}` : null;

  const statusStyle = {
    approved: "bg-green-500/20 text-green-400",

    pending: "bg-yellow-500/20 text-yellow-400",

    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <div>
      {/* Header */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-5
          mb-8
        "
      >
        <div
          className="
            w-20
            h-20
            rounded-2xl
            overflow-hidden
            bg-[#D4A017]
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          {logoURL ? (
            <img
              src={logoURL}
              alt={company.companyName}
              className="
                  w-full
                  h-full
                  object-cover
                "
            />
          ) : (
            <HiBuildingOffice2 size={38} className="text-[#17191D]" />
          )}
        </div>

        <div>
          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-white
            "
          >
            Company Information
          </h2>

          <p
            className="
            text-gray-400
            mt-1
          "
          >
            Detailed company profile information
          </p>
        </div>
      </div>

      {/* Information Grid */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >
        <InfoItem label="Company Name" value={company.companyName} />

        <InfoItem label="Industry" value={company.industry} />

        <div>
          <p
            className="
            text-gray-400
            text-sm
          "
          >
            Website
          </p>

          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="
                  flex
                  items-center
                  gap-2
                  text-[#D4A017]
                  mt-2
                  break-all
                  hover:underline
                "
            >
              <HiGlobeAlt size={18} />

              {company.website}
            </a>
          ) : (
            <p
              className="
                text-white
                mt-2
              "
            >
              Not added
            </p>
          )}
        </div>

        <div>
          <p
            className="
            text-gray-400
            text-sm
          "
          >
            Verification Status
          </p>

          <span
            className={`
              inline-flex
              items-center
              gap-2
              mt-2
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              ${statusStyle[company.status] || statusStyle.pending}
            `}
          >
            <HiCheckBadge size={18} />

            {company.status}
          </span>
        </div>
      </div>

      {/* Description */}

      <div className="mt-8">
        <p
          className="
          text-gray-400
          text-sm
          mb-2
        "
        >
          Description
        </p>

        <p
          className="
          text-gray-300
          leading-7
        "
        >
          {company.description || "No description added."}
        </p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p
        className="
        text-gray-400
        text-sm
      "
      >
        {label}
      </p>

      <p
        className="
        text-white
        font-semibold
        mt-2
        wrap-break-words
      "
      >
        {value || "Not added"}
      </p>
    </div>
  );
}

export default CompanyInfoCard;
