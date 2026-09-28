import { useEffect, useRef, useState } from "react";
import { STATS } from "../data/content.js";

function Counter({ target, suffix = "", plain = false }) {
  const ref = useRef(null);
  const [value, setValue] = useState(plain ? target : 0);

  useEffect(() => {
    if (plain) return undefined;
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setValue(target);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const duration = 1400;
          let start = null;
          function step(timestamp) {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) window.requestAnimationFrame(step);
          }
          window.requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, plain]);

  return (
    <span className="stat-num" ref={ref}>
      <span className="counter">{value}</span>
      {suffix}
    </span>
  );
}

const HEADLINE = ["Engineering and building", "the infrastructure", "Kuwait runs on."];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <video autoPlay muted loop playsInline preload="auto" poster="/assets/img/hero-poster.jpg" aria-hidden="true">
          <source src="/assets/video/hero-construction.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim"></div>
      </div>

      <div className="wrap hero-inner">
        <p className="hero-eyebrow">Kuwait &middot; Est. 1996</p>
        <h1 className="hero-title" aria-label={HEADLINE.join(" ")}>
          {HEADLINE.map((line, i) => (
            <span className="hero-line" key={line} style={{ "--i": i }} aria-hidden="true">
              <span className="hero-line-text">{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero-lede">
          Baitul Jameeh delivers engineering, construction, trading, equipment rental, recruitment and property
          solutions from one accountable contracting partner &mdash; for oil &amp; gas, industrial, infrastructure
          and government clients.
        </p>
        <div className="hero-cta">
          <a href="#services" className="btn btn-primary btn-lg">
            Explore Services
          </a>
          <a href="#contact" className="btn btn-ghost-light btn-lg">
            Contact Us Today
          </a>
        </div>
      </div>

      <div className="hero-stats">
        <div className="wrap hero-stats-inner">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <Counter target={stat.value} suffix={stat.suffix} plain={stat.plain} />
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
