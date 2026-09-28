import { useRef } from "react";
import { CLIENTS } from "../data/content.js";
import SectionHead from "./SectionHead.jsx";
import useReveal from "../hooks/useReveal.js";

function Row({ items, reverse }) {
  // Items are repeated so the loop stays seamless even on very wide screens
  return (
    <div className={`clients-row${reverse ? " reverse" : ""}`}>
      <div className="clients-track">
        {[...items, ...items, ...items, ...items].map((c, i) => (
          <figure className={`client-logo${c.wide ? " wide" : ""}`} key={`${c.name}-${i}`} aria-hidden={i >= items.length}>
            <img src={c.logo} alt={i >= items.length ? "" : c.name} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const ref = useRef(null);
  useReveal(ref);
  const half = Math.ceil(CLIENTS.length / 2);
  return (
    <section ref={ref} className="section clients-section" id="clients">
      <div className="wrap">
        <SectionHead
          index="06"
          kicker="Our Clients"
          title="Trusted by Kuwait’s leading energy and industrial companies"
          sub="From national oil companies to global engineering groups — partners who return to us project after project."
        />
      </div>
      <div className="clients-marquee" data-reveal>
        <Row items={CLIENTS.slice(0, half)} />
        <Row items={CLIENTS.slice(half)} reverse />
      </div>
    </section>
  );
}
