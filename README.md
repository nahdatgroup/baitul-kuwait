# Baitul Jameeh — React + Vite

This is the React rebuild of the static site: same content, same brand, now split into
components with a data-driven, interactive Services section.

## Running it

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

> Note: `npm install` needs network access to fetch React/Vite from the npm registry —
> I wasn't able to run it in this sandbox, but the code has been syntax-checked and
> bundle-checked with esbuild, so it's a standard, working Vite + React project.

## What's dynamic about the Services section

`src/components/Services.jsx` + `src/components/ServiceCard.jsx`:

- **Category filters** — pills above the grid (`All`, `Engineering`, `Construction`, …)
  filter the cards with a quick cross-fade, and re-trigger a staggered entrance
  animation for the new set.
- **3D tilt on hover** — each card tracks the cursor and tilts slightly toward it
  (`ServiceCard.jsx`'s `handleMouseMove`), with the icon scaling and rotating a touch.
- **Expandable detail** — click "View details" on a card to reveal its bullet points
  with a smooth height transition, instead of showing everything at once.
- All of it respects `prefers-reduced-motion` — tilt and the entrance animation are
  disabled for anyone with that OS setting.

The data itself lives in `src/data/services.js` as a plain array — add, remove, or
recategorize a service there and the filters/grid update automatically.

## Structure

```
index.html                        Vite entry HTML
src/main.jsx                      React entry point
src/App.jsx                       page layout — composes all sections
src/index.css                     all styling (CSS variables at the top — colors from the logo)
src/data/services.js              the 7 services + category list (Services section data)
src/data/content.js               stats, values, projects, testimonials, FAQ, nav, contact info
src/components/                   one component per section (Header, Hero, About,
                                   Services, ServiceCard, WhyUs, Projects, Testimonials,
                                   FAQ, Contact, Footer, WhatsAppFab, BackToTop)
public/assets/video/              hero background video
public/assets/img/                hero poster, logo files
public/favicon.png                favicon generated from the logo mark
```

Files in `public/` are served as-is by Vite (not bundled), which is why the video and
logo images live there and are referenced with absolute paths like `/assets/img/logo-mark.png`.

## Editing content

Everything text-based (stats, services, projects, testimonials, FAQ, contact details) is
in `src/data/`. Change the data, not the JSX, for day-to-day content updates.

## Deploying to GitHub Pages

1. `npm run build` — outputs static files to `dist/`.
2. Push the contents of `dist/` to your Pages branch (or use an action like
   `peaceiris/actions-gh-pages` to automate the build + deploy on push).
3. If you're deploying under a repo subpath (`username.github.io/repo-name`), add
   `base: "/repo-name/"` to `vite.config.js` before building.

There's still only one page and no client-side router, so the GitHub Pages 404 problem
from the original project doesn't come back.

## Contact form

The form submits via `mailto:info@baitulkw.com` (zero backend required — it opens the
visitor's email client). Swap the `action` in `Contact.jsx` for a real endpoint
(Formspree, EmailJS, your own API) when you're ready for inbox-style submissions.
