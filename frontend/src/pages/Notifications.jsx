import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineFilm,
  HiOutlineTv,
  HiOutlineSignal,
} from "react-icons/hi2";

import useNotifications from "../hooks/useNotifications";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function Notifications() {
  const {
    loading,
    newMovies,
    newSeries,
    liveMatches,
    markSeen,
    markAllSeen,
    allIds,
  } = useNotifications();

  // As soon as this page has finished loading its data, treat every
  // notification on it as "seen" - that's what makes the 9+ badge in
  // the Navbar disappear just by opening this page.
  useEffect(() => {
    if (!loading) {
      markAllSeen(allIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  
  return (
    <div
      className="
        min-h-screen
        bg-[#17191D]
        text-white
        px-5
        sm:px-8
        lg:px-10
        py-10
      "
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <HiOutlineBell size={30} className="text-[#D4A017]" />

          <h1 className="text-3xl font-black">Notifications</h1>
        </div>

        <p className="text-gray-400 mb-10 max-w-2xl">
          The newest movies and series added to NexPlay, plus any sports
          match that's streaming live right now.
        </p>

        {loading ? (
          <p className="text-gray-400">Loading notifications...</p>
        ) : (
          <div className="flex flex-col gap-12">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineSignal size={22} className="text-[#D4A017]" />

                <h2 className="text-xl font-bold">Live Now</h2>
              </div>

              {liveMatches.length === 0 ? (
                <div
                  className="
                    bg-[#1E2126]
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    text-gray-400
                    text-sm
                  "
                >
                  Nothing is streaming live right now. Check back later.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {liveMatches.map((match) => (
                    <a
                      key={match.id}
                      href={match.link || "/sports"}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => markSeen(`match-${match.id}`)}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        bg-[#1E2126]
                        border
                        border-white/10
                        hover:border-[#D4A017]
                        rounded-2xl
                        px-5
                        py-4
                        transition
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{match.icon || "🏆"}</span>

                        <div>
                          <p className="font-semibold text-sm">
                            {match.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {match.league} · {match.statusText}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          flex
                          items-center
                          gap-1
                          text-xs
                          font-bold
                          text-red-400
                          bg-red-500/10
                          px-3
                          py-1
                          rounded-full
                          shrink-0
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        LIVE
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineFilm size={22} className="text-[#D4A017]" />

                <h2 className="text-xl font-bold">New Movie Releases</h2>
              </div>

              {newMovies.length === 0 ? (
                <div
                  className="
                    bg-[#1E2126]
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    text-gray-400
                    text-sm
                  "
                >
                  No new movies to show right now.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {newMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/details/${movie.id}`}
                      onClick={() => markSeen(`movie-${movie.id}`)}
                      className="
                        flex
                        items-center
                        gap-4
                        bg-[#1E2126]
                        border
                        border-white/10
                        hover:border-[#D4A017]
                        rounded-2xl
                        px-4
                        py-3
                        transition
                      "
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `${IMAGE_BASE_URL}${movie.poster_path}`
                            : "https://via.placeholder.com/80x120?text=No+Image"
                        }
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded-lg shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">
                          {movie.title}
                        </p>

                        <p className="text-xs text-gray-400">
                          New release ·{" "}
                          {movie.release_date || "Coming soon"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineTv size={22} className="text-[#D4A017]" />

                <h2 className="text-xl font-bold">New Series Releases</h2>
              </div>

              {newSeries.length === 0 ? (
                <div
                  className="
                    bg-[#1E2126]
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    text-gray-400
                    text-sm
                  "
                >
                  No new series to show right now.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {newSeries.map((show) => (
                    <Link
                      key={show.id}
                      to={`/details/${show.id}`}
                      onClick={() => markSeen(`series-${show.id}`)}
                      className="
                        flex
                        items-center
                        gap-4
                        bg-[#1E2126]
                        border
                        border-white/10
                        hover:border-[#D4A017]
                        rounded-2xl
                        px-4
                        py-3
                        transition
                      "
                    >
                      <img
                        src={
                          show.poster_path
                            ? `${IMAGE_BASE_URL}${show.poster_path}`
                            : "https://via.placeholder.com/80x120?text=No+Image"
                        }
                        alt={show.name}
                        className="w-12 h-16 object-cover rounded-lg shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">
                          {show.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          New release ·{" "}
                          {show.first_air_date || "Coming soon"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;