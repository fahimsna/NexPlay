function About() {
  return (
    <section
      className="
      min-h-screen
      bg-[#17191D]
      text-white
      pt-32
      pb-20
      "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        px-5
        sm:px-8
        "
      >
        <div className="text-center">
          <h1
            className="
            text-4xl
            sm:text-5xl
            font-black
            "
          >
            About
            <span className="text-[#D4A017]"> NexPlay</span>
          </h1>

          <p
            className="
            mt-6
            text-gray-400
            text-lg
            leading-8
            "
          >
            NexPlay is an entertainment discovery platform that helps users
            explore movies, TV shows, live sports and upcoming releases from
            different entertainment companies and streaming platforms.
          </p>
        </div>

        <div
          className="
          mt-12
          grid
          md:grid-cols-3
          gap-6
          "
        >
          <div
            className="
          bg-[#24272D]
          border
          border-white/10
          rounded-2xl
          p-6
          "
          >
            <h2 className="text-xl font-bold text-[#D4A017]">Discover</h2>

            <p className="mt-3 text-gray-400 text-sm">
              Find movies, series and entertainment content from different
              platforms in one place.
            </p>
          </div>

          <div
            className="
          bg-[#24272D]
          border
          border-white/10
          rounded-2xl
          p-6
          "
          >
            <h2 className="text-xl font-bold text-[#D4A017]">Connect</h2>

            <p className="mt-3 text-gray-400 text-sm">
              Helping entertainment companies build stronger connections with
              their audience.
            </p>
          </div>

          <div
            className="
          bg-[#24272D]
          border
          border-white/10
          rounded-2xl
          p-6
          "
          >
            <h2 className="text-xl font-bold text-[#D4A017]">Experience</h2>

            <p className="mt-3 text-gray-400 text-sm">
              A modern platform designed for entertainment discovery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
