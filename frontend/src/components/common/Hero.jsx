import { Link } from "react-router-dom";
import { HiPlay } from "react-icons/hi2";

function Hero() {
  const platforms = [
    {
      name: "Netflix",
      link: "https://www.netflix.com",
    },
    {
      name: "Prime Video",
      link: "https://www.primevideo.com",
    },
    {
      name: "Disney+",
      link: "https://www.disneyplus.com/",
    },
    {
      name: "Apple TV+",
      link: "https://tv.apple.com",
    },
    {
      name: "Max",
      link: "https://www.max.com",
    },
    {
      name: "Hulu",
      link: "https://www.hulu.com/",
    },
  ];

  return (
    <section
      className="
      relative
      overflow-hidden
      bg-[#17191D]
      text-white
      pt-28
      pb-16
      sm:pt-32
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        top-10
        right-0
        w-64
        h-64
        sm:w-96
        sm:h-96
        bg-[#D4A017]/10
        blur-[100px]
        rounded-full
        "
      />

      <div
        className="
        relative
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-12
        lg:gap-16
        items-center
        "
      >
        {/* LEFT CONTENT */}

        <div
          className="
          text-center
          lg:text-left
          "
        >
          <div
            className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            text-[#D4A017]
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[2px]
            "
          >
            Entertainment Discovery Platform
          </div>

          <h1
            className="
            mt-6
            text-4xl
            sm:text-5xl
            lg:text-7xl
            font-black
            leading-[1.05]
            tracking-tight
            "
          >
            Discover Your Next
            <span
              className="
              block
              mt-2
              text-[#D4A017]
              "
            >
              Favorite Entertainment
            </span>
          </h1>

          <p
            className="
            mt-6
            max-w-xl
            mx-auto
            lg:mx-0
            text-sm
            sm:text-base
            lg:text-lg
            text-gray-400
            leading-7
            "
          >
            Explore movies, TV shows, live sports and upcoming releases from
            your favorite streaming platforms in one place.
          </p>

          {/* Buttons */}

          <div
            className="
            mt-8
            flex
            flex-col
            sm:flex-row
            gap-4
            justify-center
            lg:justify-start
            "
          >
            <Link
              to="/browse"
              className="
              flex
              justify-center
              items-center
              gap-2
              px-7
              py-3
              rounded-full
              bg-[#D4A017]
              text-[#17191D]
              font-semibold
              hover:scale-105
              transition
              "
            >
              <HiPlay />
              Explore Now
            </Link>

            <Link
              to="/movies"
              className="
              flex
              justify-center
              items-center
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
            </Link>
          </div>
        </div>

        {/* RIGHT CARD */}

        <div
          className="
          flex
          justify-center
          w-full
          "
        >
          <div
            className="
            w-full
            max-w-md
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
              uppercase
              tracking-[3px]
              text-[#D4A017]
              "
            >
              Where To Watch
            </p>

            <h2
              className="
              mt-3
              text-xl
              sm:text-3xl
              font-bold
              "
            >
              Available On
            </h2>

            <p
              className="
              mt-2
              text-sm
              text-gray-400
              "
            >
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
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    h-12
                    sm:h-14
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
                    cursor-pointer
                    "
                >
                  {platform.name}
                </a>
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
              <span className="text-gray-400">More platforms</span>

              <span className="text-[#D4A017]">+20</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
