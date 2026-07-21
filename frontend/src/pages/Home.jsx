import Navbar from "../components/common/Navbar";
import Hero from "../components/common/Hero";
import Footer from "../components/common/Footer";
import Browse from "./Browse";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Browse />
      </main>

      <Footer />
    </>
  );
}

export default Home;
