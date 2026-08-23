import { HiXCircle } from "react-icons/hi2";

import useAuth from "../../hooks/useAuth";

/*
|--------------------------------------------------------------------------
| COMPANY VERIFICATION REJECTED
|--------------------------------------------------------------------------
|
| Sprint 1: shown instead of the dashboard while a company's
| verification status is "rejected".
|
|--------------------------------------------------------------------------
*/

function CompanyVerificationRejected({ rejectionReason }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#17191D] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#24272D]">
          <div className="h-1.5 bg-gradient-to-r from-red-500/60 via-red-500/30 to-red-500/60" />

          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <HiXCircle className="w-8 h-8 text-red-400" />
            </div>

            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 mb-4">
              Rejected
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              Verification <span className="text-red-400">Rejected</span>
            </h1>

            <div className="rounded-xl p-5 mb-4 text-left bg-red-500/5 border border-red-500/15">
              <p className="text-sm text-red-300 leading-relaxed">
                Your company verification request has been rejected by the
                Admin. Please update your information and submit another
                verification request.
              </p>
            </div>

            {rejectionReason && (
              <div className="rounded-xl p-4 mb-6 text-left bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-1">Reason for rejection:</p>
                <p className="text-sm text-gray-300">{rejectionReason}</p>
              </div>
            )}

            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              After updating your company information, please contact support
              to request re-verification.
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

export default CompanyVerificationRejected;
