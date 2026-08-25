import { Link } from "react-router-dom";

import { HiClock } from "react-icons/hi2";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function RecentlyViewed({ items = [] }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-wider">
            Continue Exploring
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Recently Viewed
          </h2>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          className="
            bg-[#24272D]
            border
            border-white/10
            rounded-2xl
            p-8
            text-center
          "
        >
          <HiClock size={38} className="mx-auto text-gray-500" />

          <p className="text-gray-400 mt-4">
            You haven't viewed any content yet.
          </p>

          <Link
            to="/browse"
            className="
              inline-block
              mt-4
              text-[#D4A017]
              font-semibold
              hover:underline
            "
          >
            Start exploring
          </Link>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-5
            gap-5
          "
        >
          {items.map((item, index) => (
            <Link
              key={`${item.type}-${item.id}-${index}`}
              to={`/details/${item.id}`}
              className="
                group
                bg-[#24272D]
                rounded-2xl
                overflow-hidden
                border
                border-white/10
                hover:border-[#D4A017]/50
                transition
              "
            >
              <div className="aspect-2/3 overflow-hidden">
                {item.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${item.poster_path}`}
                    alt={item.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-300
                    "
                  />
                ) : (
                  <div className="w-full h-full bg-[#17191D] flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold truncate">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1 capitalize">
                  {item.type || "movie"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentlyViewed;