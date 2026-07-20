function Footer() {
  return (

    <footer
      className="
      bg-[#17191D]
      border-t
      border-white/10
      text-gray-300
      "
    >


      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        sm:px-8
        py-14
        grid
        sm:grid-cols-2
        lg:grid-cols-4
        gap-10
        "
      >



        {/* Brand */}
        <div>

          <h2
            className="
            text-3xl
            font-black
            text-white
            "
          >

            <span className="text-[#D4A017]">
              Nex
            </span>
            Play

          </h2>



          <p
            className="
            mt-4
            max-w-xs
            text-sm
            leading-6
            text-gray-400
            "
          >
            Discover movies, TV shows, sports and
            entertainment across your favorite platforms.
          </p>


        </div>





        {/* Explore */}
        <div>

          <h3
            className="
            text-white
            font-semibold
            mb-5
            "
          >
            Explore
          </h3>



          <ul className="space-y-3 text-sm">


            {
              [
                "Movies",
                "TV Shows",
                "Sports",
                "Upcoming"
              ].map((item)=>(
                <li
                  key={item}
                  className="
                  cursor-pointer
                  hover:text-[#D4A017]
                  transition
                  "
                >
                  {item}
                </li>
              ))
            }


          </ul>


        </div>







        {/* Platforms */}
        <div>

          <h3
            className="
            text-white
            font-semibold
            mb-5
            "
          >
            Platforms
          </h3>



          <ul className="space-y-3 text-sm">


            {
              [
                "Netflix",
                "Prime Video",
                "Disney+",
                "Apple TV+"
              ].map((item)=>(
                <li
                  key={item}
                  className="
                  cursor-pointer
                  hover:text-[#D4A017]
                  transition
                  "
                >
                  {item}
                </li>
              ))
            }


          </ul>


        </div>







        {/* More */}
        <div>

          <h3
            className="
            text-white
            font-semibold
            mb-5
            "
          >
            More
          </h3>



          <ul className="space-y-3 text-sm">


            {
              [
                "About NexPlay",
                "Advertise",
                "Partner With Us",
                "Contact"
              ].map((item)=>(
                <li
                  key={item}
                  className="
                  cursor-pointer
                  hover:text-[#D4A017]
                  transition
                  "
                >
                  {item}
                </li>
              ))
            }


          </ul>


        </div>



      </div>







      {/* Bottom */}
      <div
        className="
        border-t
        border-white/10
        py-5
        text-center
        text-xs
        sm:text-sm
        text-gray-500
        "
      >

        © 2026 NexPlay. All rights reserved.

      </div>



    </footer>

  );
}

export default Footer;