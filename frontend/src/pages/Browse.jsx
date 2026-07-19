import EntertainmentCard from "../components/EntertainmentCard";

import superman from "../assets/images/superman.jpg";
import wednesday from "../assets/images/wednesday.jpg";
import f1 from "../assets/images/f1.jpg";

function Browse() {

  const entertainment = [
    {
      id: 1,
      title: "Superman",
      category: "Movie",
      rating: "8.0",
      image: superman,
    },
    {
      id: 2,
      title: "Wednesday",
      category: "TV Show",
      rating: "8.1",
      image: wednesday,
    },
    {
      id: 3,
      title: "F1",
      category: "Movie",
      rating: "7.9",
      image: f1,
    },
  ];

  return (
    <section className="bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-10">
          Browse Entertainment
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entertainment.map((item) => (
            <EntertainmentCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Browse;