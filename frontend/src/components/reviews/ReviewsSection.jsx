import { useEffect, useState } from "react";

import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import useAuth from "../../hooks/useAuth";

import {
  getReviewsForContent,
  createReview,
  updateReview,
  deleteReview,
} from "../../services/reviewService";

/*
|--------------------------------------------------------------------------
| REVIEWS SECTION
|--------------------------------------------------------------------------
|
| Sprint 4: Ratings & Reviews
|
| Drop this into any content details page:
|
|   <ReviewsSection
|     contentId={id}
|     contentType="movie"
|     contentTitle={movie.title}
|     contentPoster={movie.poster_path}
|   />
|
|--------------------------------------------------------------------------
*/

function ReviewsSection({ contentId, contentType, contentTitle, contentPoster }) {
  const { user, isAuthenticated } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [contentId, contentType]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReviewsForContent(contentType, contentId);

      setReviews(data.reviews || []);
      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch (err) {
      console.error("Load reviews error:", err);
      setError("Could not load reviews.");
    } finally {
      setLoading(false);
    }
  };

  const myReview = reviews.find((review) => review.userId?._id === user?.id);

  const handleSubmit = async ({ rating, comment }) => {
    try {
      setSubmitting(true);

      if (editingReview) {
        await updateReview(editingReview._id, { rating, comment });
      } else {
        await createReview({
          contentId: String(contentId),
          contentType,
          contentTitle,
          contentPoster,
          rating,
          comment,
        });
      }

      setShowForm(false);
      setEditingReview(null);
      await loadReviews();
    } catch (err) {
      console.error("Submit review error:", err);
      setError(err.response?.data?.message || "Could not save your review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) {
      return;
    }

    try {
      await deleteReview(reviewId);
      await loadReviews();
    } catch (err) {
      console.error("Delete review error:", err);
      setError("Could not delete review.");
    }
  };

  return (
    <div className="mt-12 bg-[#24272D] border border-white/10 rounded-3xl p-7 sm:p-10">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Ratings &amp; Reviews</h2>

          <div className="flex items-center gap-3 mt-3">
            <StarRating rating={Math.round(averageRating / 2)} readOnly size={22} />

            <span className="text-xl font-bold">
              {averageRating ? `${averageRating}/10` : "—"}
            </span>

            <span className="text-gray-500 text-sm">
              ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
            </span>
          </div>
        </div>

        {isAuthenticated && !myReview && !showForm && (
          <button
            onClick={() => {
              setEditingReview(null);
              setShowForm(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#D4A017] text-[#17191D] font-semibold hover:scale-105 transition"
          >
            Write a Review
          </button>
        )}
      </div>

      {!isAuthenticated && (
        <p className="mt-4 text-sm text-gray-500">
          Log in to rate and review this title.
        </p>
      )}

      {error && (
        <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="mt-6">
          <ReviewForm
            initialReview={editingReview}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingReview(null);
            }}
          />
        </div>
      )}

      {/* LIST */}
      <div className="mt-8 space-y-5">
        {loading ? (
          <p className="text-gray-500 text-center py-6">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No reviews yet. Be the first to review this title.
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1B1E22] rounded-2xl p-5 border border-white/5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">
                    {review.userId?.fullName || review.userId?.username || "User"}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={Math.round(review.rating / 2)} readOnly size={16} />

                    <span className="text-xs text-gray-500">{review.rating}/10</span>

                    <span className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {user?.id === review.userId?._id && (
                  <div className="flex items-center gap-3 text-sm">
                    <button
                      onClick={() => handleEdit(review)}
                      className="text-gray-400 hover:text-[#D4A017] transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-gray-400 hover:text-red-400 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {review.comment && (
                <p className="mt-3 text-gray-300 leading-6">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewsSection;
