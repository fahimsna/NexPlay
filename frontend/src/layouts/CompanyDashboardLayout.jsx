import { Outlet } from "react-router-dom";
import { useState } from "react";

import CompanySidebar from "../components/company/CompanySidebar";

import { FiMenu } from "react-icons/fi";

function CompanyDashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      {/* Mobile Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className="
        md:hidden
        fixed
        top-4
        left-4
        z-50

        bg-[#D4A017]
        text-black

        p-3
        rounded-xl

        shadow-lg
        "
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}

      <CompanySidebar open={open} setOpen={setOpen} />

      {/* Main Content */}

      <main
        className="
        md:ml-64

        min-h-screen

        bg-[#17191D]

        p-4
        sm:p-6
        lg:p-10

        pt-20
        md:pt-10
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default CompanyDashboardLayout;
