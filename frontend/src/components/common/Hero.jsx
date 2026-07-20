import { HiPlay } from "react-icons/hi2";

function Hero() {

  const platforms = [
    "Netflix",
    "Prime Video",
    "Disney+",
    "Apple TV+",
    "Max",
    "Hulu",
  ];


  return (
    <section
      className="
      min-h-screen
      bg-[#1A1D23]
      text-white
      flex
      items-center
      relative
      overflow-hidden
      pt-28
      pb-16
      "
    >


      {/* Glow */}
      <div
        className="
        absolute
        top-20
        right-0
        w-62.5
        h-2.5
        md:w-112.5
        md:h-112.5
        bg-[#D4A017]/10
        blur-[100px]
        rounded-full
        "
      ></div>




      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        sm:px-8
        grid
        lg:grid-cols-2
        gap-12
        items-center
        "
      >



        {/* LEFT */}

        <div className="text-center lg:text-left">


          <div
            className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[2px]
            text-[#D4A017]
            "
          >
            Entertainment Discovery Platform
          </div>




          <h1
            className="
            mt-6
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            leading-tight
            "
          >

            Discover Your Next

            <span className="
              block
              text-[#D4A017]
            ">
              Favorite Entertainment
            </span>

          </h1>




          <p
            className="
            mt-5
            mx-auto
            lg:mx-0
            max-w-xl
            text-base
            sm:text-lg
            leading-7
            text-gray-400
            "
          >
            Explore movies, TV shows, live sports and
            upcoming releases from your favorite
            streaming platforms in one place.
          </p>




          <div
            className="
            mt-8
            flex
            flex-col
            sm:flex-row
            justify-center
            lg:justify-start
            gap-4
            "
          >


            <button
              className="
              flex
              justify-center
              items-center
              gap-2
              bg-[#D4A017]
              text-[#1A1D23]
              px-7
              py-3
              rounded-full
              font-semibold
              hover:scale-105
              transition
              "
            >

              <HiPlay />

              Explore Now

            </button>




            <button
              className="
              px-7
              py-3
              rounded-full
              border
              border-white/20
              text-gray-300
              hover:border-[#D4A017]
              hover:text-[#D4A017]
              transition
              "
            >
              Browse Collection
            </button>


          </div>


        </div>






        {/* RIGHT */}

        <div
          className="
          flex
          justify-center
          "
        >


          <div
            className="
            w-full
            max-w-sm
            rounded-3xl
            bg-[#24272D]/70
            backdrop-blur-xl
            border
            border-white/10
            p-5
            sm:p-7
            "
          >



            <p
              className="
              text-xs
              tracking-[3px]
              uppercase
              text-[#D4A017]
              "
            >
              Where To Watch
            </p>



            <h2
              className="
              mt-3
              text-xl
              sm:text-2xl
              font-bold
              "
            >
              Available On
            </h2>



            <p className="
              mt-2
              text-sm
              text-gray-400
            ">
              Official streaming platforms
            </p>




            <div
              className="
              mt-6
              grid
              grid-cols-2
              gap-3
              "
            >

              {platforms.map((platform)=>(

                <div
                  key={platform}
                  className="
                  h-14
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  text-xs
                  sm:text-sm
                  hover:border-[#D4A017]
                  hover:text-[#D4A017]
                  transition
                  "
                >
                  {platform}
                </div>

              ))}

            </div>




            <div
              className="
              mt-6
              pt-4
              border-t
              border-white/10
              flex
              justify-between
              text-sm
              "
            >

              <span className="text-gray-400">
                More platforms
              </span>

              <span className="text-[#D4A017]">
                +20
              </span>


            </div>


          </div>


        </div>


      </div>


    </section>
  );
}


export default Hero;