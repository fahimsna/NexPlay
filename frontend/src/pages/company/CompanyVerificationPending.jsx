import { HiClock } from "react-icons/hi2";

import useAuth from "../../hooks/useAuth";

/*
|--------------------------------------------------------------------------
| COMPANY VERIFICATION PENDING
|--------------------------------------------------------------------------
|
| Sprint 1: shown instead of the dashboard while a company's
| verification status is "pending".
|
|--------------------------------------------------------------------------
*/

function CompanyVerificationPending() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#24272D]">
          <div className="h-1.5 bg-gradient-to-r from-[#D4A017]/60 via-[#D4A017]/30 to-[#D4A017]/60" />

          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/20 flex items-center justify-center">
              <HiClock className="w-8 h-8 text-[#D4A017]" />
            </div>

            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-[#D4A017]/20 bg-[#D4A017]/10 text-[#D4A017] mb-4">
              Pending
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              Verification <span className="text-[#D4A017]">Pending</span>
            </h1>

            <div className="rounded-xl p-5 mb-6 text-left bg-[#D4A017]/5 border border-[#D4A017]/15">
              <p className="text-sm text-[#D4A017]/90 leading-relaxed">
                Your company verification request is currently pending Admin
                approval.
              </p>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Once your account is verified, you will be able to access the
              Company Dashboard and all available features including
              advertisements and campaigns.
            </p>

            <button
              onClick={logout}
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyVerificationPending;
