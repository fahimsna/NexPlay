import { HiStar, HiPlay } from "react-icons/hi2";

function EntertainmentCard({ title, category, rating, image }) {
  return (
    <div
      className="
      group
      overflow-hidden
      rounded-2xl
      bg-[#24272D]
      border
      border-white/10
      hover:border-[#D4A017]/50
      transition-all
      duration-500
      "
    >


      {/* Poster */}
      <div
        className="
        relative
        h-90
        sm:h-95
        overflow-hidden
        "
      >


        <img
          src={image}
          alt={title}
          className="
          w-full
          h-full
          object-cover
          group-hover:scale-110
          transition-transform
          duration-700
          "
        />



        {/* Gradient Overlay */}
        <div
          className="
          absolute
          inset-0
          bg-linear-to-t
          from-[#17191D]
          via-transparent
          to-transparent
          "
        ></div>




        {/* Category */}
        <span
          className="
          absolute
          top-4
          left-4
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          bg-[#1A1D23]/80
          backdrop-blur-md
          text-[#D4A017]
          border
          border-white/10
          "
        >
          {category}
        </span>





        {/* Hover Button */}
        <button
          className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          px-5
          py-2.5
          rounded-full
          bg-[#D4A017]
          text-[#1A1D23]
          font-semibold
          opacity-0
          translate-y-5
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all
          duration-300
          "
        >

          <HiPlay />

          Details

        </button>


      </div>





      {/* Info */}
      <div
        className="
        p-5
        "
      >


        <h2
          className="
          text-lg
          font-bold
          text-white
          truncate
          "
        >
          {title}
        </h2>




        {/* Rating */}
        <div
          className="
          flex
          items-center
          gap-2
          mt-3
          "
        >

          <HiStar className="text-[#D4A017]" />


          <span
            className="
            text-sm
            text-gray-300
            "
          >
            {rating}/10
          </span>


        </div>


      </div>


    </div>
  );
}

export default EntertainmentCard;