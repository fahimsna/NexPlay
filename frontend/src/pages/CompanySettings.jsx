import DashboardLayout from "../layouts/DashboardLayout";

import { HiLockClosed, HiBell, HiTrash, HiUserCircle } from "react-icons/hi2";

function CompanySettings() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Settings
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Manage your company preferences and account settings
          </p>
        </div>

        {/* Account Settings */}

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
          <div className="flex items-center gap-3 mb-6">
            <HiUserCircle size={28} className="text-[#D4A017]" />

            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Account Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Company Email</label>

              <input
                type="email"
                placeholder="company@email.com"
                className="
                  mt-2
                  w-full
                  bg-[#17191D]
                  border
                  border-white/10
                  rounded-xl
                  p-4
                  text-white
                  outline-none
                "
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Company Name</label>

              <input
                type="text"
                placeholder="NexPlay Studios"
                className="
                  mt-2
                  w-full
                  bg-[#17191D]
                  border
                  border-white/10
                  rounded-xl
                  p-4
                  text-white
                  outline-none
                "
              />
            </div>
          </div>
        </section>

        {/* Security */}

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
          <div className="flex items-center gap-3 mb-6">
            <HiLockClosed size={28} className="text-[#D4A017]" />

            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Security
            </h2>
          </div>

          <button
            className="
              bg-[#D4A017]
              text-[#17191D]
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Change Password
          </button>
        </section>

        {/* Notification */}

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
          <div className="flex items-center gap-3 mb-6">
            <HiBell size={28} className="text-[#D4A017]" />

            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Notifications
            </h2>
          </div>

          <div
            className="
              flex
              justify-between
              items-center
              bg-[#17191D]
              p-4
              rounded-xl
            "
          >
            <div>
              <p className="text-white font-semibold">Email Notifications</p>

              <p className="text-gray-400 text-sm mt-1">
                Receive updates about campaigns and content
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="
                w-5
                h-5
                accent-[#D4A017]
              "
            />
          </div>
        </section>

        {/* Danger Zone */}

        <section
          className="
            bg-[#1B1D22]
            rounded-3xl
            p-6
            sm:p-8
            border
            border-red-500/20
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <HiTrash size={28} className="text-red-400" />

            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Danger Zone
            </h2>
          </div>

          <button
            className="
              bg-red-500/20
              text-red-400
              px-6
              py-3
              rounded-xl
              hover:bg-red-500/30
              transition
            "
          >
            Delete Company Profile
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default CompanySettings;
