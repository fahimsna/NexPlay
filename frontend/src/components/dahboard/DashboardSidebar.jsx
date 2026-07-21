import { Link, useLocation } from "react-router-dom";

import {
  HiXMark,
  HiHome,
  HiBuildingOffice2,
  HiRectangleStack,
  HiMegaphone,
  HiFilm,
  HiCalendarDays,
  HiChartBar,
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";

function DashboardSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/company/dashboard",
      icon: HiHome,
    },

    {
      name: "Company Profile",
      path: "/company/profile",
      icon: HiBuildingOffice2,
    },

    {
      name: "Advertisement",
      path: "/company/advertisement",
      icon: HiRectangleStack,
    },

    {
      name: "Campaigns",
      path: "/company/campaigns",
      icon: HiMegaphone,
    },

    {
      name: "Content",
      path: "/company/content",
      icon: HiFilm,
    },

    {
      name: "Upcoming Content",
      path: "/company/upcoming-content",
      icon: HiCalendarDays,
    },

    {
      name: "Analytics",
      path: "/company/analytics",
      icon: HiChartBar,
    },

    {
      name: "Settings",
      path: "/company/settings",
      icon: HiCog6Tooth,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="

fixed

inset-0

bg-black/50

z-40

lg:hidden

"
        />
      )}

      <aside
        className={`

fixed

top-0

left-0

h-screen

w-72

bg-[#1B1D22]

border-r

border-white/10

z-50

flex

flex-col

transition-transform

duration-300


${isOpen ? "translate-x-0" : "-translate-x-full"}



lg:translate-x-0

`}
      >
        {/* Logo */}

        <div
          className="

h-20

px-7

flex

items-center

justify-between

border-b

border-white/10

"
        >
          <Link
            to="/company/dashboard"
            className="

text-3xl

font-black

"
          >
            <span className="text-[#D4A017]">Nex</span>

            <span className="text-white">Play</span>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="

lg:hidden

text-gray-400

"
          >
            <HiXMark size={26} />
          </button>
        </div>

        {/* Navigation */}

        <nav
          className="

flex-1

px-5

py-7

overflow-y-auto

"
        >
          <p
            className="

text-xs

uppercase

tracking-widest

text-gray-500

mb-4

px-3

"
          >
            Workspace
          </p>

          <div
            className="

space-y-2

"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`

group

flex

items-center

gap-4

px-4

py-3.5

rounded-2xl

transition-all



${
  active
    ? "bg-[#D4A017] text-[#17191D] shadow-lg shadow-yellow-500/10"
    : "text-gray-400 hover:text-white hover:bg-white/5"
}


`}
                >
                  <Icon
                    size={22}
                    className={`

transition-transform

group-hover:scale-110

${active ? "" : "text-gray-400"}

`}
                  />

                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Logout */}

        <div
          className="

p-5

border-t

border-white/10

"
        >
          <button
            className="

w-full

flex

items-center

gap-4

px-5

py-3.5

rounded-2xl

text-red-400

hover:bg-red-500/10

transition

"
          >
            <HiArrowLeftOnRectangle size={22} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
