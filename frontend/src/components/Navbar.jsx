import { useState } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-red-600 cursor-pointer">
          NexPlay
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-gray-300 font-medium">
          <li className="hover:text-red-500 cursor-pointer">Home</li>
          <li className="hover:text-red-500 cursor-pointer">Browse</li>
          <li className="hover:text-red-500 cursor-pointer">Trending</li>
          <li className="hover:text-red-500 cursor-pointer">Upcoming</li>
          <li className="hover:text-red-500 cursor-pointer">About</li>
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-64 bg-gray-900 border border-gray-700 rounded-lg py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />

            <HiOutlineMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl cursor-pointer hover:text-red-500" />
          </div>

          <button className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <HiXMark className="text-3xl" />
          ) : (
            <HiBars3 className="text-3xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black border-t border-gray-800 px-6 py-5 space-y-4">
          <ul className="space-y-4 text-gray-300">
            <li className="hover:text-red-500 cursor-pointer">Home</li>
            <li className="hover:text-red-500 cursor-pointer">Browse</li>
            <li className="hover:text-red-500 cursor-pointer">Trending</li>
            <li className="hover:text-red-500 cursor-pointer">Upcoming</li>
            <li className="hover:text-red-500 cursor-pointer">About</li>
          </ul>

          <div className="relative pt-2">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />

            <HiOutlineMagnifyingGlass className="absolute right-3 top-1/2 translate-y-0 text-gray-400 text-xl" />
          </div>

          <button className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;