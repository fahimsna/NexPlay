import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  HiArrowLeft,
  HiStar,
  HiCalendarDays,
  HiClock,
  HiGlobeAlt,
} from "react-icons/hi2";

import { getMovieDetails } from "../services/tmdbService";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function Details() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovie();
  }, [id]);

  async function fetchMovie() {
    try {
      setLoading(true);

      const data = await getMovieDetails(id);

      setMovie(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load movie.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#17191D]
          flex
          items-center
          justify-center
          text-white
        "
      >
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div
        className="
          min-h-screen
          bg-[#17191D]
          flex
          items-center
          justify-center
          text-red-400
        "
      >
        <h1 className="text-2xl font-bold">{error || "Movie Not Found"}</h1>
      </div>
    );
  }
  return (
    <section
      className="
        min-h-screen
        bg-[#17191D]
        text-white
      "
    >
      {/* Hero Banner */}

      <div
        className="
          relative
          h-[500px]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        }}
      >
        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/70"></div>

        {/* Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#17191D]
            via-[#17191D]/60
            to-transparent
          "
        ></div>

        {/* Back Button */}

        <div className="relative max-w-7xl mx-auto px-5 pt-10">
          <Link
            to="/browse"
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-full
              bg-white/10
              backdrop-blur-md
              border
              border-white/10
              hover:border-[#D4A017]
              transition
            "
          >
            <HiArrowLeft />
            Back
          </Link>
        </div>
      </div>

      {/* Main */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          -mt-48
          relative
          z-20
        "
      >
        <div
          className="
            grid
            lg:grid-cols-3
            gap-10
          "
        >
          {/* Poster */}

          <div>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="
                w-full
                rounded-3xl
                border
                border-white/10
                shadow-2xl
              "
            />
          </div>

          {/* Information */}

          <div className="lg:col-span-2">
            <span
              className="
                inline-block
                px-4
                py-2
                rounded-full
                bg-[#D4A017]
                text-[#17191D]
                font-semibold
              "
            >
              Movie
            </span>

            <h1
              className="
                mt-6
                text-5xl
                font-black
              "
            >
              {movie.title}
            </h1>

            <div
              className="
                mt-8
                grid
                sm:grid-cols-2
                gap-5
              "
            >
              {/* Rating */}

              <div
                className="
                  bg-[#24272D]
                  rounded-2xl
                  border
                  border-white/10
                  p-5
                  flex
                  items-center
                  gap-4
                "
              >
                <HiStar className="text-[#D4A017] text-2xl" />

                <div>
                  <p className="text-gray-400 text-sm">Rating</p>

                  <h3 className="text-xl font-bold">
                    {movie.vote_average.toFixed(1)}/10
                  </h3>
                </div>
              </div>

              {/* Runtime */}

              <div
                className="
                  bg-[#24272D]
                  rounded-2xl
                  border
                  border-white/10
                  p-5
                  flex
                  items-center
                  gap-4
                "
              >
                <HiClock className="text-[#D4A017] text-2xl" />

                <div>
                  <p className="text-gray-400 text-sm">Runtime</p>

                  <h3 className="text-xl font-bold">{movie.runtime} min</h3>
                </div>
              </div>

              {/* Release */}

              <div
                className="
                  bg-[#24272D]
                  rounded-2xl
                  border
                  border-white/10
                  p-5
                  flex
                  items-center
                  gap-4
                "
              >
                <HiCalendarDays className="text-[#D4A017] text-2xl" />

                <div>
                  <p className="text-gray-400 text-sm">Release</p>

                  <h3 className="text-xl font-bold">{movie.release_date}</h3>
                </div>
              </div>

              {/* Language */}

              <div
                className="
                  bg-[#24272D]
                  rounded-2xl
                  border
                  border-white/10
                  p-5
                  flex
                  items-center
                  gap-4
                "
              >
                <HiGlobeAlt className="text-[#D4A017] text-2xl" />

                <div>
                  <p className="text-gray-400 text-sm">Language</p>

                  <h3 className="text-xl font-bold">
                    {movie.original_language.toUpperCase()}
                  </h3>
                </div>
              </div>
            </div>
            {/* Genres */}

            <div className="mt-10">
              <h2 className="text-2xl font-bold">Genres</h2>

              <div className="flex flex-wrap gap-3 mt-5">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-[#24272D]
                      border
                      border-white/10
                      text-[#D4A017]
                    "
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Overview</h2>

              <p
                className="
                  mt-5
                  text-gray-300
                  leading-8
                "
              >
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Production Companies */}

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Production Companies</h2>

              <div className="flex flex-wrap gap-3 mt-5">
                {movie.production_companies?.length > 0 ? (
                  movie.production_companies.map((company) => (
                    <span
                      key={company.id}
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-[#24272D]
                        border
                        border-white/10
                      "
                    >
                      {company.name}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">Information unavailable.</p>
                )}
              </div>
            </div>

            {/* Where to Watch */}

            <div
              className="
                mt-12
                bg-[#24272D]
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >
              <h2 className="text-3xl font-bold">Where to Watch</h2>

              <p className="text-gray-400 mt-3 leading-7">
                NexPlay helps you discover entertainment. Streaming availability
                varies by country. Check official streaming services such as
                Netflix, Prime Video, Disney+, Apple TV+, Max, or Hulu to see
                where this title is available.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "Netflix",
                  "Prime Video",
                  "Disney+",
                  "Apple TV+",
                  "Max",
                  "Hulu",
                ].map((platform) => (
                  <span
                    key={platform}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-[#17191D]
                      border
                      border-white/10
                      hover:border-[#D4A017]
                      transition
                    "
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
