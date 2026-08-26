import { useNavigate } from "react-router-dom";
import { HiStar, HiPlay } from "react-icons/hi2";
import { recordActivity } from "../../services/activityService";


const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;


function EntertainmentCard({ movie }) {


  const navigate = useNavigate();


  const title = movie.title || movie.name;

  const rating = movie.vote_average || 0;


  const image = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";



  const handleDetailsClick = async () => {

    try {

      await recordActivity({

        userId: "6a8d06dbec780e2f4e2ddbe5",

        activityType: "watch",

        contentId: movie.id,

        contentType: "movie",

        title: title,

        metadata: {

          releaseDate:
            movie.release_date ||
            movie.first_air_date ||
            "",

          rating:
            movie.vote_average || 0,

          posterPath:
            movie.poster_path || ""

        }

      });


      navigate(`/details/${movie.id}`);


    } catch(error) {


      console.log(
        "Activity Error:",
        error.response?.data || error.message
      );


      navigate(`/details/${movie.id}`);

    }

  };



  return (

    <div
      className="
      group
      overflow-hidden
      rounded-3xl
      bg-[#24272D]
      border
      border-white/10
      hover:border-[#D4A017]
      transition-all
      duration-300
      hover:-translate-y-2
      "
    >


      <div
        className="
        relative
        h-105
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
          duration-500
          "

        />



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



        <div
          className="
          absolute
          top-4
          right-4
          flex
          items-center
          gap-1
          px-3
          py-1
          rounded-full
          bg-black/60
          backdrop-blur-md
          text-sm
          border
          border-white/10
          "
        >

          <HiStar className="text-[#D4A017]" />

          <span>
            {rating.toFixed(1)}
          </span>

        </div>



        <button

          onClick={handleDetailsClick}

          className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          px-6
          py-3
          rounded-full
          bg-[#D4A017]
          text-[#17191D]
          font-semibold
          opacity-0
          group-hover:opacity-100
          transition
          "

        >

          <HiPlay />

          Details


        </button>



      </div>





      <div className="p-5">


        <h2
          className="
          text-xl
          font-bold
          text-white
          line-clamp-1
          "
        >

          {title}

        </h2>



        <p
          className="
          mt-3
          text-sm
          text-gray-400
          line-clamp-3
          "
        >

          {movie.overview || "No description available."}

        </p>



        <div
          className="
          mt-5
          flex
          justify-between
          items-center
          text-sm
          "
        >

          <span className="text-gray-400">

            {
              movie.release_date ||
              movie.first_air_date ||
              "Coming Soon"
            }

          </span>



          <span
            className="
            text-[#D4A017]
            font-semibold
            "
          >

            {movie.vote_count || 0} Votes


          </span>


        </div>


      </div>


    </div>

  );

}


export default EntertainmentCard;