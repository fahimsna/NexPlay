function Navbar() {
  return (
    <nav className="bg-black px-8 py-5">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-red-600 cursor-pointer">
          NexPlay
        </h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <li className="hover:text-red-500 transition cursor-pointer">
            Home
          </li>

          <li className="hover:text-red-500 transition cursor-pointer">
            Browse
          </li>

          <li className="hover:text-red-500 transition cursor-pointer">
            Trending
          </li>

          <li className="hover:text-red-500 transition cursor-pointer">
            Upcoming
          </li>

          <li className="hover:text-red-500 transition cursor-pointer">
            About
          </li>
        </ul>

        <button className="bg-red-600 px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition">
          Login
        </button>

      </div>
    </nav>
  );
}

export default Navbar;