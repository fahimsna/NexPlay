import Hero from "../components/common/Hero";
import Browse from "./Browse";
import FeaturedContent from "../components/discovery/FeaturedContent";

function Home() {
  return (
    <>
      <Hero />

      <FeaturedContent />

      <Browse />
    </>
  );
}

export default Home;