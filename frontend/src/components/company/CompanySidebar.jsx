import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiLogOut,
  FiX,
} from "react-icons/fi";

function CompanySidebar({ open, setOpen }) {
  const links = [
    {
      name: "Dashboard",
      path: "/company",
      icon: <FiHome />,
      end: true,
    },
    {
      name: "Company Profile",
      path: "/company/profile",
      icon: <FiUser />,
    },
    {
      name: "Upcoming Content",
      path: "/company/upcoming-content",
      icon: <FiCalendar />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-64
          border-r bg-white p-5
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
          className="absolute right-4 top-4 md:hidden"
          aria-label="Close sidebar"
        >
          <FiX size={22} />
        </button>

        <h1 className="mb-10 text-2xl font-bold text-purple-600">
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
                  transition
                  ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
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
            mt-10 flex items-center gap-3
            rounded-lg px-4 py-3
            text-red-500 transition
            hover:bg-red-50
          "
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default CompanySidebar;