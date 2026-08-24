import { useState } from "react";
import { HiStar } from "react-icons/hi2";

/*
|--------------------------------------------------------------------------
| STAR RATING
|--------------------------------------------------------------------------
|
| Two modes:
| - readOnly: just displays a rating (used on review lists / cards)
| - interactive: click to set a rating (used in the review form)
|
|--------------------------------------------------------------------------
*/

function StarRating({ rating = 0, onChange, readOnly = false, size = 20 }) {
  const [hovered, setHovered] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  const activeValue = hovered || rating;

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`transition ${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
        >
          <HiStar
            size={size}
            className={star <= activeValue ? "text-[#D4A017]" : "text-gray-600"}
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
