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
      "
    >
      {/* Sidebar */}

      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Area */}

      <div
        className="
          min-h-screen
          lg:ml-72
        "
      >
        {/* Header */}

        <DashboardHeader setIsOpen={setIsOpen} />

        {/* Page Content */}

        <main
          className="
            pt-24
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
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
