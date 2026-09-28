import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "../data/services.js";
import SectionHead from "./SectionHead.jsx";
import useReveal from "../hooks/useReveal.js";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = 88;

export default function Services() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const triggerRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = SERVICES.length;

  useReveal(sectionRef);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: the stage pins. Scrolling only decides WHICH banner is showing;
      // the change itself plays as a complete, timed animation, so the screen
      // never rests on a half-covered or half-faded banner.
      mm.add("(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = pinRef.current;
        pin.classList.add("is-pinned");
        const banners = gsap.utils.toArray(pin.querySelectorAll(".svc-banner"));
        const inners = banners.map((b) => b.querySelector(".svc-banner-inner"));
        const veils = banners.map((b) => b.querySelector(".svc-banner-veil"));
        const reveals = banners.map((b) => b.querySelectorAll(".svc-reveal"));
        let current = 0;
        let tl = null;

        // Start state: first banner in place, the rest waiting below the stage
        gsap.set(banners, { yPercent: (i) => (i === 0 ? 0 : 101) });
        gsap.set(inners, { scale: 1 });
        gsap.set(veils, { opacity: 0 });

        function show(next) {
          if (next === current) return;
          const from = current;
          current = next;
          setActive(next);
          if (tl) tl.progress(1).kill();
          tl = gsap.timeline({ defaults: { duration: 0.85, ease: "power3.inOut" } });

          if (next > from) {
            // Forward: banners slide up and cover the one showing
            tl.set([inners[next]], { scale: 1 }, 0).set([veils[next]], { opacity: 0 }, 0);
            for (let k = from + 1; k <= next; k++) {
              tl.to(banners[k], { yPercent: 0 }, (k - from - 1) * 0.12);
            }
            tl.to(inners[from], { scale: 0.94 }, 0).to(veils[from], { opacity: 0.55 }, 0);
            if (next - from > 1) {
              // banners skipped over on a fast scroll end up covered too
              tl.set(inners.slice(from + 1, next), { scale: 0.94 }, ">");
              tl.set(veils.slice(from + 1, next), { opacity: 0.55 }, "<");
            }
            tl.fromTo(
              reveals[next],
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 },
              0.35
            );
          } else {
            // Backward: banners slide down and uncover the earlier one
            for (let k = from; k > next; k--) {
              tl.to(banners[k], { yPercent: 101 }, (from - k) * 0.12);
            }
            tl.to(inners[next], { scale: 1 }, 0).to(veils[next], { opacity: 0 }, 0);
            tl.set(reveals[next], { y: 0, opacity: 1 }, 0);
          }
        }

        const step = () => Math.max(window.innerHeight * 0.65, 420);

        triggerRef.current = ScrollTrigger.create({
          trigger: pin,
          start: `top top+=${HEADER_OFFSET}`,
          end: () => `+=${(banners.length - 1) * step()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (banners.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power1.inOut",
          },
          onUpdate: (self) => show(Math.round(self.progress * (banners.length - 1))),
          onRefresh: (self) => show(Math.round(self.progress * (banners.length - 1))),
        });

        return () => {
          if (tl) tl.kill();
          pin.classList.remove("is-pinned");
          triggerRef.current = null;
        };
      });

      // Small screens: banners simply stack; track the one in view
      mm.add("(max-width: 899px), (max-height: 559px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray(pinRef.current.querySelectorAll(".svc-banner")).forEach((banner, i) => {
          ScrollTrigger.create({
            trigger: banner,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Jump to a banner (used by chips here and the header dropdown)
  function goTo(i) {
    const st = triggerRef.current;
    if (st) {
      const y = st.start + ((st.end - st.start) * i) / (count - 1);
      window.scrollTo({ top: Math.round(y) + 1, behavior: "smooth" });
    } else {
      const el = document.getElementById(`service-${SERVICES[i].id}`);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 70, behavior: "smooth" });
    }
  }

  useEffect(() => {
    const onOpen = (e) => goTo(e.detail);
    window.addEventListener("open-service", onOpen);
    return () => window.removeEventListener("open-service", onOpen);
  });

  return (
    <section ref={sectionRef} className="section services-section" id="services">
      <div className="wrap">
        <SectionHead
          index="02"
          kicker="Integrated Services"
          title="Seven divisions, engineered to work as one"
          sub="From feasibility through to facilities management, each division is built to hand off cleanly to the next — so nothing gets lost between design and delivery."
        />
      </div>

      <div ref={pinRef} className="svc-pin">
        <div className="wrap svc-pin-inner">
          <nav className="svc-chips" aria-label="Choose a service">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`svc-chip${active === i ? " active" : ""}`}
                aria-current={active === i ? "true" : undefined}
                onClick={() => goTo(i)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.category}
              </button>
            ))}
            <span className="svc-progress" aria-hidden="true">
              <i style={{ transform: `scaleX(${(active + 1) / count})` }}></i>
            </span>
          </nav>

          <div className="svc-stage">
            {SERVICES.map((s, i) => (
              <article
                key={s.id}
                id={`service-${s.id}`}
                className="svc-banner"
                style={{ "--c1": s.colors[0], zIndex: i + 1 }}
                aria-label={s.title}
              >
                <div className="svc-banner-inner">
                  <div className="svc-banner-media" aria-hidden="true">
                    <img
                      className="svc-banner-img"
                      src={s.image}
                      alt=""
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </div>
                  <span className="svc-banner-shade" aria-hidden="true"></span>
                  <span className="svc-banner-veil" aria-hidden="true"></span>

                  <div className="svc-banner-content">
                    <div className="svc-banner-meta svc-reveal">
                      <span className="svc-banner-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="svc-banner-cat">{s.category}</span>
                    </div>
                    <h3 className="svc-reveal">{s.title}</h3>
                    <p className="svc-reveal">{s.description}</p>
                    <ul className="svc-banner-points svc-reveal">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <a href="#contact" className="svc-banner-cta svc-reveal">
                      Request this service
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>

                  <div className="svc-banner-count" aria-hidden="true">
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>/ {String(count).padStart(2, "0")}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
