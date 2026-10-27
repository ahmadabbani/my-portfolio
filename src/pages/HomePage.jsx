import { useEffect } from "react";
import Hero from "../components/portfolio/Hero";
import Work from "../components/portfolio/Work";
import About from "../components/portfolio/About";
import Expertise from "../components/portfolio/Expertise";
import Showcase from "../components/portfolio/Showcase";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";
import "../styles/portfolio.css";

export default function HomePage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Ahmad Abbani | Full-Stack Developer";
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <>
      <main id="dp-main" tabIndex={-1}>
        <Hero />
        <Work />
        <About />
        <Expertise />
        <Showcase />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
