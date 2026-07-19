import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
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

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-64 bg-gray-900 border border-gray-700 rounded-lg py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />

            <HiOutlineMagnifyingGlass
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl hover:text-red-500 cursor-pointer transition"
            />
          </div>

          {/* Login Button */}
          <button className="bg-red-600 px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition">
            Login
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;