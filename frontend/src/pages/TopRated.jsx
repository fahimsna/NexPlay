import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StarRating from "../components/reviews/StarRating";
import { getTopRatedContent } from "../services/reviewService";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

/*
|--------------------------------------------------------------------------
| TOP RATED
|--------------------------------------------------------------------------
|
| Sprint 4: Top Rated Content
|
| Ranks content by the average rating from NexPlay's own reviews
| (not TMDB's rating) - highest rated first, minimum one review.
|
|--------------------------------------------------------------------------
*/

function TopRated() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTopRatedContent(24);

      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Top rated error:", err);
      setError("Could not load top rated content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <section className="px-5 sm:px-8 lg:px-12 py-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">
            Community Rated
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-black">Top Rated</h1>

          <p className="mt-4 text-gray-400 max-w-2xl">
            The highest-rated movies and shows, based on ratings and reviews
            from NexPlay users.
          </p>

          {error && (
            <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center mt-20 text-xl text-gray-400">
              Loading...
            </div>
          ) : items.length === 0 ? (
            <div className="mt-14 bg-[#24272D] border border-white/10 rounded-2xl p-14 text-center">
              <div className="text-5xl">⭐</div>

              <h3 className="mt-4 text-xl font-bold">No rated content yet</h3>

              <p className="mt-2 text-gray-500">
                Once users start reviewing movies and shows, the top rated
                titles will appear here.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-6
                gap-6
                mt-12
              "
            >
              {items.map((item, index) => (
                <Link
                  key={`${item.contentType}-${item.contentId}`}
                  to={`/details/${item.contentId}`}
                  className="group relative"
                >
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-[#24272D] border border-white/10 group-hover:border-[#D4A017]/50 transition">
                    {item.contentPoster ? (
                      <img
                        src={`${IMAGE_BASE_URL}${item.contentPoster}`}
                        alt={item.contentTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🎬
                      </div>
                    )}

                    <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#D4A017] text-[#17191D] font-black flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                  </div>

                  <p className="mt-3 font-semibold truncate group-hover:text-[#D4A017] transition">
                    {item.contentTitle || "Untitled"}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <StarRating
                      rating={Math.round(item.averageRating / 2)}
                      readOnly
                      size={14}
                    />

                    <span className="text-xs text-gray-500">
                      {item.averageRating}/10 ({item.totalReviews})
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default TopRated;
