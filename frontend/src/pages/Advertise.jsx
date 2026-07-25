function Advertise() {
  return (
    <main
      className="
      min-h-screen
      bg-[#17191D]
      px-6
      py-20
      "
    >
      <section
        className="
        max-w-6xl
        mx-auto
        "
      >
        {/* Header */}

        <div
          className="
          text-center
          max-w-3xl
          mx-auto
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
            text-xs
            uppercase
            tracking-[2px]
            "
          >
            Advertise With NexPlay
          </div>

          <h1
            className="
            mt-6
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            text-white
            "
          >
            Grow Your
            <span className="text-[#D4A017]"> Entertainment Brand</span>
          </h1>

          <p
            className="
            mt-6
            text-gray-400
            leading-7
            "
          >
            Promote movies, series, games, sports events and entertainment
            campaigns to the right audience through NexPlay.
          </p>

          <button
            className="
            mt-8
            px-8
            py-3
            rounded-full
            bg-[#D4A017]
            text-[#17191D]
            font-bold
            hover:scale-105
            transition
            "
          >
            Start Advertising
          </button>
        </div>

        {/* Features */}

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          mt-20
          "
        >
          <div
            className="
            bg-[#24272D]
            rounded-3xl
            p-8
            border
            border-white/10
            "
          >
            <h3
              className="
              text-white
              text-xl
              font-bold
              "
            >
              Movie Campaigns
            </h3>

            <p
              className="
              mt-3
              text-gray-400
              text-sm
              "
            >
              Showcase upcoming movies and increase audience engagement.
            </p>
          </div>

          <div
            className="
            bg-[#24272D]
            rounded-3xl
            p-8
            border
            border-white/10
            "
          >
            <h3
              className="
              text-white
              text-xl
              font-bold
              "
            >
              Series Promotion
            </h3>

            <p
              className="
              mt-3
              text-gray-400
              text-sm
              "
            >
              Create awareness for your latest shows and releases.
            </p>
          </div>

          <div
            className="
            bg-[#24272D]
            rounded-3xl
            p-8
            border
            border-white/10
            "
          >
            <h3
              className="
              text-white
              text-xl
              font-bold
              "
            >
              Brand Partnership
            </h3>

            <p
              className="
              mt-3
              text-gray-400
              text-sm
              "
            >
              Connect with NexPlay for marketing collaborations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Advertise;
