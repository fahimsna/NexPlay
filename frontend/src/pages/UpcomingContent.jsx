import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { getUpcomingContent } from "../api/upcomingApi";

const categories = [
  "All",
  "Movie",
  "TV Series",
  "Web Series",
  "Anime",
  "Documentary",
  "Sports",
];

function UpcomingContent() {
  const [contentList, setContentList] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [brokenImageIds, setBrokenImageIds] = useState({});

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await getUpcomingContent();
        setContentList(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Could not load upcoming content:", error);
        setErrorMessage(
          error?.response?.data?.message ||
            "Upcoming content could not be loaded. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  const filteredContent = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return contentList.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.title?.toLowerCase().includes(normalizedSearch) ||
        item.genre?.toLowerCase().includes(normalizedSearch) ||
        item.description?.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        filterCategory === "All" || item.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [contentList, search, filterCategory]);

  const formatReleaseDate = (value) => {
    if (!value) {
      return "Release date not announced";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#14161a] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <section className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A017]">
            Coming to NexPlay
          </p>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Upcoming Content
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Discover upcoming movies, series, anime, documentaries and sports
                events from entertainment companies.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#1B1D22] px-5 py-4">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Available titles
              </p>
              <p className="mt-1 text-3xl font-black text-[#D4A017]">
                {contentList.length}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-white/10 bg-[#1B1D22] p-4 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="search"
              placeholder="Search by title, genre or description..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#111318] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D4A017]"
            />

            <select
              value={filterCategory}
              onChange={(event) => setFilterCategory(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#111318] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4A017] md:w-56"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </section>

        {loading && (
          <div className="rounded-2xl border border-white/10 bg-[#1B1D22] px-6 py-16 text-center">
            <p className="text-gray-400">Loading upcoming content...</p>
          </div>
        )}

        {!loading && errorMessage && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {!loading && !errorMessage && filteredContent.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#1B1D22] px-6 py-16 text-center">
            <p className="text-lg font-semibold">No upcoming content found</p>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or category filter.
            </p>
          </div>
        )}

        {!loading && !errorMessage && filteredContent.length > 0 && (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredContent.map((item) => {
              const trailerUrl = item.trailerUrl || item.trailerURL;

              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#1B1D22] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-[#D4A017]/50"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#24272e]">
                    {item.imageUrl && !brokenImageIds[item._id] ? (
                      <img
                        src={item.imageUrl}
                        alt={`${item.title} poster`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={() =>
                          setBrokenImageIds((previous) => ({
                            ...previous,
                            [item._id]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-gray-500">
                        <span className="text-4xl" aria-hidden="true">
                          🎬
                        </span>
                        <span className="text-sm">Poster unavailable</span>
                      </div>
                    )}

                    <div className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold backdrop-blur">
                      {item.category || "Entertainment"}
                    </div>

                    <div className="absolute right-3 top-3 rounded-full bg-[#D4A017] px-3 py-1 text-xs font-bold text-[#17191D]">
                      {item.status || "Coming Soon"}
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-1 text-xl font-bold">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm font-medium text-[#D4A017]">
                      {item.genre || "Genre not specified"}
                    </p>

                    <p className="mt-3 line-clamp-3 min-h-[60px] text-sm leading-5 text-gray-400">
                      {item.description || "No description available."}
                    </p>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Release date
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {formatReleaseDate(item.releaseDate)}
                      </p>
                    </div>

                    {trailerUrl && (
                      <a
                        href={trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#D4A017] px-4 py-3 text-sm font-bold text-[#17191D] transition hover:bg-[#e8b423]"
                      >
                        Watch Trailer
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default UpcomingContent;
