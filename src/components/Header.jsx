import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, CONTACT } from "../data/content.js";
import { SERVICES } from "../data/services.js";

// Desktop pointers open the dropdown on hover; touch / mobile menu toggles on tap
const canHover = () => window.matchMedia("(hover: hover) and (min-width: 901px)").matches;

export function openService(index) {
  window.dispatchEvent(new CustomEvent("open-service", { detail: index }));
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    if (!sections.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash("#" + entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the services dropdown on outside click / Escape
  useEffect(() => {
    if (!dropOpen) return undefined;
    function onDown(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setDropOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropOpen(false);
  };

  function pickService(i) {
    closeMenu();
    openService(i);
  }

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="wrap header-inner">
        <a href="#home" className="brand">
          <img className="brand-mark" src="/assets/img/logo-mark.png" alt="Baitul Jameeh" width="72" height="57" />
          <span className="brand-text">
            <strong>Baitul Jameeh</strong>
            <small>General Trading &amp; Contracting Co.</small>
          </span>
        </a>

        <nav className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.href === "#services" ? (
              <div
                key={link.href}
                ref={dropRef}
                className={`nav-drop${dropOpen ? " open" : ""}`}
                onMouseEnter={() => canHover() && setDropOpen(true)}
                onMouseLeave={() => canHover() && setDropOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-drop-toggle${activeHash === link.href ? " active" : ""}`}
                  aria-expanded={dropOpen}
                  aria-haspopup="true"
                  onClick={() => setDropOpen((v) => (canHover() ? true : !v))}
                >
                  {link.label}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="nav-drop-panel" role="menu">
                  <p className="nav-drop-title">Our Services</p>
                  <div className="nav-drop-grid">
                    {SERVICES.map((s, i) => (
                      <button key={s.id} type="button" role="menuitem" className="nav-drop-item" onClick={() => pickService(i)}>
                        <span className="nav-drop-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d={s.icon} />
                          </svg>
                        </span>
                        <span className="nav-drop-text">
                          <strong>{s.title}</strong>
                          <small>{s.category}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={activeHash === link.href ? "active" : ""}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={CONTACT.phoneHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
            </svg>
            <span>{CONTACT.phoneDisplay}</span>
          </a>
          <a className="btn btn-primary btn-sm" href="#contact">
            Request a Quote
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mainNav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
