import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Growth from "./components/Growth.jsx";
import Projects from "./components/Projects.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Clients from "./components/Clients.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFab from "./components/WhatsAppFab.jsx";
import BackToTop from "./components/BackToTop.jsx";

export default function App() {
  // Re-measure scroll animations once images and fonts have loaded
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  // Smooth-scroll for in-page links (#about, #contact …), done in JS so it
  // doesn't interfere with ScrollTrigger the way CSS scroll-behavior does
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const target = id === "home" || id === "" ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = id === "home" || id === "" ? 0 : target.getBoundingClientRect().top + window.scrollY - 80;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id || "home"}`);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Growth />
        <Projects />
        <Clients />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </>
  );
}
