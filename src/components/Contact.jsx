import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT, CONTACT_STEPS, OFFICE_HOURS } from "../data/content.js";
import { SERVICES } from "../data/services.js";
import SectionHead from "./SectionHead.jsx";
import useReveal from "../hooks/useReveal.js";

gsap.registerPlugin(ScrollTrigger);

const MAX_MESSAGE = 600;

// Current time in Kuwait, independent of the visitor's own timezone
function kuwaitNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuwait",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days.indexOf(get("weekday")),
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    second: Number(get("second")),
  };
}

function useKuwaitClock() {
  const [now, setNow] = useState(kuwaitNow);
  useEffect(() => {
    const t = window.setInterval(() => setNow(kuwaitNow()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

function format12(h, m) {
  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
}

export default function Contact() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);
  const now = useKuwaitClock();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState([]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const isOpen =
    OFFICE_HOURS.days.includes(now.day) && now.hour >= OFFICE_HOURS.open && now.hour < OFFICE_HOURS.close;
  const minutesLeft = (OFFICE_HOURS.close - now.hour) * 60 - now.minute;

  // Cycle through the "what happens next" steps
  useEffect(() => {
    const t = window.setInterval(() => setStep((s) => (s + 1) % CONTACT_STEPS.length), 3200);
    return () => window.clearInterval(t);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ct-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".ct-form", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ct-form", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function togglePick(title) {
    setPicked((list) => (list.includes(title) ? list.filter((t) => t !== title) : [...list, title]));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "-"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Services: ${picked.length ? picked.join(", ") : "-"}`,
      "",
      message,
    ].join("\n");
    const subject = `Quote request${picked.length ? ` — ${picked.join(", ")}` : ""}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section ref={sectionRef} className="section contact-section" id="contact">
      <div className="wrap">
        <SectionHead
          index="09"
          kicker="Request A Quote"
          title="Let’s talk about your next project"
          sub="Tell us what you’re planning — a division lead will reply within one business day."
        />

        <div className="ct-grid">
          <div className="ct-side">
            {/* Live status */}
            <div className={`ct-status ct-reveal${isOpen ? " open" : ""}`}>
              <span className="ct-dot" aria-hidden="true"></span>
              <div>
                <strong>{isOpen ? "Our office is open now" : "Our office is closed right now"}</strong>
                <span>
                  {isOpen
                    ? minutesLeft <= 60
                      ? `Closing in ${minutesLeft} min`
                      : `Open until ${format12(OFFICE_HOURS.close, 0)} Kuwait time`
                    : `${OFFICE_HOURS.label} — leave a message and we reply next business day`}
                </span>
              </div>
              <div className="ct-clock" aria-label="Current time in Kuwait">
                <b>{format12(now.hour, now.minute)}</b>
                <small>Kuwait time</small>
              </div>
            </div>

            {/* Contact methods */}
            <div className="ct-methods">
              <div className="ct-method ct-method-phones ct-reveal">
                <span className="ct-method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
                </span>
                <small>Call us</small>
                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                <a href={CONTACT.phone2Href}>{CONTACT.phone2Display}</a>
              </div>
              <button type="button" className="ct-method ct-reveal" onClick={copyEmail}>
                <span className="ct-method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 2-10 7L2 6" /></svg>
                </span>
                <small>{copied ? "Copied to clipboard" : "Email (click to copy)"}</small>
                <strong>{CONTACT.email}</strong>
              </button>
              <a className="ct-method ct-reveal" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                <span className="ct-method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5Z" /></svg>
                </span>
                <small>WhatsApp</small>
                <strong>Chat with our team</strong>
              </a>
              <a
                className="ct-method ct-reveal"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="ct-method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 22s8-6 8-12a8 8 0 0 0-16 0c0 6 8 12 8 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>
                </span>
                <small>Visit us</small>
                <strong>{CONTACT.address}</strong>
              </a>
            </div>

            {/* What happens next */}
            <div className="ct-steps ct-reveal">
              <h3>What happens after you send a request</h3>
              <ol>
                {CONTACT_STEPS.map((s, i) => (
                  <li key={s.title} className={i === step ? "active" : i < step ? "done" : ""}>
                    <span className="ct-step-num">{i + 1}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ct-map ct-reveal">
              <iframe
                title="Baitul Jameeh office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <form className="ct-form" onSubmit={handleSubmit}>
            {sent ? (
              <div className="ct-sent" role="status">
                <svg viewBox="0 0 52 52" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l7 7 15-15" />
                </svg>
                <h3>Your email app should now be open</h3>
                <p>Send the drafted message and our team will reply within one business day.</p>
                <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
                  Start another request
                </button>
              </div>
            ) : (
              <>
                <div className="ct-form-head">
                  <h3>Tell us about your project</h3>
                  <p>Pick the services you need and we&rsquo;ll route it to the right division.</p>
                </div>

                <fieldset className="ct-picks">
                  <legend>Services needed</legend>
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`ct-pick${picked.includes(s.title) ? " on" : ""}`}
                      aria-pressed={picked.includes(s.title)}
                      onClick={() => togglePick(s.title)}
                    >
                      {s.category}
                    </button>
                  ))}
                </fieldset>

                <div className="ct-row">
                  <label className="ct-field">
                    <input name="name" required placeholder=" " autoComplete="name" />
                    <span>Full name</span>
                  </label>
                  <label className="ct-field">
                    <input name="company" placeholder=" " autoComplete="organization" />
                    <span>Company</span>
                  </label>
                </div>
                <div className="ct-row">
                  <label className="ct-field">
                    <input name="email" type="email" required placeholder=" " autoComplete="email" />
                    <span>Email</span>
                  </label>
                  <label className="ct-field">
                    <input name="phone" type="tel" placeholder=" " autoComplete="tel" />
                    <span>Phone</span>
                  </label>
                </div>
                <label className="ct-field">
                  <textarea
                    name="message"
                    rows="5"
                    required
                    placeholder=" "
                    maxLength={MAX_MESSAGE}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <span>Project details</span>
                  <em className="ct-count">
                    {message.length}/{MAX_MESSAGE}
                  </em>
                </label>

                <button type="submit" className="btn btn-primary btn-block btn-lg ct-submit">
                  Send request
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <p className="ct-note">We reply within one business day. Your details are only used to answer this request.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
