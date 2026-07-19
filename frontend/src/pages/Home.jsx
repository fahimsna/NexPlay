import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Browse from "./Browse";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Browse />
      <Footer />
    </>
  );
}

export default Home;