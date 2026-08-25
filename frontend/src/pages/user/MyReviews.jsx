import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import StarRating from "../../components/reviews/StarRating";
import { getMyReviews, deleteReview } from "../../services/reviewService";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

/*
|--------------------------------------------------------------------------
| MY REVIEWS
|--------------------------------------------------------------------------
|
| Sprint 4: a logged-in user's own reviews, paginated, with delete.
|
|--------------------------------------------------------------------------
*/

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (targetPage = page) => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyReviews(targetPage, 10);

      setReviews(data.reviews || []);
      setTotalPages(data.meta?.totalPages || 1);
      setTotal(data.meta?.total || 0);
      setPage(data.meta?.page || targetPage);
    } catch (err) {
      console.error("My reviews error:", err);
      setError("Could not load your reviews.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load(1);
  }, [load]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) {
      return;
    }

    try {
      await deleteReview(reviewId);
      load(page);
    } catch (err) {
      console.error("Delete review error:", err);
      setError("Could not delete review.");
    }
  };

  return (
    <div className="min-h-screen bg-[#17191D] text-white">
      <section className="px-5 sm:px-8 lg:px-12 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#D4A017] uppercase tracking-[2px] text-sm">
            Reviews
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-black">My Reviews</h1>

          <p className="mt-4 text-gray-400">
            {total > 0
              ? `You've written ${total} review${total !== 1 ? "s" : ""}`
              : "Reviews you have written for movies and shows"}
          </p>

          {error && (
            <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center mt-16 text-gray-400">Loading...</div>
          ) : reviews.length === 0 ? (
            <div className="mt-14 bg-[#24272D] border border-white/10 rounded-2xl p-14 text-center">
              <div className="text-5xl">📝</div>

              <h3 className="mt-4 text-xl font-bold">No reviews yet</h3>

              <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                You haven't reviewed any content yet. Browse movies and shows
                and share your thoughts.
              </p>
            </div>
          ) : (
            <div className="mt-10 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#24272D] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4A017]/30 transition"
                >
                  <div className="flex flex-col sm:flex-row">
                    <Link
                      to={`/details/${review.contentId}`}
                      className="relative w-full sm:w-24 sm:min-h-[120px] aspect-[3/2] sm:aspect-auto shrink-0 bg-[#1B1E22]"
                    >
                      {review.contentPoster ? (
                        <img
                          src={`${IMAGE_BASE_URL}${review.contentPoster}`}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-3xl">
                          🎬
                        </div>
                      )}
                    </Link>

                    <div className="flex-1 p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#D4A017]/20 bg-[#D4A017]/10 text-[#D4A017]">
                          Review
                        </span>

                        <div className="flex items-center gap-2">
                          <StarRating
                            rating={Math.round(review.rating / 2)}
                            readOnly
                            size={14}
                          />

                          <span className="text-xs text-gray-500">
                            {review.rating}/10
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/details/${review.contentId}`}
                        className="font-bold hover:text-[#D4A017] transition"
                      >
                        {review.contentTitle || "Unknown Content"}
                      </Link>

                      <p className="text-xs text-gray-500">
                        {review.contentType === "tv" ? "TV Show" : "Movie"} ·{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>

                      {review.comment && (
                        <p className="text-sm text-gray-400 leading-6 line-clamp-3">
                          {review.comment}
                        </p>
                      )}

                      <div className="pt-1">
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="text-xs font-medium text-red-400/70 hover:text-red-400 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => load(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg bg-[#24272D] border border-white/10 text-sm disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <button
                      onClick={() => load(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg bg-[#24272D] border border-white/10 text-sm disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyReviews;
