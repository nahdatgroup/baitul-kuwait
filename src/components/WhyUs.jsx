import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY_US } from "../data/content.js";
import SectionHead from "./SectionHead.jsx";
import Img from "./Img.jsx";
import useReveal from "../hooks/useReveal.js";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  useReveal(ref);

  // Highlight the reason passing through the middle of the screen
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll(".why-row").forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const current = WHY_US[active];

  return (
    <section ref={ref} className="section why-section" id="why">
      <div className="wrap">
        <SectionHead
          index="03"
          kicker="Engineered Reliability"
          title="Why clients keep coming back to Baitul Jameeh"
          sub="Three decades of proven delivery across engineering, construction and trading — with the systems in place to keep it that way."
        />

        <div className="why-split">
          <div className="why-visual">
            <div className="why-visual-frame" data-reveal-img>
              <Img
                data-parallax
                src="/assets/img/why-building.jpg"
                alt="Modern glass office building at dusk"
              />
              <span className="why-visual-shade" aria-hidden="true"></span>
              <div className="why-visual-stat" key={active}>
                <strong>{current.stat}</strong>
                <span>{current.statLabel}</span>
              </div>
              <div className="why-visual-dots" aria-hidden="true">
                {WHY_US.map((w, i) => (
                  <i key={w.title} className={i === active ? "on" : ""}></i>
                ))}
              </div>
            </div>
          </div>

          <ol className="why-list">
            {WHY_US.map((w, i) => (
              <li key={w.title} className={`why-row${i === active ? " active" : ""}`} data-reveal>
                <span className="why-row-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="why-row-body">
                  <div className="why-row-head">
                    <span className="why-row-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d={w.icon} />
                      </svg>
                    </span>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.description}</p>
                </div>
                <div className="why-row-stat">
                  <strong>{w.stat}</strong>
                  <span>{w.statLabel}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
