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

function CompanySidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      path: "/company",
      icon: HiHome,
      exact: true,
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
  ];

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          fixed
          inset-0
          bg-black/50
          z-30
          md:hidden
          "
        />
      )}

      <aside
        className={`
        
        fixed
        top-0
        left-0

        z-40

        h-screen
        w-64

        bg-[#222831]

        border-r
        border-white/10

        transition-transform
        duration-300
        ease-in-out


        ${open ? "translate-x-0" : "-translate-x-full"}

        md:translate-x-0

        `}
      >
        {/* Logo */}

        <div
          className="
          h-20
          flex
          items-center
          justify-between
          px-6

          border-b
          border-white/10
          "
        >
          <h1
            className="
            text-2xl
            font-black
            text-[#D4A017]
            "
          >
            NexPlay
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="
            md:hidden
            text-white
            "
          >
            <HiXMark size={28} />
          </button>
        </div>

        {/* Menu */}

        <nav
          className="
          p-4
          space-y-2
          "
        >
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

                flex
                items-center
                gap-3


                px-4
                py-3


                rounded-xl


                transition


                ${
                  isActive
                    ? "bg-[#D4A017] text-black font-semibold"
                    : "text-[#EEEEEE] hover:bg-[#393E46]"
                }


                `
                }
              >
                <Icon size={22} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}

        <div
          className="
          absolute
          bottom-6
          left-4
          right-4
          "
        >
          <button
            onClick={handleLogout}
            className="

            w-full

            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            text-[#EEEEEE]

            hover:bg-red-500/20

            transition

            "
          >
            <HiArrowRightOnRectangle size={22} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default CompanySidebar;
