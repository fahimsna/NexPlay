import { HiGlobeAlt, HiBuildingOffice2, HiCheckBadge } from "react-icons/hi2";

function CompanyInfoCard({ company }) {
  if (!company) return null;

  const API_URL = import.meta.env.VITE_API_URL || "https://nexplay-6jls.onrender.com";

  const logoURL = company.logo ? `${API_URL}${company.logo}` : null;

  const statusStyle = {
    approved: "bg-green-500/10 text-green-400 border-green-500/20",

    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <section
      className="

mt-8

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

flex-col

sm:flex-row

sm:items-center

gap-5

pb-6

border-b

border-white/10

"
      >
        <div
          className="

w-20

h-20

rounded-2xl

bg-[#D4A017]

overflow-hidden

flex

items-center

justify-center

"
        >
          {logoURL ? (
            <img
              src={logoURL}
              alt="logo"
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

text-2xl

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

      {/* Information */}

      <div
        className="

grid

grid-cols-1

md:grid-cols-2

gap-6

mt-8

"
      >
        <InfoItem label="Company Name" value={company.companyName} />

        <InfoItem label="Industry" value={company.industry} />

        <div>
          <p className="text-gray-400 text-sm">Website</p>

          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="

flex

items-center

gap-2

mt-2

text-[#D4A017]

hover:underline

break-all

"
            >
              <HiGlobeAlt size={18} />

              {company.website}
            </a>
          ) : (
            <p className="text-white mt-2">Not added</p>
          )}
        </div>

        <div>
          <p className="text-gray-400 text-sm">Verification Status</p>

          <span
            className={`

inline-flex

items-center

gap-2

mt-2

px-4

py-2

rounded-full

border

text-sm

font-semibold

capitalize

${statusStyle[company.status]}

`}
          >
            <HiCheckBadge size={18} />

            {company.status}
          </span>
        </div>
      </div>

      {/* Description */}

      <div
        className="

mt-8

bg-[#24272D]

rounded-2xl

p-5

border

border-white/5

"
      >
        <p
          className="

text-gray-400

text-sm

mb-3

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
    </section>
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

break-words

"
      >
        {value || "Not added"}
      </p>
    </div>
  );
}

export default CompanyInfoCard;
