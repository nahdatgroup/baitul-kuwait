import { useRef, useState } from "react";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/content.js";
import SectionHead from "./SectionHead.jsx";
import useReveal from "../hooks/useReveal.js";

const INITIAL = 8;

function initials(name) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function Projects() {
  const ref = useRef(null);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  useReveal(ref);

  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const shown = expanded ? list : list.slice(0, INITIAL);
  const clients = new Set(PROJECTS.map((p) => p.client)).size;

  return (
    <section ref={ref} className="section projects-section" id="projects">
      <div className="wrap">
        <SectionHead
          index="05"
          kicker="Recent Projects"
          title="Power division work delivered in 2025"
          sub={`Panels, drives, supply and maintenance for ${clients} clients across Kuwait — from distribution boards to Kuwait Oil Company upgrades.`}
        />

        <div className="pl-filters" role="tablist" aria-label="Filter projects" data-reveal>
          {["All", ...PROJECT_CATEGORIES].map((c) => {
            const n = c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                className={`pl-filter${filter === c ? " active" : ""}`}
                onClick={() => {
                  setFilter(c);
                  setExpanded(false);
                }}
              >
                {c}
                <sup>{n}</sup>
              </button>
            );
          })}
        </div>

        <ol className="pl-list" key={filter}>
          {shown.map((p, i) => (
            <li className="pl-row" key={`${p.client}-${p.scope}`} style={{ "--d": `${Math.min(i, 10) * 40}ms` }}>
              <span className="pl-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="pl-logo" aria-hidden="true">
                {p.logo ? <img src={p.logo} alt="" loading="lazy" /> : <b>{initials(p.client)}</b>}
              </span>
              <span className="pl-client">{p.client}</span>
              <span className="pl-scope">{p.scope}</span>
              <span className="pl-cat">{p.category}</span>
            </li>
          ))}
        </ol>

        {list.length > INITIAL && (
          <button type="button" className="pl-more" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? "Show fewer" : `Show all ${list.length} projects`}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
