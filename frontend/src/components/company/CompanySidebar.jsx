<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiLogOut,
  FiX,
} from "react-icons/fi";
=======
import { NavLink, useNavigate } from "react-router-dom";

import {
  HiHome,
  HiBuildingOffice2,
  HiMegaphone,
  HiRocketLaunch,
  HiChartBar,
  HiFilm,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiXMark,
} from "react-icons/hi2";

import useAuth from "../../hooks/useAuth";
>>>>>>> dev

function CompanySidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      path: "/company",
<<<<<<< HEAD
      icon: <FiHome />,
      end: true,
=======
      icon: HiHome,
      exact: true,
>>>>>>> dev
    },
    {
      name: "Profile",
      path: "/company/profile",
      icon: HiBuildingOffice2,
    },
    {
      name: "Advertisements",
      path: "/company/advertisements",
      icon: HiMegaphone,
    },
    {
      name: "Campaigns",
      path: "/company/campaigns",
      icon: HiRocketLaunch,
    },
    {
      name: "Upcoming Content",
      path: "/company/content",
      icon: HiFilm,
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
    {
      name: "Upcoming Content",
      path: "/company/upcoming-content",
      icon: <FiCalendar />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
<<<<<<< HEAD
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-64
          border-r border-white/10
          bg-[#111318] p-5
          text-white
          shadow-xl
          transition-transform duration-300
          md:static md:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="
            absolute right-4 top-4
            rounded-lg p-2
            text-gray-300
            transition
            hover:bg-white/10
            hover:text-white
            md:hidden
=======
      {/* =========================
          Mobile Overlay
      ========================= */}

      <div
        className={`
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          z-40
          md:hidden
          transition-opacity
          duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setOpen(false)}
      />

      {/* =========================
          Sidebar
      ========================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50

          h-screen
          w-64

          bg-[#17191D]

          border-r
          border-white/10

          flex
          flex-col

          shadow-2xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        {/* =========================
            Logo
        ========================= */}

        <div
          className="
            h-20
            min-h-20

            flex
            items-center
            justify-between

            px-6

            border-b
            border-white/10
>>>>>>> dev
          "
          aria-label="Close sidebar"
        >
          <NavLink
            to="/company"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 group"
          >
            {/* Logo Mark */}

<<<<<<< HEAD
        <h1 className="mb-10 text-2xl font-bold text-purple-500">
          NexPlay
        </h1>

        <nav className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `
                  flex items-center gap-3
                  rounded-lg px-4 py-3
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }
                `
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="
            mt-10 flex w-full items-center gap-3
            rounded-lg px-4 py-3
            text-red-400
            transition
            hover:bg-red-500/10
            hover:text-red-300
          "
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
=======
            <div
              className="
                w-9
                h-9

                rounded-xl

                bg-[#D4A017]

                flex
                items-center
                justify-center

                shadow-lg
                shadow-[#D4A017]/10

                group-hover:scale-105

                transition
              "
            >
              <span
                className="
                  text-[#17191D]
                  font-black
                  text-lg
                "
              >
                N
              </span>
            </div>

            {/* Logo Name */}

            <div>
              <h1
                className="
                  text-xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                Nex<span className="text-[#D4A017]">Play</span>
              </h1>

              <p
                className="
                  text-[10px]
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Company Portal
              </p>
            </div>
          </NavLink>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="
              md:hidden

              w-9
              h-9

              rounded-lg

              flex
              items-center
              justify-center

              text-gray-400

              hover:text-white
              hover:bg-white/10

              transition
            "
          >
            <HiXMark size={24} />
          </button>
        </div>

        {/* =========================
            Navigation
        ========================= */}

        <nav
          className="
            flex-1

            p-4

            space-y-1

            overflow-y-auto
          "
        >
          <p
            className="
              px-4
              pt-2
              pb-3

              text-[11px]
              font-semibold
              uppercase
              tracking-widest

              text-gray-600
            "
          >
            Workspace
          </p>

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                    group

                    flex
                    items-center
                    gap-3

                    px-4
                    py-3

                    rounded-xl

                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-[#D4A017]
                          text-[#17191D]
                          shadow-lg
                          shadow-[#D4A017]/10
                          font-semibold
                        `
                        : `
                          text-gray-400
                          hover:text-white
                          hover:bg-[#24272D]
                        `
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={21}
                      className={`
                        transition-transform
                        duration-200

                        ${isActive ? "" : "group-hover:scale-110"}
                      `}
                    />

                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* =========================
            Logout
        ========================= */}

        <div
          className="
            p-4

            border-t
            border-white/10
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full

              flex
              items-center
              gap-3

              px-4
              py-3

              rounded-xl

              text-gray-400

              hover:text-red-400
              hover:bg-red-500/10

              transition-all
              duration-200
            "
          >
            <HiArrowRightOnRectangle size={21} />

            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
>>>>>>> dev
      </aside>
    </>
  );
}

export default CompanySidebar;