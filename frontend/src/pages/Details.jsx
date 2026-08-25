import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  HiArrowLeft,
  HiStar,
  HiCalendarDays,
  HiClock,
  HiGlobeAlt,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";

import {
  getMovieDetails,
  getMovieWatchProviders,
} from "../services/tmdbService";

import ReviewsSection from "../components/reviews/ReviewsSection";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function Details() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [watchProviders, setWatchProviders] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovie();
  }, [id]);

  async function fetchMovie() {
    try {
      setLoading(true);
      setError("");

      const [movieData, providerData] = await Promise.all([
        getMovieDetails(id),

        getMovieWatchProviders(id).catch((providerError) => {
          console.error("Failed to load watch providers:", providerError);

          return {};
        }),
      ]);

      setMovie(movieData);

      setWatchProviders(providerData);
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

  // =======================
  // Watch Providers
  // =======================

  // Bangladesh first.
  // If Bangladesh has no provider information,
  // we don't show providers from another country
  // because that could be misleading.

  const bdProviders = watchProviders?.BD;

  const streamingProviders = bdProviders?.flatrate || [];

  const rentProviders = bdProviders?.rent || [];

  const buyProviders = bdProviders?.buy || [];

  // Remove duplicate providers between
  // streaming / rent / buy sections.

  const uniqueProviders = Array.from(
    new Map(
      [...streamingProviders, ...rentProviders, ...buyProviders].map(
        (provider) => [provider.provider_id, provider],
      ),
    ).values(),
  );

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

            {/* =======================
                Where to Watch
            ======================= */}

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
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">Where to Watch</h2>

                  <p className="text-gray-400 mt-3 leading-7">
                    Streaming availability in Bangladesh. Availability may
                    change over time.
                  </p>
                </div>

                <span
                  className="
                    hidden
                    sm:block
                    px-3
                    py-1
                    rounded-full
                    bg-[#17191D]
                    border
                    border-white/10
                    text-sm
                    text-gray-400
                  "
                >
                  🇧🇩 Bangladesh
                </span>
              </div>

              {uniqueProviders.length > 0 ? (
                <>
                  {/* Streaming */}

                  {streamingProviders.length > 0 && (
                    <div className="mt-7">
                      <h3 className="text-sm font-semibold text-gray-400 mb-4">
                        Stream with Subscription
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        {streamingProviders.map((provider) => (
                          <a
                            key={`stream-${provider.provider_id}`}
                            href={bdProviders.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Watch ${movie.title} on ${provider.provider_name}`}
                            className="
                              group
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              rounded-2xl
                              bg-[#17191D]
                              border
                              border-white/10
                              hover:border-[#D4A017]
                              hover:-translate-y-1
                              transition-all
                              duration-200
                            "
                          >
                            {provider.logo_path && (
                              <img
                                src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="
                                  w-11
                                  h-11
                                  rounded-xl
                                  object-cover
                                "
                              />
                            )}

                            <div>
                              <p className="font-semibold">
                                {provider.provider_name}
                              </p>

                              <p
                                className="
                                  text-xs
                                  text-gray-500
                                  group-hover:text-[#D4A017]
                                  transition
                                "
                              >
                                Watch now
                              </p>
                            </div>

                            <HiArrowTopRightOnSquare
                              className="
                                text-gray-500
                                group-hover:text-[#D4A017]
                                transition
                              "
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rent */}

                  {rentProviders.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold text-gray-400 mb-4">
                        Rent
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        {rentProviders.map((provider) => (
                          <a
                            key={`rent-${provider.provider_id}`}
                            href={bdProviders.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Rent ${movie.title} from ${provider.provider_name}`}
                            className="
                              group
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              rounded-2xl
                              bg-[#17191D]
                              border
                              border-white/10
                              hover:border-[#D4A017]
                              hover:-translate-y-1
                              transition-all
                              duration-200
                            "
                          >
                            {provider.logo_path && (
                              <img
                                src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="
                                  w-11
                                  h-11
                                  rounded-xl
                                  object-cover
                                "
                              />
                            )}

                            <div>
                              <p className="font-semibold">
                                {provider.provider_name}
                              </p>

                              <p
                                className="
                                  text-xs
                                  text-gray-500
                                  group-hover:text-[#D4A017]
                                  transition
                                "
                              >
                                Rent
                              </p>
                            </div>

                            <HiArrowTopRightOnSquare
                              className="
                                text-gray-500
                                group-hover:text-[#D4A017]
                                transition
                              "
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Buy */}

                  {buyProviders.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold text-gray-400 mb-4">
                        Buy
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        {buyProviders.map((provider) => (
                          <a
                            key={`buy-${provider.provider_id}`}
                            href={bdProviders.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Buy ${movie.title} from ${provider.provider_name}`}
                            className="
                              group
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              rounded-2xl
                              bg-[#17191D]
                              border
                              border-white/10
                              hover:border-[#D4A017]
                              hover:-translate-y-1
                              transition-all
                              duration-200
                            "
                          >
                            {provider.logo_path && (
                              <img
                                src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="
                                  w-11
                                  h-11
                                  rounded-xl
                                  object-cover
                                "
                              />
                            )}

                            <div>
                              <p className="font-semibold">
                                {provider.provider_name}
                              </p>

                              <p
                                className="
                                  text-xs
                                  text-gray-500
                                  group-hover:text-[#D4A017]
                                  transition
                                "
                              >
                                Buy
                              </p>
                            </div>

                            <HiArrowTopRightOnSquare
                              className="
                                text-gray-500
                                group-hover:text-[#D4A017]
                                transition
                              "
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View all */}

                  {bdProviders.link && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <a
                        href={bdProviders.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-[#D4A017]
                          hover:text-[#e7bb3c]
                          font-semibold
                          transition
                        "
                      >
                        View all watch options
                        <HiArrowTopRightOnSquare />
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="
                    mt-7
                    p-5
                    rounded-2xl
                    bg-[#17191D]
                    border
                    border-white/10
                  "
                >
                  <p className="text-gray-400">
                    No streaming, rental, or purchase providers are currently
                    listed for this movie in Bangladesh.
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Provider availability is supplied by TMDB and may vary by
                    region and time.
                  </p>
                </div>
              )}
            </div>

            {/* Ratings & Reviews */}

            <ReviewsSection
              contentId={movie.id}
              contentType="movie"
              contentTitle={movie.title}
              contentPoster={movie.poster_path}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
