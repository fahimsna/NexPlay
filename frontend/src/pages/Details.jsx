import { useEffect, useRef, useState } from "react";
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

import { recordActivity } from "../services/activityService";
import useAuth from "../hooks/useAuth";

import ReviewsSection from "../components/reviews/ReviewsSection";
import WhereToWatch from "../components/streaming/WhereToWatch";
import DiscussionForum from "../components/discussion/DiscussionForum";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function Details() {
  const { id } = useParams();

  const { isAuthenticated } = useAuth();

  // Prevent duplicate activity recording
  // caused by React StrictMode / repeated effects.
  const activityRecorded = useRef(false);

  const [movie, setMovie] = useState(null);

  const [watchProviders, setWatchProviders] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    // Reset when opening a different movie.
    activityRecorded.current = false;

    fetchMovie();
  }, [id, isAuthenticated]);

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

      // =======================
      // Record User Activity
      // =======================

      if (isAuthenticated && movieData && !activityRecorded.current) {
        // Set immediately so StrictMode / repeated renders
        // cannot send the request twice.
        activityRecorded.current = true;

        try {
          await recordActivity({
            userId: "6a8d06dbec780e2f4e2ddbe5",
            activityType: "watch",
            contentId: movieData.id,
            contentType: "movie",
            title: movieData.title,

            metadata: {
              releaseDate: movieData.release_date,
              rating: movieData.vote_average,
              genres: movieData.genres?.map((genre) => genre.name) || [],
            },
          });
        } catch (activityError) {
          console.error("Failed to record viewing activity:", activityError);

          // Allow retry if the API request actually failed.
          activityRecorded.current = false;
        }
      }
    } catch (err) {
      console.error(err);

      setError("Failed to load movie.");
    } finally {
      setLoading(false);
    }
  }

  // =======================
  // Loading
  // =======================

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

  // =======================
  // Error
  // =======================

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

  const allRegions = Object.entries(watchProviders || {});

  const streamingProviders = [];

  const rentProviders = [];

  const buyProviders = [];

  // =======================
  // Streaming Providers
  // =======================

  allRegions.forEach(([regionCode, regionData]) => {
    if (!regionData?.flatrate) return;

    regionData.flatrate.forEach((provider) => {
      streamingProviders.push({
        ...provider,
        regionCode,
        regionLink: regionData.link,
      });
    });
  });

  // =======================
  // Rental Providers
  // =======================

  allRegions.forEach(([regionCode, regionData]) => {
    if (!regionData?.rent) return;

    regionData.rent.forEach((provider) => {
      rentProviders.push({
        ...provider,
        regionCode,
        regionLink: regionData.link,
      });
    });
  });

  // =======================
  // Purchase Providers
  // =======================

  allRegions.forEach(([regionCode, regionData]) => {
    if (!regionData?.buy) return;

    regionData.buy.forEach((provider) => {
      buyProviders.push({
        ...provider,
        regionCode,
        regionLink: regionData.link,
      });
    });
  });

  // =======================
  // Remove Duplicates
  // =======================

  const uniqueStreamingProviders = Array.from(
    new Map(
      streamingProviders.map((provider) => [provider.provider_id, provider]),
    ).values(),
  );

  const uniqueRentProviders = Array.from(
    new Map(
      rentProviders.map((provider) => [provider.provider_id, provider]),
    ).values(),
  );

  const uniqueBuyProviders = Array.from(
    new Map(
      buyProviders.map((provider) => [provider.provider_id, provider]),
    ).values(),
  );

  const hasProviders =
    uniqueStreamingProviders.length > 0 ||
    uniqueRentProviders.length > 0 ||
    uniqueBuyProviders.length > 0;

  // =======================
  // Country Name
  // =======================

  function getRegionName(regionCode) {
    try {
      return new Intl.DisplayNames(["en"], {
        type: "region",
      }).of(regionCode);
    } catch {
      return regionCode;
    }
  }

  return (
    <section
      className="
        min-h-screen
        bg-[#17191D]
        text-white
      "
    >
      {/* =======================
          Hero Banner
      ======================= */}

      <div
        className="
          relative
          h-125
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
            bg-linear-to-t
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

      {/* =======================
          Main
      ======================= */}

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
          {/* =======================
              Poster
          ======================= */}

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

          {/* =======================
              Information
          ======================= */}

          <div className="lg:col-span-2">
            {/* Type */}

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

            {/* Title */}

            <h1
              className="
                mt-6
                text-5xl
                font-black
              "
            >
              {movie.title}
            </h1>

            {/* =======================
                Basic Information
            ======================= */}

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

            {/* =======================
                Genres
            ======================= */}

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

            {/* =======================
                Overview
            ======================= */}

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

            {/* =======================
                Production Companies
            ======================= */}

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
                Where to Watch (TMDB / JustWatch providers)
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
                    Streaming, rental, and purchase options available for this
                    movie.
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
                  🌎 Worldwide
                </span>
              </div>

              {hasProviders ? (
                <>
                  {/* =======================
                      Streaming
                  ======================= */}

                  {uniqueStreamingProviders.length > 0 && (
                    <div className="mt-7">
                      <h3 className="text-sm font-semibold text-gray-400 mb-4">
                        Stream with Subscription
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        {uniqueStreamingProviders.map((provider) => (
                         <a 
                            key={`stream-${provider.provider_id}`}
                            href={provider.regionLink || "#"}
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

                              <p className="text-[10px] text-gray-600 mt-1">
                                {getRegionName(provider.regionCode)}
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

                  {/* =======================
                      Rent
                  ======================= */}

                  {uniqueRentProviders.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold text-gray-400 mb-4">
                        Rent
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        {uniqueRentProviders.map((provider) => (
                          <a
                            key={`rent-${provider.provider_id}`}
                            href={provider.regionLink || "#"}
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

                              <p className="text-[10px] text-gray-600 mt-1">
                                {getRegionName(provider.regionCode)}
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

                  {/* =======================
                      Buy
                  ======================= */}

                  {uniqueBuyProviders.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold text-gray-400 mb-4">
                        Buy
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        {uniqueBuyProviders.map((provider) => (
                          <a
                            key={`buy-${provider.provider_id}`}
                            href={provider.regionLink || "#"}
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

                              <p className="text-[10px] text-gray-600 mt-1">
                                {getRegionName(provider.regionCode)}
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

                  {/* =======================
                      Attribution
                  ======================= */}

                  <div className="mt-8 pt-5 border-t border-white/10">
                    <p className="text-xs text-gray-500">
                      Streaming availability powered by JustWatch via TMDB.
                      Availability may vary by region and time.
                    </p>
                  </div>
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
                    listed for this movie.
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Provider availability is supplied by TMDB and may vary by
                    region and time.
                  </p>
                </div>
              )}
            </div>

            {/* =======================
                Official Broadcaster / Watch Official Redirect
            ======================= */}

            <WhereToWatch tmdbId={movie.id} mediaType="movie" title={movie.title} />

            {/* Discussion Forum */}

            <DiscussionForum tmdbId={movie.id} mediaType="movie" />

            {/* =======================
                Ratings & Reviews
            ======================= */}

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