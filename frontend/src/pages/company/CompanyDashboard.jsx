import { useEffect, useState } from "react";

import {
  HiBuildingOffice2,
  HiMegaphone,
  HiRocketLaunch,
  HiFilm,
} from "react-icons/hi2";

import CompanyDashboardLayout from "../../layouts/CompanyDashboardLayout";

import { getMyCompany } from "../../services/companyService";

function CompanyDashboard() {
  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      const data = await getMyCompany();

      setCompany(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1
          className="
text-3xl
md:text-4xl
font-black
text-white
"
        >
          Welcome back, {company?.companyName || "Company"}
        </h1>

        <p
          className="
text-gray-400
mt-2
"
        >
          Manage your entertainment business from here.
        </p>
      </div>

      {/* COMPANY HERO CARD */}

      <div
        className="
bg-[#393E46]
rounded-3xl
border
border-white/10
p-6
md:p-8
flex
flex-col
md:flex-row
items-center
justify-between
gap-6
"
      >
        <div
          className="
flex
items-center
gap-5
"
        >
          {/* LOGO */}

          <div
            className="
w-24
h-24
rounded-3xl
overflow-hidden
bg-[#D4A017]
flex
items-center
justify-center
"
          >
            {company?.logo ? (
              <img
                src={`http://localhost:8000/uploads/${company.logo}`}
                alt="Company Logo"
                className="
w-full
h-full
object-cover
"
              />
            ) : (
              <HiBuildingOffice2 size={45} className="text-black" />
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
              {company?.companyName}
            </h2>

            <p
              className="
text-gray-300
mt-1
"
            >
              {company?.industry}
            </p>

            <p
              className="
text-sm
text-gray-400
mt-1
"
            >
              {company?.location}
            </p>
          </div>
        </div>

        <div
          className="
bg-[#222831]
px-5
py-3
rounded-xl
"
        >
          <p
            className="
text-gray-400
text-sm
"
          >
            Account Status
          </p>

          <p
            className="
text-[#D4A017]
font-bold
"
          >
            {company?.status || "Pending"}
          </p>
        </div>
      </div>

      {/* STATS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
"
      >
        <StatsCard
          title="Advertisements"
          value="0"
          icon={<HiMegaphone size={28} />}
        />

        <StatsCard
          title="Campaigns"
          value="0"
          icon={<HiRocketLaunch size={28} />}
        />

        <StatsCard
          title="Upcoming Content"
          value="0"
          icon={<HiFilm size={28} />}
        />

        <StatsCard
          title="Analytics"
          value="--"
          icon={<HiBuildingOffice2 size={28} />}
        />
      </div>

      {/* LOWER SECTION */}

      <div
        className="
grid
lg:grid-cols-2
gap-6
"
      >
        {/* PROFILE SUMMARY */}

        <div
          className="
bg-[#393E46]
rounded-3xl
p-6
border
border-white/10
"
        >
          <h3
            className="
text-xl
font-bold
text-white
mb-5
"
          >
            Company Overview
          </h3>

          <div className="space-y-4">
            <Info label="Website" value={company?.website} />

            <Info label="Industry" value={company?.industry} />

            <Info label="Location" value={company?.location} />
          </div>
        </div>

        {/* RECENT ACTIVITY */}

        <div
          className="
bg-[#393E46]
rounded-3xl
p-6
border
border-white/10
"
        >
          <h3
            className="
text-xl
font-bold
text-white
mb-5
"
          >
            Recent Activity
          </h3>

          <div
            className="
space-y-4
"
          >
            <Activity text="Company profile created" />

            <Activity text="Dashboard activated" />

            <Activity text="No campaigns yet" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }) {
  return (
    <div
      className="
bg-[#393E46]
rounded-3xl
p-6
border
border-white/10
flex
items-center
justify-between
"
    >
      <div>
        <p
          className="
text-gray-400
text-sm
"
        >
          {title}
        </p>

        <h2
          className="
text-3xl
font-black
text-white
mt-2
"
        >
          {value}
        </h2>
      </div>

      <div
        className="
text-[#D4A017]
"
      >
        {icon}
      </div>
    </div>
  );
}

function Info({ label, value }) {
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
"
      >
        {value || "Not added"}
      </p>
    </div>
  );
}

function Activity({ text }) {
  return (
    <div
      className="
bg-[#222831]
rounded-xl
p-4
text-gray-300
"
    >
      {text}
    </div>
  );
}

export default CompanyDashboard;
