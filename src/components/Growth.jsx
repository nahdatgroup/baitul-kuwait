import { useEffect, useMemo, useRef, useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { GROWTH, GROWTH_MILESTONES } from "../data/content.js";
import useInView from "../hooks/useInView.js";
import SectionHead from "./SectionHead.jsx";

const METRICS = [
  { key: "projects", label: "Projects delivered", suffix: "+", color: "#3B3E8B" },
  { key: "clients", label: "Active clients", suffix: "+", color: "#D93637" },
  { key: "workforce", label: "Workforce", suffix: "+", color: "#262953" },
];

const W = 900;
const H = 300;
const PAD = { l: 56, r: 28, t: 28, b: 44 };

// Round the axis top up to 4 even, readable steps
function niceMax(v) {
  const raw = v / 4;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((n) => n * pow >= raw) * pow;
  return step * 4;
}

// Monotone-looking smooth path: horizontal-tangent bezier between points (never overshoots)
function smoothPath(pts) {
  return pts.reduce((d, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = pts[i - 1];
    const mx = (prev.x + p.x) / 2;
    return `${d} C${mx},${prev.y} ${mx},${p.y} ${p.x},${p.y}`;
  }, "");
}

function useCountTo(target, run) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    let frame;
    let start = null;
    const from = 0;
    function step(ts) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setValue(Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);
  return value;
}

export default function Growth() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);
  const [ref, inView] = useInView({ threshold: 0.25 });
  const [metricKey, setMetricKey] = useState("projects");
  const [active, setActive] = useState(GROWTH.length - 1);
  const metric = METRICS.find((m) => m.key === metricKey);

  const { points, ticks, maxY } = useMemo(() => {
    const values = GROWTH.map((d) => d[metricKey]);
    const max = niceMax(Math.max(...values) * 1.08);
    const innerW = W - PAD.l - PAD.r;
    const innerH = H - PAD.t - PAD.b;
    const pts = GROWTH.map((d, i) => ({
      x: PAD.l + (innerW * i) / (GROWTH.length - 1),
      y: PAD.t + innerH * (1 - d[metricKey] / max),
      year: d.year,
      value: d[metricKey],
    }));
    const t = [0, 0.25, 0.5, 0.75, 1].map((f) => ({ v: Math.round(max * f), y: PAD.t + innerH * (1 - f) }));
    return { points: pts, ticks: t, maxY: max };
  }, [metricKey]);

  const line = smoothPath(points);
  const area = `${line} L${points[points.length - 1].x},${H - PAD.b} L${points[0].x},${H - PAD.b} Z`;
  const first = GROWTH[0][metricKey];
  const last = GROWTH[GROWTH.length - 1][metricKey];
  const multiple = Math.round(last / first);
  const current = useCountTo(last, inView);
  const activePoint = points[active];

  return (
    <section ref={sectionRef} className="section growth-section" id="growth">
      <div className="wrap">
        <SectionHead
          index="04"
          kicker="Three Decades Of Growth"
          title="From a single trading desk to a seven-division group"
          sub="Switch the view to see how projects, clients and people have grown since 1996 — hover the line for any milestone year."
        >
          <div className="growth-kpi" aria-live="polite">
            <strong style={{ color: metric.color }}>
              {current}
              {metric.suffix}
            </strong>
            <span>{metric.label} today</span>
            <em>{multiple}&times; since 1996</em>
          </div>
        </SectionHead>

        <div className="growth-layout">
        <div ref={ref} className={`growth-card${inView ? " is-in" : ""}`} style={{ "--metric": metric.color }}>
          <div className="growth-tabs" role="tablist" aria-label="Choose a growth measure">
            {METRICS.map((m) => (
              <button
                key={m.key}
                type="button"
                role="tab"
                aria-selected={metricKey === m.key}
                className={`growth-tab${metricKey === m.key ? " active" : ""}`}
                style={{ "--tab": m.color }}
                onClick={() => {
                  setMetricKey(m.key);
                  setActive(GROWTH.length - 1);
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="growth-chart">
            <div className="growth-plot">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${metric.label} by year, ${first} in 1996 to ${last} in 2026`}>
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={metric.color} stopOpacity="0.32" />
                  <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
                </linearGradient>
              </defs>

              {ticks.map((t) => (
                <g key={t.v} className="growth-grid">
                  <line x1={PAD.l} x2={W - PAD.r} y1={t.y} y2={t.y} />
                  <text x={PAD.l - 12} y={t.y + 4} textAnchor="end">
                    {t.v}
                  </text>
                </g>
              ))}

              {points.map((p, i) => (
                <text key={p.year} className={`growth-year${i === active ? " on" : ""}`} x={p.x} y={H - 14} textAnchor="middle">
                  {p.year}
                </text>
              ))}

              {/* Rising columns behind the curve */}
              {points.map((p, i) => (
                <rect
                  key={`${metricKey}-bar-${p.year}`}
                  className="growth-bar"
                  x={p.x - 14}
                  y={p.y}
                  width="28"
                  height={H - PAD.b - p.y}
                  rx="6"
                  style={{ animationDelay: `${i * 90}ms` }}
                />
              ))}

              <path key={`${metricKey}-area`} className="growth-area" d={area} fill="url(#growthFill)" />
              <path key={`${metricKey}-line`} className="growth-line" d={line} pathLength="1" />

              {activePoint && (
                <line className="growth-guide" x1={activePoint.x} x2={activePoint.x} y1={activePoint.y} y2={H - PAD.b} />
              )}

              {points.map((p, i) => (
                <g key={`${metricKey}-pt-${p.year}`}>
                  <circle
                    className={`growth-dot${i === active ? " on" : ""}`}
                    cx={p.x}
                    cy={p.y}
                    r={i === active ? 8 : 5}
                    style={{ animationDelay: `${600 + i * 110}ms` }}
                  />
                  <rect
                    className="growth-hit"
                    x={p.x - (W - PAD.l - PAD.r) / (GROWTH.length - 1) / 2}
                    y={PAD.t}
                    width={(W - PAD.l - PAD.r) / (GROWTH.length - 1)}
                    height={H - PAD.t - PAD.b}
                    tabIndex="0"
                    aria-label={`${p.year}: ${p.value} ${metric.label.toLowerCase()}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  />
                </g>
              ))}
            </svg>

            {activePoint && (
              <div
                className="growth-tip"
                style={{
                  left: `${(activePoint.x / W) * 100}%`,
                  top: `${(activePoint.y / H) * 100}%`,
                }}
              >
                <b>{activePoint.value}{metric.suffix}</b>
                <span>{activePoint.year}</span>
              </div>
            )}
            </div>
          </div>
        </div>

        <ol className="growth-milestones" data-stagger>
          {GROWTH_MILESTONES.map((m, i) => (
            <li key={m.year} style={{ "--delay": `${i * 120}ms` }}>
              <span className="growth-m-year">{m.year}</span>
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
