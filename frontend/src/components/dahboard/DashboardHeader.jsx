import { HiBars3, HiBell, HiMagnifyingGlass } from "react-icons/hi2";

function DashboardHeader({ setIsOpen }) {
  return (
    <header
      className="

fixed

top-0

right-0

left-0

lg:left-72

z-40

h-20

bg-[#17191D]/80

backdrop-blur-xl

border-b

border-white/10

"
    >
      <div
        className="

h-full

px-4

sm:px-6

lg:px-8

flex

items-center

justify-between

"
      >
        {/* Left Side */}

        <div
          className="

flex

items-center

gap-4

"
        >
          {/* Mobile Menu */}

          <button
            onClick={() => setIsOpen(true)}
            className="

lg:hidden

w-10

h-10

rounded-xl

bg-[#24272D]

flex

items-center

justify-center

text-white

"
          >
            <HiBars3 size={24} />
          </button>

          <div>
            <h1
              className="

text-lg

sm:text-xl

font-bold

text-white

"
            >
              Company Dashboard
            </h1>

            <p
              className="

hidden

sm:block

text-sm

text-gray-400

"
            >
              Manage your entertainment brand
            </p>
          </div>
        </div>

        {/* Right Side */}

        <div
          className="

flex

items-center

gap-3

"
        >
          {/* Search */}

          <div
            className="

hidden

md:flex

items-center

gap-3

bg-[#24272D]

border

border-white/10

rounded-full

px-5

py-2.5

w-64

focus-within:border-[#D4A017]

transition

"
          >
            <HiMagnifyingGlass className="text-gray-400" />

            <input
              type="text"
              placeholder="Search dashboard..."
              className="

bg-transparent

outline-none

text-sm

text-white

placeholder:text-gray-500

w-full

"
            />
          </div>

          {/* Notification */}

          <button
            className="

relative

w-11

h-11

rounded-full

bg-[#24272D]

border

border-white/10

flex

items-center

justify-center

text-gray-300

hover:border-[#D4A017]

transition

"
          >
            <HiBell size={21} />

            <span
              className="

absolute

top-2

right-2

w-2

h-2

rounded-full

bg-[#D4A017]

"
            />
          </button>

          {/* Avatar */}

          <div
            className="

hidden

sm:flex

items-center

gap-3

bg-[#24272D]

border

border-white/10

rounded-full

px-3

py-1.5

"
          >
            <div
              className="

w-9

h-9

rounded-full

bg-[#D4A017]

flex

items-center

justify-center

font-bold

text-[#17191D]

"
            >
              N
            </div>

            <span
              className="

text-sm

text-gray-300

hidden

md:block

"
            >
              Company
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
