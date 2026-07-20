import { useState } from "react";
import DashboardSidebar from "../components/dahboard/DashboardSidebar";
import DashboardHeader from "../components/dahboard/DashboardHeader";

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-[#17191D]
        text-white
        flex
      "
    >
      {/* Sidebar */}

      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Side */}

      <div
        className="
          flex-1
          min-h-screen
          bg-[#17191D]
        "
      >
        {/* Header */}

        <DashboardHeader setIsOpen={setIsOpen} />

        {/* Content */}

        <main
          className="
            min-h-screen
            pt-24
            px-4
            sm:px-6
            lg:px-10
            xl:px-12
            pb-10
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
            "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
