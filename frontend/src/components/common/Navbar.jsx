import { useState, useRef, useEffect } from "react";
import {
  HiOutlineSearch,
  HiMenu,
  HiX,
  HiOutlineUserCircle,
  HiChevronDown,
  HiOutlineBell,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useNotifications from "../../hooks/useNotifications";

function NavSearchForm({ onSubmitted, compact }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);

    setValue("");

    if (onSubmitted) {
      onSubmitted();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        bg-white/5
        border
        border-white/10
        text-gray-300
        focus-within:border-[#D4A017]
        transition
        ${compact ? "w-full" : "hidden sm:flex w-48 xl:w-56"}
      `}
    >
      <HiOutlineSearch size={18} className="shrink-0" />

      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search movies, sports..."
        className="
          w-full
          bg-transparent
          outline-none
          text-sm
          text-white
          placeholder:text-gray-500
        "
      />
    </form>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const moreRef = useRef(null);
  const profileRef = useRef(null);

  const { isAuthenticated, logout } = useAuth();
  const { unseenCount } = useNotifications();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/browse" },
    { name: "Movies", path: "/movies" },
    { name: "Series", path: "/series" },
    { name: "Sports", path: "/sports" },
  ];

  const moreItems = [
    { name: "Upcoming", path: "/upcoming" },
    { name: "Top Rated", path: "/top-rated" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Partner", path: "/partner" },
  ];

  const handleLogout = () => {
    logout();

    setOpen(false);
    setProfileOpen(false);

    navigate("/");
  };

  const closeMobileMenu = () => {
    setOpen(false);
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
          lg:px-10
          py-4
          flex
          items-center
          justify-between
        "
      >
        <Link
          to="/"
          className="
            text-3xl
            font-black
            tracking-tight
            shrink-0
            hover:opacity-90
            transition
          "
        >
          <span className="text-[#D4A017]">Nex</span>

          <span className="text-white">Play</span>
        </Link>

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-6
            ml-8
            flex-1
          "
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="
                text-sm
                font-medium
                text-gray-300
                hover:text-[#D4A017]
                whitespace-nowrap
                transition
              "
            >
              {item.name}
            </Link>
          ))}

          <div ref={moreRef} className="relative">
            <button
              onClick={() => {
                setMoreOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              className="
                flex
                items-center
                gap-1
                text-sm
                font-medium
                text-gray-300
                hover:text-[#D4A017]
                transition
              "
            >
              More
              <HiChevronDown
                size={17}
                className={`
                  transition-transform
                  ${moreOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {moreOpen && (
              <div
                className="
                  absolute
                  top-10
                  left-0
                  w-48
                  bg-[#24272D]
                  border
                  border-white/10
                  rounded-2xl
                  shadow-2xl
                  p-2
                "
              >
                {moreItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            ml-auto
          "
        >
          <NavSearchForm />

          {isAuthenticated ? (
            <div ref={profileRef} className="relative hidden sm:block">
              <button
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setMoreOpen(false);
                }}
                className="
                  flex
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

                <span>Profile</span>

                <HiChevronDown
                  size={16}
                  className={`
                    transition-transform
                    ${profileOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {profileOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-12
                    w-52
                    bg-[#24272D]
                    border
                    border-white/10
                    rounded-2xl
                    shadow-2xl
                    p-2
                  "
                >
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-reviews"
                    onClick={() => setProfileOpen(false)}
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    My Reviews
                  </Link>

                  <Link
                    to="/watchlist"
                    onClick={() => setProfileOpen(false)}
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    Watchlist
                  </Link>

                  <Link
                    to="/notifications"
                    onClick={() => setProfileOpen(false)}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    <span className="flex items-center gap-2">
                      <HiOutlineBell size={16} />
                      Notifications
                    </span>

                    {unseenCount > 0 && (
                      <span
                        className="
                          flex
                          items-center
                          justify-center
                          min-w-5
                          h-5
                          px-1.5
                          rounded-full
                          bg-[#D4A017]
                          text-[#17191D]
                          text-xs
                          font-bold
                        "
                      >
                        {unseenCount > 9 ? "9+" : unseenCount}
                      </span>
                    )}
                  </Link>

                  <div className="my-2 border-t border-white/10" />

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      text-red-400
                      hover:bg-red-500/10
                      transition
                    "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="
                hidden
                sm:inline-flex
                px-5
                py-2.5
                rounded-full
                bg-[#D4A017]
                text-[#17191D]
                font-semibold
                text-sm
                hover:scale-105
                transition
              "
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
              lg:hidden
              text-white
              hover:text-[#D4A017]
              transition
            "
            aria-label="Toggle menu"
          >
            {open ? <HiX size={29} /> : <HiMenu size={29} />}
          </button>
        </div>
      </div>

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
              gap-2
            "
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                className="
                  px-4
                  py-3
                  rounded-xl
                  text-gray-300
                  hover:bg-[#393E46]
                  hover:text-[#D4A017]
                  transition
                "
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-2 pt-4 border-t border-white/10">
              <p
                className="
                  px-4
                  mb-2
                  text-xs
                  uppercase
                  tracking-widest
                  text-gray-500
                "
              >
                More
              </p>

              {moreItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="
                    block
                    px-4
                    py-3
                    rounded-xl
                    text-gray-300
                    hover:bg-[#393E46]
                    hover:text-[#D4A017]
                    transition
                  "
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-2 pt-4 border-t border-white/10">
              {isAuthenticated ? (
                <>
                  <p
                    className="
                      px-4
                      mb-2
                      text-xs
                      uppercase
                      tracking-widest
                      text-gray-500
                    "
                  >
                    Account
                  </p>

                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-reviews"
                    onClick={closeMobileMenu}
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    My Reviews
                  </Link>

                  <Link
                    to="/watchlist"
                    onClick={closeMobileMenu}
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    Watchlist
                  </Link>

                  <Link
                    to="/notifications"
                    onClick={closeMobileMenu}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                      px-4
                      py-3
                      rounded-xl
                      text-gray-300
                      hover:bg-[#393E46]
                      hover:text-[#D4A017]
                      transition
                    "
                  >
                    <span className="flex items-center gap-2">
                      <HiOutlineBell size={16} />
                      Notifications
                    </span>

                    {unseenCount > 0 && (
                      <span
                        className="
                          flex
                          items-center
                          justify-center
                          min-w-5
                          h-5
                          px-1.5
                          rounded-full
                          bg-[#D4A017]
                          text-[#17191D]
                          text-xs
                          font-bold
                        "
                      >
                        {unseenCount > 9 ? "9+" : unseenCount}
                      </span>
                    )}
                  </Link>

                  <div className="px-4 py-2">
                    <NavSearchForm compact onSubmitted={closeMobileMenu} />
                  </div>

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      text-red-400
                      hover:bg-red-500/10
                      transition
                    "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="px-4 py-2">
                    <NavSearchForm compact onSubmitted={closeMobileMenu} />
                  </div>

                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="
                      block
                      mt-3
                      text-center
                      py-3
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;