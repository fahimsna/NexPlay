import { useEffect, useState } from "react";

import {
  HiMegaphone,
  HiRectangleGroup,
  HiCurrencyDollar,
  HiCheckCircle,
} from "react-icons/hi2";

import { getCompanyAnalytics } from "../../services/analyticsService";

import AnalyticsCard from "../../components/company/analytics/AnalyticsCard";

function CompanyAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getCompanyAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!analytics) {
    return <div className="text-white">Loading Analytics...</div>;
  }

  return (
    <div
      className="
space-y-8
"
    >
      {/* HEADER */}

      <div>
        <h1
          className="
text-3xl
md:text-4xl
font-bold
text-white
"
        >
          Company Analytics
        </h1>

        <p
          className="
text-gray-400
mt-2
"
        >
          Monitor advertisement and campaign performance
        </p>
      </div>

      {/* CARDS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
"
      >
        <AnalyticsCard
          title="Total Advertisements"
          value={analytics.advertisements.total}
          description="All created advertisements"
          icon={<HiMegaphone size={25} />}
        />

        <AnalyticsCard
          title="Active Ads"
          value={analytics.advertisements.active}
          description="Currently running"
          icon={<HiCheckCircle size={25} />}
        />

        <AnalyticsCard
          title="Campaigns"
          value={analytics.campaigns.total}
          description="Total marketing campaigns"
          icon={<HiRectangleGroup size={25} />}
        />

        <AnalyticsCard
          title="Total Budget"
          value={`৳ ${analytics.budget}`}
          description="Campaign investment"
          icon={<HiCurrencyDollar size={25} />}
        />
      </div>

      {/* PERFORMANCE SECTION */}

      <div
        className="
bg-[#393E46]
rounded-3xl
border
border-white/10
p-6
"
      >
        <h2
          className="
text-xl
font-bold
text-white
mb-5
"
        >
          Advertisement Overview
        </h2>

        <div
          className="
grid
grid-cols-2
md:grid-cols-4
gap-5
"
        >
          <Stat title="Active" value={analytics.advertisements.active} />

          <Stat title="Draft" value={analytics.advertisements.draft} />

          <Stat title="Completed" value={analytics.advertisements.completed} />

          <Stat title="Total" value={analytics.advertisements.total} />
        </div>
      </div>

      {/* CAMPAIGN */}

      <div
        className="
bg-[#393E46]
rounded-3xl
border
border-white/10
p-6
"
      >
        <h2
          className="
text-xl
font-bold
text-white
mb-5
"
        >
          Campaign Overview
        </h2>

        <div
          className="
grid
grid-cols-2
md:grid-cols-4
gap-5
"
        >
          <Stat title="Active" value={analytics.campaigns.active} />

          <Stat title="Draft" value={analytics.campaigns.draft} />

          <Stat title="Completed" value={analytics.campaigns.completed} />

          <Stat title="Total" value={analytics.campaigns.total} />
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div
      className="
bg-[#222831]
rounded-2xl
p-5
text-center
"
    >
      <h3
        className="
text-2xl
font-bold
text-[#D4A017]
"
      >
        {value}
      </h3>

      <p
        className="
text-gray-300
mt-1
"
      >
        {title}
      </p>
    </div>
  );
}

export default CompanyAnalytics;
