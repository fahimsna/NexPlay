import EntertainmentCard from "../components/entertainment/EntertainmentCard";

function Watchlist() {
  const watchlist = [];

  return (
    <div className="min-h-screen bg-[#0f1014] text-white px-5 sm:px-8 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        {/* =========================
            HEADER
        ========================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] font-semibold text-[#d4a017] mb-3">
              Your Collection
            </p>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              My Watchlist
            </h1>

            <p className="text-gray-400 mt-3 max-w-xl">
              Keep track of movies and series you want to watch later.
            </p>
          </div>

          {/* COUNT */}

          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#d4a017]/10 flex items-center justify-center">
              <span className="text-xl">🔖</span>
            </div>

            <div>
              <p className="text-lg font-bold">{watchlist.length}</p>

              <p className="text-xs text-gray-500">
                {watchlist.length === 1 ? "Saved title" : "Saved titles"}
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            EMPTY STATE
        ========================= */}

        {watchlist.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#17181d]">
            {/* Background decoration */}

            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#d4a017]/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl" />

            <div className="relative flex flex-col items-center justify-center text-center px-6 py-24">
              {/* ICON */}

              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-[#d4a017]/20 blur-2xl" />

                <div className="relative w-24 h-24 rounded-3xl bg-[#d4a017]/10 border border-[#d4a017]/20 flex items-center justify-center">
                  <span className="text-5xl">🔖</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                Your watchlist is empty
              </h2>

              <p className="text-gray-400 mt-3 max-w-md leading-relaxed">
                Save movies and series you're interested in and come back to
                them whenever you're ready to watch.
              </p>

              {/* BUTTON */}

              <a
                href="/browse"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-xl
                  bg-[#d4a017]
                  text-[#111]
                  font-bold
                  transition-all
                  duration-200
                  hover:bg-[#e2b329]
                  hover:-translate-y-0.5
                "
              >
                Explore NexPlay
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        ) : (
          /* =========================
             WATCHLIST GRID
          ========================= */

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Saved for later</h2>

                <p className="text-sm text-gray-500 mt-1">
                  {watchlist.length}{" "}
                  {watchlist.length === 1 ? "title" : "titles"}
                </p>
              </div>

              <a
                href="/browse"
                className="text-sm font-semibold text-[#d4a017] hover:text-[#e2b329] transition"
              >
                Browse more →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {watchlist.map((item, index) => (
                <div key={`${item.id}-${index}`} className="group">
                  <EntertainmentCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
