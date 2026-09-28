import { Fragment } from "react";

/** Shared section header: index + kicker, word-masked title, optional side copy/actions. */
export default function SectionHead({ index, kicker, title, sub, children, light = false }) {
  const words = title.split(" ");
  return (
    <header className={`sh${light ? " sh-light" : ""}`}>
      <div className="sh-top sh-fade">
        <span className="sh-index">{index}</span>
        <span className="sh-line" aria-hidden="true"></span>
        <span className="sh-kicker">{kicker}</span>
      </div>
      <div className={`sh-grid${sub || children ? "" : " sh-grid-single"}`}>
        <h2 className="sh-title" aria-label={title}>
          {words.map((w, i) => (
            <Fragment key={`${w}-${i}`}>
              <span className="sh-word" aria-hidden="true">
                <span>{w}</span>
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h2>
        {(sub || children) && (
          <div className="sh-side sh-fade">
            {sub && <p>{sub}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
