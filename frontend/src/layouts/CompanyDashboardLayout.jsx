import { Outlet } from "react-router-dom";
import { useState } from "react";

import CompanySidebar from "../components/company/CompanySidebar";

import { HiBars3, HiBuildingOffice2 } from "react-icons/hi2";

function CompanyDashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* =========================
          Sidebar
      ========================= */}

      <CompanySidebar open={open} setOpen={setOpen} />

      {/* =========================
          Main Area
      ========================= */}

      <div className="md:ml-64 min-h-screen">
        {/* =========================
            Top Header
        ========================= */}

        <header
          className="
            sticky
            top-0
            z-30

            h-20

            bg-[#17191D]/95
            backdrop-blur-xl

            border-b
            border-white/10

            flex
            items-center
            justify-between

            px-4
            sm:px-6
            lg:px-10
          "
        >
          {/* Left */}

          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open sidebar"
              className="
                md:hidden

                w-10
                h-10

                flex
                items-center
                justify-center

                rounded-xl

                bg-[#24272D]
                border
                border-white/10

                text-gray-300

                hover:text-white
                hover:border-[#D4A017]

                transition
              "
            >
              <HiBars3 size={24} />
            </button>

            {/* Header Title */}

            <div className="flex items-center gap-3">
              <div
                className="
                  hidden
                  sm:flex

                  w-10
                  h-10

                  rounded-xl

                  bg-[#D4A017]

                  items-center
                  justify-center

                  shadow-lg
                  shadow-[#D4A017]/10
                "
              >
                <HiBuildingOffice2 size={21} className="text-[#17191D]" />
              </div>

              <div>
                <p
                  className="
                    text-[11px]
                    sm:text-xs

                    uppercase
                    tracking-widest

                    text-gray-500
                    font-semibold
                  "
                >
                  NexPlay
                </p>

                <h1
                  className="
                    text-lg
                    sm:text-xl

                    font-bold

                    text-white
                  "
                >
                  Company Portal
                </h1>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-3">
            {/* Company Status */}

            <div
              className="
                hidden
                sm:flex

                items-center
                gap-2

                px-4
                py-2

                rounded-xl

                bg-[#24272D]
                border
                border-white/10
              "
            >
              <span
                className="
                  w-2
                  h-2

                  rounded-full

                  bg-green-400

                  shadow
                  shadow-green-400/50
                "
              />

              <span
                className="
                  text-sm
                  text-gray-400
                "
              >
                Company Account
              </span>
            </div>

            {/* Avatar */}

            <div
              className="
                w-10
                h-10

                rounded-xl

                bg-[#24272D]
                border
                border-white/10

                flex
                items-center
                justify-center
              "
            >
              <HiBuildingOffice2 size={20} className="text-[#D4A017]" />
            </div>
          </div>
        </header>

        {/* =========================
            Main Content
        ========================= */}

        <main
          className="
            min-h-[calc(100vh-5rem)]

            p-4
            sm:p-6
            lg:p-10
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default CompanyDashboardLayout;
