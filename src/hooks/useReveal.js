import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared scroll animations for a section. Mark elements with:
 *  .sh (SectionHead)        — heading words rise out of a mask
 *  [data-reveal]            — fade + rise (optional data-delay="0.2")
 *  [data-reveal-img]        — clip-path "window opening" reveal
 *  [data-parallax]          — slow vertical drift of an image inside its frame
 *  [data-stagger] > *       — children rise one after another
 */
export default function useReveal(scopeRef) {
  useLayoutEffect(() => {
    const root = scopeRef.current;
    if (!root) return undefined;
    const q = (sel) => Array.from(root.querySelectorAll(sel));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        q(".sh").forEach((sh) => {
          const st = { trigger: sh, start: "top 85%" };
          gsap.from(sh.querySelectorAll(".sh-word > span"), {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.035,
            scrollTrigger: st,
          });
          gsap.from(sh.querySelectorAll(".sh-fade"), {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.15,
            scrollTrigger: st,
          });
        });

        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        q("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        q("[data-reveal-img]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(14% 10% 14% 10% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });

        q("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -7, scale: 1.12 },
            {
              yPercent: 7,
              scale: 1.04,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scopeRef]);
}
