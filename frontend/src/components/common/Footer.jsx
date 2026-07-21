import { Link } from "react-router-dom";

function Footer() {
  const exploreLinks = [
    {
      name: "Discover",
      path: "/browse",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Series",
      path: "/series",
    },
  ];

  const platforms = [
    {
      name: "Netflix",
      link: "https://www.netflix.com/",
    },
    {
      name: "Prime Video",
      link: "https://www.primevideo.com/",
    },
    {
      name: "Disney+",
      link: "https://www.disneyplus.com/",
    },
    {
      name: "Apple TV+",
      link: "https://tv.apple.com/",
    },
  ];

  const moreLinks = [
    {
      name: "About NexPlay",
      path: "/about",
    },
    {
      name: "Advertise",
      path: "/advertise",
    },
    {
      name: "Partner With Us",
      path: "/partner",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

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
        px-5
        sm:px-8
        py-14
        grid
        grid-cols-1
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
            <span className="text-[#D4A017]">Nex</span>
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
            Discover movies, TV shows, sports and entertainment across your
            favorite platforms.
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

          <ul
            className="
            space-y-3
            text-sm
            "
          >
            {exploreLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="
                    hover:text-[#D4A017]
                    transition
                    "
                >
                  {item.name}
                </Link>
              </li>
            ))}
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

          <ul
            className="
            space-y-3
            text-sm
            "
          >
            {platforms.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    hover:text-[#D4A017]
                    transition
                    "
                >
                  {platform.name}
                </a>
              </li>
            ))}
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

          <ul
            className="
            space-y-3
            text-sm
            "
          >
            {moreLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="
                    hover:text-[#D4A017]
                    transition
                    "
                >
                  {item.name}
                </Link>
              </li>
            ))}
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
        px-5
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
