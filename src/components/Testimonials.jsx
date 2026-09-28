import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../data/content.js";
import useInView from "../hooks/useInView.js";
import useReveal from "../hooks/useReveal.js";
import SectionHead from "./SectionHead.jsx";
import Img from "./Img.jsx";

const DURATION = 7000;

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback((i) => setActive(((i % count) + count) % count), [count]);

  // Auto-advance while visible and not hovered/focused
  useEffect(() => {
    if (!inView || paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = window.setTimeout(() => go(active + 1), DURATION);
    return () => window.clearTimeout(t);
  }, [active, paused, inView, go]);

  const current = TESTIMONIALS[active];

  return (
    <section ref={sectionRef} className="section voices-section" id="testimonials">
      <div className="wrap">
        <SectionHead
          index="07"
          kicker="Client Voices"
          title="What our partners say about working with us"
        />

        <div
          ref={ref}
          className={`voices${inView ? " is-in" : ""}${paused ? " is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="voices-stage" aria-live="polite">
            <Img
              className="voices-stage-img"
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
              alt=""
            />
            <span className="voices-stage-shade" aria-hidden="true"></span>
            <svg className="voices-mark" viewBox="0 0 64 48" aria-hidden="true">
              <path d="M0 48V28C0 12 8 3 24 0l3 7C18 10 14 15 14 22h12v26H0Zm37 0V28C37 12 45 3 61 0l3 7c-9 3-13 8-13 15h12v26H37Z" />
            </svg>

            <blockquote className="voices-quote" key={active}>
              <p>{current.quote}</p>
              <footer>
                <span className="voices-avatar" aria-hidden="true">
                  {initials(current.name)}
                </span>
                <span>
                  <strong>{current.name}</strong>
                  <em>{current.role}</em>
                </span>
              </footer>
            </blockquote>

            <div className="voices-controls">
              <button type="button" className="voices-arrow" onClick={() => go(active - 1)} aria-label="Previous testimonial">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="voices-count">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button type="button" className="voices-arrow" onClick={() => go(active + 1)} aria-label="Next testimonial">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          <ul className="voices-list" role="tablist" aria-label="Choose a testimonial">
            {TESTIMONIALS.map((t, i) => (
              <li key={t.name}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`voices-tab${i === active ? " active" : ""}`}
                  onClick={() => go(i)}
                  style={{ "--dur": `${DURATION}ms` }}
                >
                  <span className="voices-avatar small" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className="voices-tab-text">
                    <strong>{t.name}</strong>
                    <em>{t.role}</em>
                    <span className="voices-snippet">&ldquo;{t.quote}&rdquo;</span>
                  </span>
                  <span className="voices-progress" aria-hidden="true">
                    <i key={i === active ? `on-${active}` : "off"}></i>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
