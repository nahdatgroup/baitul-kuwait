import { useRef, useState } from "react";
import { FAQS, CONTACT } from "../data/content.js";
import SectionHead from "./SectionHead.jsx";
import Img from "./Img.jsx";
import useReveal from "../hooks/useReveal.js";

export default function FAQ() {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);
  useReveal(ref);

  return (
    <section ref={ref} className="section faq-section" id="faq">
      <div className="wrap">
        <SectionHead index="08" kicker="Common Questions" title="Frequently asked questions" />

        <div className="fq-split">
          <aside className="fq-card" data-reveal-img>
            <Img
              data-parallax
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
              alt=""
            />
            <span className="fq-card-shade" aria-hidden="true"></span>
            <div className="fq-card-body">
              <h3>Still have a question?</h3>
              <p>Our team answers every enquiry within one business day.</p>
              <div className="fq-card-actions">
                <a href="#contact" className="svc-banner-cta">
                  Ask our team
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href={CONTACT.phoneHref} className="fq-call">
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>

          <div className="fq-list" data-stagger>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className={`fq-item${isOpen ? " open" : ""}`} key={f.question}>
                  <button
                    type="button"
                    className="fq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="fq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="fq-text">{f.question}</span>
                    <span className="fq-icon" aria-hidden="true"></span>
                  </button>
                  <div className="fq-a" id={`faq-a-${i}`} role="region">
                    <div>
                      <p>{f.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
