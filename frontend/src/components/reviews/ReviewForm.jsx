import { useState } from "react";
import StarRating from "./StarRating";

/*
|--------------------------------------------------------------------------
| REVIEW FORM
|--------------------------------------------------------------------------
|
| Used both to create a new review and to edit an existing one
| (pass `initialReview` to pre-fill for editing).
|
| StarRating is a plain 5-star widget. Ratings are stored 1-10, so a
| click on star N is converted to rating = N * 2 before it's sent up -
| matching NexPlay's existing "X/10" rating convention.
|
|--------------------------------------------------------------------------
*/

function ReviewForm({ initialReview, onSubmit, onCancel, submitting }) {
  const [stars, setStars] = useState(
    initialReview ? Math.round(initialReview.rating / 2) : 0,
  );
  const [comment, setComment] = useState(initialReview?.comment || "");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!stars) {
      setError("Please select a star rating.");
      return;
    }

    setError("");

    onSubmit({ rating: stars * 2, comment });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#24272D] border border-white/10 rounded-2xl p-6"
    >
      <p className="text-sm text-gray-400 mb-2">Your rating</p>

      <div className="flex items-center gap-3">
        <StarRating rating={stars} onChange={setStars} size={26} />

        {stars > 0 && (
          <span className="text-sm text-gray-500">{stars * 2}/10</span>
        )}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts about this title (optional)"
        rows={4}
        maxLength={1000}
        className="
          mt-4
          w-full
          px-4
          py-3
          rounded-xl
          bg-[#17191D]
          border
          border-white/10
          outline-none
          focus:border-[#D4A017]
          text-white
          resize-none
        "
      />

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3 mt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-xl bg-[#D4A017] text-[#17191D] font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : initialReview
              ? "Update Review"
              : "Submit Review"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ReviewForm;
