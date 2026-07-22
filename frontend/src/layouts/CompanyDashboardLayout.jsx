import { Outlet } from "react-router-dom";
import { useState } from "react";
import CompanySidebar from "../components/company/CompanySidebar";
import { FiMenu } from "react-icons/fi";

function CompanyDashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className="
        md:hidden
        fixed
        top-4
        left-4
        z-50
        bg-purple-600
        text-white
        p-3
        rounded-lg
        "
      >
        <FiMenu size={22} />
      </button>

      {/* Sidebar */}

      <CompanySidebar open={open} setOpen={setOpen} />

      {/* Main Content */}

      <main
        className="
        flex-1
        p-4
        md:p-8
        mt-14
        md:mt-0
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default CompanyDashboardLayout;
