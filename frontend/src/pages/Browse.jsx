import EntertainmentCard from "../components/EntertainmentCard";

import superman from "../assets/images/superman.jpg";
import wednesday from "../assets/images/wednesday.jpg";
import f1 from "../assets/images/f1.jpg";


function Browse() {


  const entertainment = [
    {
      id: 1,
      title: "Superman",
      category: "Movie",
      rating: "8.0",
      image: superman,
    },

    {
      id: 2,
      title: "Wednesday",
      category: "TV Show",
      rating: "8.1",
      image: wednesday,
    },

    {
      id: 3,
      title: "F1",
      category: "Movie",
      rating: "7.9",
      image: f1,
    },
  ];



  return (

    <section
      className="
      relative
      overflow-hidden
      bg-[#1A1D23]
      text-white
      py-20
      "
    >


      {/* Background Glow */}
      <div
        className="
        absolute
        left-1/2
        -translate-x-1/2
        top-0
        w-[300px]
        h-[250px]
        md:w-[500px]
        md:h-[300px]
        bg-[#D4A017]/10
        blur-[120px]
        rounded-full
        "
      ></div>





      <div
        className="
        relative
        max-w-7xl
        mx-auto
        px-5
        sm:px-8
        "
      >




        {/* Header */}
        <div
          className="
          flex
          flex-col
          md:flex-row
          md:justify-between
          md:items-end
          gap-6
          mb-12
          "
        >



          <div>


            <div
              className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/5
              border
              border-white/10
              text-xs
              uppercase
              tracking-[3px]
              text-[#D4A017]
              "
            >

              <span
                className="
                w-2
                h-2
                rounded-full
                bg-[#D4A017]
                animate-pulse
                "
              ></span>


              Trending


            </div>




            <h2
              className="
              mt-5
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              "
            >
              Trending Entertainment
            </h2>




            <p
              className="
              mt-3
              text-gray-400
              max-w-xl
              "
            >
              Discover the latest movies, series and
              entertainment everyone is talking about.
            </p>


          </div>





          <button
            className="
            px-5
            py-2
            rounded-full
            border
            border-white/15
            text-sm
            text-gray-300
            hover:border-[#D4A017]
            hover:text-[#D4A017]
            transition
            "
          >

            View All →

          </button>



        </div>







        {/* Cards */}
        <div
          className="
          grid
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          lg:gap-8
          "
        >

          {
            entertainment.map((item)=>(

              <EntertainmentCard
                key={item.id}
                {...item}
              />

            ))
          }


        </div>




      </div>


    </section>

  );
}


export default Browse;