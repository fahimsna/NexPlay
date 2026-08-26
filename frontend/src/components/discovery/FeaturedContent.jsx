import { useEffect, useState } from "react";

import EntertainmentCard from "../entertainment/EntertainmentCard";

import { getFeaturedContent } from "../../services/featuredContentService";
import { getDetailsByType, getTrendingMovies } from "../../services/tmdbService";

function FeaturedContent() {
  const [featured, setFeatured] = useState([]);

  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  async function enrichWithTmdb(entries) {
    const enriched = await Promise.all(
      entries.map(async (entry) => {
        try {
          const details = await getDetailsByType(entry.mediaType, entry.tmdbId);

          return { ...details, mediaType: entry.mediaType };
        } catch {
          return {
            id: entry.tmdbId,
            title: entry.title,
            name: entry.title,
            poster_path: entry.posterPath,
            vote_average: 0,
            vote_count: 0,
            overview: "",
            mediaType: entry.mediaType,
          };
        }
      }),
    );

    return enriched;
  }

  async function loadSections() {
    try {
      setLoading(true);

      const [featuredEntries, trendingEntries] = await Promise.all([
        getFeaturedContent("featured"),
        getFeaturedContent("trending"),
      ]);

      const featuredMovies = await enrichWithTmdb(featuredEntries);

      setFeatured(featuredMovies);

      if (trendingEntries.length > 0) {
        const trendingMovies = await enrichWithTmdb(trendingEntries);

        setTrending(trendingMovies);
      } else {
        const popular = await getTrendingMovies(1);

        setTrending(popular.slice(0, 8).map((item) => ({ ...item, mediaType: "movie" })));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return null;
  }

  if (featured.length === 0 && trending.length === 0) {
    return null;
  }

  return (
    <section
      className="
        bg-[#17191D]
        text-white
        py-16
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {featured.length > 0 && (
          <div className="mb-16">
            <div
              className="
                flex
                items-center
                justify-between
                mb-8
              "
            >
              <div>
                <div
                  className="
                    inline-flex
                    px-4
                    py-2
                    rounded-full
                    bg-white/5
                    border
                    border-white/10
                    text-[#D4A017]
                    text-xs
                    uppercase
                    tracking-[2px]
                  "
                >
                  Handpicked
                </div>

                <h2 className="mt-4 text-3xl sm:text-4xl font-black">
                  Featured Content
                </h2>
              </div>
            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-8
              "
            >
              {featured.map((item) => (
                <EntertainmentCard key={`featured-${item.mediaType}-${item.id}`} movie={item} />
              ))}
            </div>
          </div>
        )}

        {trending.length > 0 && (
          <div>
            <div
              className="
                inline-flex
                px-4
                py-2
                rounded-full
                bg-white/5
                border
                border-white/10
                text-[#D4A017]
                text-xs
                uppercase
                tracking-[2px]
              "
            >
              Right Now
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl font-black">
              Trending This Week
            </h2>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-8
                mt-8
              "
            >
              {trending.map((item) => (
                <EntertainmentCard key={`trending-${item.mediaType}-${item.id}`} movie={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedContent;