import { useEffect, useState } from "react";

import { getMyCompany } from "../../services/companyService";
import CompanyVerificationPending from "../../pages/company/CompanyVerificationPending";
import CompanyVerificationRejected from "../../pages/company/CompanyVerificationRejected";

/*
|--------------------------------------------------------------------------
| COMPANY VERIFICATION GATE
|--------------------------------------------------------------------------
|
| Sprint 1: wraps the company dashboard. Blocks access until the
| company's verification status is "approved" - shows the
| Pending / Rejected screens otherwise.
|
|--------------------------------------------------------------------------
*/

function CompanyVerificationGate({ children }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyCompany();
      setCompany(data);
    } catch (err) {
      console.error("Company verification check error:", err);
      setError("Could not load your company profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17191D] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center px-5">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (company?.status === "pending") {
    return <CompanyVerificationPending />;
  }

  if (company?.status === "rejected") {
    return <CompanyVerificationRejected rejectionReason={company.rejectionReason} />;
  }

  return children;
}

export default CompanyVerificationGate;
