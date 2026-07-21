import { useState } from "react";
import { HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/browse" },
    { name: "Movies", path: "/movies" },
    { name: "Series", path: "/series" },
    { name: "Sports", path: "/sports" },
    { name: "Upcoming", path: "/upcoming" },
  ];

  return (
    <nav
      className="
      fixed
      top-0
      w-full
      z-50
      bg-[#1E2126]/80
      backdrop-blur-lg
      border-b
      border-white/10
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
          text-3xl
          font-extrabold
          tracking-tight
          "
        >
          <span className="text-[#D4A017]">Nex</span>

          <span className="text-white">Play</span>
        </Link>

        {/* Desktop Menu */}
        <div
          className="
          hidden
          lg:flex
          items-center
          gap-10
          text-sm
          font-medium
          text-gray-300
          "
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                hover:text-white
                transition
                ${index === 0 ? "text-[#D4A017]" : ""}
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div
          className="
          hidden
          md:flex
          items-center
          gap-4
          "
        >
          <Link
            to="/browse"
            className="
            flex
            items-center
            gap-2
            bg-white/5
            border
            border-white/10
            rounded-full
            px-4
            py-2
            text-gray-400
            hover:border-[#D4A017]
            transition
            "
          >
            <HiOutlineSearch size={18} />

            <span className="text-sm">Search</span>
          </Link>

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
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
          lg:hidden
          text-white
          "
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

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

            <Link
              to="/browse"
              className="
                flex
                items-center
                gap-2
                bg-white/5
                border
                border-white/10
                rounded-full
                px-4
                py-2
                "
            >
              <HiOutlineSearch />
              Search
            </Link>

            <Link
              to="/login"
              className="
                bg-[#D4A017]
                text-[#17191D]
                py-2.5
                rounded-full
                text-center
                font-semibold
                "
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
