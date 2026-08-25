import { useState } from "react";
import {
  HiOutlineSearch,
  HiMenu,
  HiX,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Discover",
      path: "/browse",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Series",
      path: "/series",
    },
    {
      name: "Sports",
      path: "/sports",
    },
    {
      name: "Upcoming",
      path: "/upcoming",
    },
    {
      name: "Top Rated",
      path: "/top-rated",
    },
  ];

  const handleLogout = () => {
    logout();

    setOpen(false);

    navigate("/");
  };

  return (
    <nav
      className="
        w-full
        bg-[#17191D]
        border-b
        border-white/10
        sticky
        top-0
        z-50
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          py-5
          flex
          items-center
          justify-between
        "
      >
        {/* =======================
            Logo
        ======================= */}

        <Link
          to="/"
          className="
            text-3xl
            font-black
            tracking-tight
            hover:opacity-90
            transition
          "
        >
          <span className="text-[#D4A017]">Nex</span>

          <span className="text-white">Play</span>
        </Link>

        {/* =======================
            Desktop Menu
        ======================= */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-8
            text-sm
            font-medium
            text-gray-300
          "
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="
                hover:text-[#D4A017]
                transition
              "
            >
              {item.name}
            </Link>
          ))}

          {/* My Reviews */}

          {isAuthenticated && (
            <Link
              to="/my-reviews"
              className="
                hover:text-[#D4A017]
                transition
              "
            >
              My Reviews
            </Link>
          )}
        </div>

        {/* =======================
            Desktop Actions
        ======================= */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          {/* Search */}

          <Link
            to="/browse"
            className="
              hidden
              sm:flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/5
              border
              border-white/10
              text-gray-300
              hover:border-[#D4A017]
              hover:text-white
              transition
            "
          >
            <HiOutlineSearch size={18} />

            Search
          </Link>

          {/* =======================
              Logged In
          ======================= */}

          {isAuthenticated ? (
            <>
              {/* Profile */}

              <Link
                to="/profile"
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  text-gray-300
                  hover:border-[#D4A017]
                  hover:text-white
                  transition
                "
              >
                <HiOutlineUserCircle size={20} />

                Profile
              </Link>

              {/* Logout */}

              <button
                onClick={handleLogout}
                className="
                  hidden
                  sm:inline-flex
                  px-6
                  py-2.5
                  rounded-full
                  bg-[#D4A017]
                  text-[#17191D]
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            /* Login */

            <Link
              to="/login"
              className="
                px-6
                py-2.5
                rounded-full
                bg-[#D4A017]
                text-[#17191D]
                font-semibold
                hover:scale-105
                transition
              "
            >
              Login
            </Link>
          )}

          {/* =======================
              Mobile Button
          ======================= */}

          <button
            onClick={() => setOpen(!open)}
            className="
              lg:hidden
              text-white
              hover:text-[#D4A017]
              transition
            "
            aria-label="Toggle menu"
          >
            {open ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* =======================
          Mobile Menu
      ======================= */}

      {open && (
        <div
          className="
            lg:hidden
            bg-[#1E2126]
            border-t
            border-white/10
            px-6
            py-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              text-gray-300
            "
          >
            {/* Main Menu */}

            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className="
                  hover:text-[#D4A017]
                  transition
                "
              >
                {item.name}
              </Link>
            ))}

            {/* My Reviews */}

            {isAuthenticated && (
              <Link
                to="/my-reviews"
                onClick={() => setOpen(false)}
                className="
                  hover:text-[#D4A017]
                  transition
                "
              >
                My Reviews
              </Link>
            )}

            {/* Profile */}

            {isAuthenticated && (
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="
                  flex
                  items-center
                  gap-2
                  hover:text-[#D4A017]
                  transition
                "
              >
                <HiOutlineUserCircle size={20} />

                Profile
              </Link>
            )}

            {/* Search */}

            <Link
              to="/browse"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-2
                hover:text-[#D4A017]
                transition
              "
            >
              <HiOutlineSearch />

              Search
            </Link>

            {/* Login / Logout */}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="
                  text-center
                  py-2.5
                  rounded-full
                  bg-[#D4A017]
                  text-[#17191D]
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="
                  text-center
                  py-2.5
                  rounded-full
                  bg-[#D4A017]
                  text-[#17191D]
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;