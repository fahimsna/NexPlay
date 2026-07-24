import { Outlet } from "react-router-dom";
import { useState } from "react";

import CompanySidebar from "../components/company/CompanySidebar";

import { FiMenu } from "react-icons/fi";

function CompanyDashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
min-h-screen
bg-[#111318]
"
    >
      {/* Mobile button */}

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

"
      >
        <FiMenu size={22} />
      </button>

      {/* Sidebar */}

      <CompanySidebar open={open} setOpen={setOpen} />

      {/* Main */}

      <main
        className="
md:ml-64

min-h-screen

p-4
sm:p-6
lg:p-10

"
      >
        <Outlet />
      </main>
    </div>
  );
}

export default CompanyDashboardLayout;
