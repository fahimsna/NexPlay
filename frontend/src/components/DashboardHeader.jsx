import { HiBars3, HiBell, HiMagnifyingGlass } from "react-icons/hi2";

function DashboardHeader({ setIsOpen }) {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        lg:left-72
        h-16
        bg-[#22252B]/95
        backdrop-blur-xl
        border-b
        border-white/10
        z-30
      "
    >
      <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white"
          >
            <HiBars3 size={28} />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Company Dashboard</h1>

            <p className="hidden sm:block text-sm text-gray-400">
              Welcome back 👋
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              bg-[#2A2D34]
              border
              border-white/10
              rounded-full
              px-4
              py-2
            "
          >
            <HiMagnifyingGlass />

            <input
              type="text"
              placeholder="Search..."
              className="
                bg-transparent
                outline-none
                text-sm
                placeholder:text-gray-500
              "
            />
          </div>

          {/* Notification */}
          <button
            className="
              w-11
              h-11
              rounded-full
              bg-[#2A2D34]
              border
              border-white/10
              flex
              items-center
              justify-center
              hover:border-[#D4A017]
              transition
            "
          >
            <HiBell size={20} />
          </button>

          {/* Avatar */}
          <div
            className="
              w-11
              h-11
              rounded-full
              bg-[#D4A017]
              text-[#17191D]
              font-bold
              flex
              items-center
              justify-center
            "
          >
            N
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
