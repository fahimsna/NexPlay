import { useEffect } from "react";

/*
|--------------------------------------------------------------------------
| FILTER DRAWER
|--------------------------------------------------------------------------
|
| Sprint 2: Search & Advanced Filtering
|
| A slide-in filter panel (chips for genre / language / year, plus sort)
| on top of TMDB's /discover endpoint. Mapped to what TMDB's discover
| API can actually filter/sort by - there's no "status" or "streaming
| platform" filter here (TMDB doesn't expose that cleanly without a
| separate watch-providers integration), unlike a locally-owned content
| catalog would allow.
|
|--------------------------------------------------------------------------
*/

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "bn", label: "Bangla" },
  { code: "hi", label: "Hindi" },
  { code: "ko", label: "Korean" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
];

const currentYear = new Date().getFullYear();
const YEAR_CHIPS = [
  ...Array.from({ length: 6 }, (_, i) => String(currentYear - i)),
  "Before " + (currentYear - 5),
];

const SORT_CHIPS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "primary_release_date.desc", label: "Newest First" },
  { value: "primary_release_date.asc", label: "Oldest First" },
  { value: "original_title.asc", label: "A–Z" },
];

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded-xl transition-all ${
        selected
          ? "bg-[#D4A017] text-[#17191D] font-semibold"
          : "bg-[#17191D] text-gray-400 border border-white/10 hover:border-white/30"
      }`}
    >
      {label}
    </button>
  );
}

function FilterDrawer({
  isOpen,
  onClose,
  onApply,
  onReset,
  genres,
  selectedGenres,
  onChangeGenres,
  language,
  onChangeLanguage,
  year,
  onChangeYear,
  sortBy,
  onChangeSort,
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const toggleGenre = (id) => {
    onChangeGenres(
      selectedGenres.includes(id)
        ? selectedGenres.filter((g) => g !== id)
        : [...selectedGenres, id],
    );
  };

  const activeCount =
    selectedGenres.length + (language ? 1 : 0) + (year ? 1 : 0);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[400px] bg-[#1B1E22] border-l border-white/10 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold">Filters</h2>

            <p className="text-xs text-gray-500">
              {activeCount} filter{activeCount !== 1 ? "s" : ""} active
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* SORT */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Sort By</h3>

            <div className="flex flex-wrap gap-2">
              {SORT_CHIPS.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  selected={sortBy === option.value}
                  onClick={() => onChangeSort(option.value)}
                />
              ))}
            </div>
          </div>

          {/* GENRE */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Genre</h3>

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  selected={selectedGenres.includes(genre.id)}
                  onClick={() => toggleGenre(genre.id)}
                />
              ))}
            </div>
          </div>

          {/* LANGUAGE */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Language</h3>

            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <Chip
                  key={lang.code}
                  label={lang.label}
                  selected={language === lang.code}
                  onClick={() =>
                    onChangeLanguage(language === lang.code ? "" : lang.code)
                  }
                />
              ))}
            </div>
          </div>

          {/* RELEASE YEAR */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Release Year</h3>

            <div className="flex flex-wrap gap-2">
              {YEAR_CHIPS.map((y) => (
                <Chip
                  key={y}
                  label={y}
                  selected={year === y}
                  onClick={() => onChangeYear(year === y ? "" : y)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 border-t border-white/10 flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 font-semibold text-sm hover:bg-red-500/25 transition"
          >
            Reset All
          </button>

          <button
            onClick={onApply}
            className="flex-1 py-3 rounded-xl bg-[#D4A017] text-[#17191D] font-semibold text-sm hover:scale-105 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterDrawer;
