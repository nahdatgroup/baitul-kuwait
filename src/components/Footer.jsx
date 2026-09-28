import { useRef } from "react";
import { NAV_LINKS, CONTACT } from "../data/content.js";
import { SERVICES } from "../data/services.js";
import { openService } from "./Header.jsx";
import Img from "./Img.jsx";
import useReveal from "../hooks/useReveal.js";

export default function Footer() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <footer ref={ref} className="site-footer">
      <div className="wrap">
        <div className="ft-cta" data-reveal-img>
          <Img
            data-parallax
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt=""
          />
          <span className="ft-cta-shade" aria-hidden="true"></span>
          <div className="ft-cta-body">
            <h2>Ready to start your next project?</h2>
            <p>Tell us what you&rsquo;re building &mdash; we&rsquo;ll bring the right divisions to the table.</p>
          </div>
          <div className="ft-cta-actions">
            <a href="#contact" className="svc-banner-cta">
              Request a quote
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href={CONTACT.phoneHref} className="fq-call">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="ft-grid">
          <div className="ft-brand">
            <img className="footer-logo" src="/assets/img/logo-full.png" alt="Baitul Jameeh General Trading & Contracting Co." />
            <p>Engineering, construction, trading, equipment rental, recruitment and property solutions since 1996.</p>
          </div>
          <div>
            <h4>Navigate</h4>
            {NAV_LINKS.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.map((s, i) => (
              <button type="button" key={s.id} onClick={() => openService(i)}>
                {s.title}
              </button>
            ))}
          </div>
          <div>
            <h4>Contact</h4>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.phone2Href}>{CONTACT.phone2Display}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <p>{CONTACT.address}</p>
          </div>
        </div>

        <div className="ft-wordmark" aria-hidden="true">
          Baitul Jameeh
        </div>

        <div className="ft-bottom">
          <p>&copy; {new Date().getFullYear()} Baitul Jameeh General Trading &amp; Contracting Co. All rights reserved.</p>
          <a href="#home">Back to top &uarr;</a>
        </div>
      </div>
    </footer>
  );
}
