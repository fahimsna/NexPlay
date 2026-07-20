import { Link, useLocation } from "react-router-dom";
import {
  HiBars3,
  HiXMark,
  HiHome,
  HiBuildingOffice2,
  HiMegaphone,
  HiFilm,
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
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1B1D22] border-b border-white/10 flex items-center justify-between px-5 z-50">
        <Link to="/" className="text-2xl font-black">
          <span className="text-[#D4A017]">Nex</span>
          <span className="text-white">Play</span>
        </Link>

        <button onClick={() => setIsOpen(true)} className="text-white">
          <HiBars3 size={30} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
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
        flex
        flex-col
        z-50
        transform
        transition-transform
        duration-300

        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
        lg:static
        lg:flex
        `}
      >
        {/* Header */}

        <div className="px-8 py-7 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="text-3xl font-black">
            <span className="text-[#D4A017]">Nex</span>

            <span className="text-white">Play</span>
          </Link>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            <HiXMark size={30} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-5 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300

                ${
                  location.pathname === item.path
                    ? "bg-[#D4A017] text-[#17191D] font-semibold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={22} />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}

        <div className="p-5 border-t border-white/10">
          <button
            className="
            w-full
            flex
            items-center
            gap-4
            px-5
            py-4
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
