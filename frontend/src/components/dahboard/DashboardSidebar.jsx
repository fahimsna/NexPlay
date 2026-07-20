import { Link, useLocation } from "react-router-dom";

import {
  HiBars3,
  HiXMark,
  HiHome,
  HiBuildingOffice2,
  HiMegaphone,
  HiRectangleStack,
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
    <aside
      className={`
        fixed
        top-0
        left-0
        h-screen
        w-72

        bg-[#1B1D22]

        border-r
        border-white/5

        flex
        flex-col

        z-50

        transition-transform
        duration-300

        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
        lg:sticky
        lg:top-0

      `}
    >
      {/* Logo */}

      <div
        className="
          px-8
          py-7
          border-b
          border-white/5
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
      </div>

      {/* Menu */}

      <nav
        className="
          flex-1
          px-5
          py-8
          space-y-2
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`

                  flex
                  items-center
                  gap-4

                  px-5
                  py-3.5

                  rounded-xl

                  transition


                  ${
                    location.pathname === item.path
                      ? "bg-[#D4A017] text-[#17191D]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }

                `}
            >
              <Icon size={22} />

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div
        className="
          p-5
          border-t
          border-white/5
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
            rounded-xl
            text-red-400
            hover:bg-red-500/10
          "
        >
          <HiArrowLeftOnRectangle size={22} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
