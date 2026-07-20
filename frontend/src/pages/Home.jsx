import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Browse from "./Browse";
import Footer from "../components/Footer";


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