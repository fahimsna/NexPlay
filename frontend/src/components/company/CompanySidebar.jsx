import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiLogOut, FiX } from "react-icons/fi";

function CompanySidebar({ open, setOpen }) {
  const links = [
    {
      name: "Dashboard",
      path: "/company",
      icon: <FiHome />,
    },

    {
      name: "Company Profile",
      path: "/company/profile",
      icon: <FiUser />,
    },
  ];

  return (
    <>
      {/* Overlay Mobile */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            md:hidden
            "
        />
      )}

      <aside
        className={`
        
        fixed
        md:static
        z-50
        
        top-0
        left-0
        
        h-screen
        w-64
        
        bg-white
        border-r
        
        p-5
        
        transform
        
        transition-transform
        
        duration-300
        
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}

        `}
      >
        {/* Mobile Close */}

        <button
          onClick={() => setOpen(false)}
          className="
          md:hidden
          absolute
          right-4
          top-4
          "
        >
          <FiX size={22} />
        </button>

        <h1
          className="
          text-2xl
          font-bold
          text-purple-600
          mb-10
          "
        >
          NexPlay
        </h1>

        <nav className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  transition

                  ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }

                  `
              }
            >
              {link.icon}

              {link.name}
            </NavLink>
          ))}
        </nav>

        <button
          className="
          flex
          items-center
          gap-3
          mt-10
          text-red-500
          "
        >
          <FiLogOut />
          Logout
        </button>
      </aside>
    </>
  );
}

export default CompanySidebar;
