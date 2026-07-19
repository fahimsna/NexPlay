function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <p className="uppercase tracking-widest text-red-500 font-semibold text-sm md:text-base">
          Welcome to NexPlay
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-4 leading-tight">
          Discover Your Next <br className="hidden md:block" />
          Favorite Entertainment
        </h1>

        <p className="text-gray-400 text-base md:text-lg mt-6 max-w-2xl">
          Explore thousands of movies, TV shows, live sports,
          and upcoming releases from your favorite entertainment
          platforms—all in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Browse Now
          </button>

          <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          <div>
            <h2 className="text-3xl font-bold text-red-500">10K+</h2>
            <p className="text-gray-400">Entertainment Titles</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-red-500">500+</h2>
            <p className="text-gray-400">Streaming Partners</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-red-500">24/7</h2>
            <p className="text-gray-400">Latest Updates</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;