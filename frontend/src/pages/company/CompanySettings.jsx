import { useState } from "react";

import {
  HiUserCircle,
  HiLockClosed,
  HiBell,
  HiBuildingOffice2,
  HiCheck,
} from "react-icons/hi2";

function CompanySettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      id: "profile",
      name: "Profile Settings",
      icon: <HiBuildingOffice2 size={22} />,
    },
    {
      id: "account",
      name: "Account Security",
      icon: <HiLockClosed size={22} />,
    },
    {
      id: "notification",
      name: "Notifications",
      icon: <HiBell size={22} />,
    },
  ];

  return (
    <div className="space-y-8">
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
          Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your company account preferences
        </p>
      </div>

      {/* SETTINGS AREA */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-4
        gap-6
        "
      >
        {/* LEFT MENU */}

        <div
          className="
          bg-[#393E46]
          rounded-3xl
          p-4
          border
          border-white/10
          h-fit
          "
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              mb-2
              transition

              ${
                activeTab === tab.id
                  ? "bg-[#D4A017] text-[#222831]"
                  : "text-gray-300 hover:bg-white/5"
              }

              `}
            >
              {tab.icon}

              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT */}

        <div
          className="
          lg:col-span-3
          bg-[#393E46]
          rounded-3xl
          p-6
          md:p-8
          border
          border-white/10
          "
        >
          {/* PROFILE */}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2
                className="
                text-xl
                font-semibold
                text-white
                "
              >
                Company Profile
              </h2>

              <div className="space-y-4">
                <Input label="Company Name" value="Your Company" />

                <Input label="Email" value="company@email.com" />

                <Input label="Website" value="https://company.com" />
              </div>

              <button
                className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-[#D4A017]
              text-[#222831]
              font-semibold
              "
              >
                <HiCheck />
                Save Changes
              </button>
            </div>
          )}

          {/* SECURITY */}

          {activeTab === "account" && (
            <div className="space-y-6">
              <h2
                className="
              text-xl
              text-white
              font-semibold
              "
              >
                Change Password
              </h2>

              <Input label="Current Password" type="password" />

              <Input label="New Password" type="password" />

              <Input label="Confirm Password" type="password" />

              <button
                className="
              px-6
              py-3
              rounded-full
              bg-[#D4A017]
              text-[#222831]
              font-semibold
              "
              >
                Update Password
              </button>
            </div>
          )}

          {/* NOTIFICATION */}

          {activeTab === "notification" && (
            <div>
              <h2
                className="
              text-xl
              text-white
              font-semibold
              "
              >
                Notification Preferences
              </h2>

              <div
                className="
              mt-6
              space-y-4
              "
              >
                <Toggle text="Campaign Approval Updates" />

                <Toggle text="Advertisement Performance Reports" />

                <Toggle text="System Notifications" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, value = "", type = "text" }) {
  return (
    <div>
      <label
        className="
text-sm
text-gray-400
"
      >
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        className="
mt-2
w-full
px-4
py-3
rounded-xl

bg-[#222831]

border
border-white/10

text-white

outline-none

focus:border-[#D4A017]

"
      />
    </div>
  );
}

function Toggle({ text }) {
  return (
    <div
      className="
flex
items-center
justify-between

bg-[#222831]

p-4

rounded-xl
"
    >
      <span className="text-gray-300">{text}</span>

      <input
        type="checkbox"
        className="
w-5
h-5
accent-[#D4A017]
"
      />
    </div>
  );
}

export default CompanySettings;
