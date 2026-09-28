import { useRef } from "react";
import { VALUES, CERTIFICATIONS, MISSION_VISION } from "../data/content.js";
import SectionHead from "./SectionHead.jsx";
import Img from "./Img.jsx";
import useReveal from "../hooks/useReveal.js";

const FACTS = [
  { value: "1996", label: "Founded in Kuwait" },
  { value: "7", label: "Specialist divisions" },
  { value: "500+", label: "Projects delivered" },
  { value: "150+", label: "Clients served" },
];

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section about-section" id="about">
      <div className="wrap">
        <SectionHead
          index="01"
          kicker="About Baitul Jameeh"
          title="A trusted multidisciplinary contracting partner, building Kuwait since 1996"
        />

        {/* Wide photo panel with facts */}
        <div className="ab-panel" data-reveal-img>
          <Img
            data-parallax
            className="ab-panel-img"
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
            alt="Engineers reviewing project plans on site"
          />
          <span className="ab-panel-shade" aria-hidden="true"></span>
          <div className="ab-panel-copy">
            <p className="ab-panel-quote" data-reveal>
              From a general trading company to a diversified engineering and contracting group &mdash; one accountable
              partner for Kuwait&rsquo;s most demanding projects.
            </p>
          </div>
          <ul className="ab-facts" data-stagger>
            {FACTS.map((f) => (
              <li key={f.label}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Story + values */}
        <div className="ab-story">
          <div className="ab-story-copy" data-reveal>
            <p className="ab-lead">
              Today our teams support oil &amp; gas, industrial, infrastructure and government clients with the technical
              depth of a specialist and the coordination of a single, accountable partner.
            </p>
            <p>
              Every project is guided by certified quality systems, disciplined safety practices, and a technical team
              invested in getting the details right the first time.
            </p>
            <div className="ab-certs">
              {CERTIFICATIONS.map((c) => (
                <span key={c.name}>
                  <b>{c.name}</b>
                  {c.description}
                </span>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary btn-lg">
              Talk to our team
            </a>
          </div>

          <ol className="ab-values" data-stagger>
            {VALUES.map((v, i) => (
              <li key={v.title}>
                <span className="ab-value-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
                <span className="ab-value-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={v.icon} />
                  </svg>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Mission & Vision — photo panels */}
        <div className="ab-purpose">
          {MISSION_VISION.map((m, i) => (
            <article className="ab-purpose-card" key={m.title} data-reveal data-delay={i * 0.12}>
              <div className="ab-purpose-media" aria-hidden="true">
                <Img data-parallax src={m.image} />
              </div>
              <span className="ab-purpose-shade" aria-hidden="true"></span>
              <div className="ab-purpose-body">
                <span className="ab-purpose-label">{m.title}</span>
                <p>{m.text}</p>
                <ul>
                  {m.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
