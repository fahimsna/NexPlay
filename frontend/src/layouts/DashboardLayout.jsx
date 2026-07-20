import { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#22252B] text-white">
      {/* Desktop Layout */}
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <DashboardHeader setIsOpen={setIsOpen} />

          {/* Page */}
          <main
            className="
              pt-24
              lg:pt-24
              px-4
              sm:px-6
              lg:px-10
              xl:px-12
              pb-10
            "
          >
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
