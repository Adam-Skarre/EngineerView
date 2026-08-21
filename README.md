# Engineer View

Research for the built world. A Skar Technologies company.

This repository contains the Engineer View landing experience and static research library.

Production domain: [engineerview.com](https://engineerview.com)

## Publication structure

- `index.html` — production shell for the React research portal
- `src/landing.jsx` — research discovery, filtering, navigation, motion, and video playback
- `assets/landing.css` — institutional visual system and responsive behavior
- `assets/landing.js` — production bundle served by GitHub Pages
- `research.html` — searchable research library
- `topics.html` — coverage areas
- `methodology.html` — research standards and disclosures
- `grid-load-growth.html` — Engineering Outlook EV–001
- `ai-diffusion.html` — Research Note EV–002
- `industrial-readiness.html` — Field Guide EV–003
- `transformer-critical-path.html` — Infrastructure Brief EV–004

`RESEARCH_RECORD.md` records the primary evidence behind the current infrastructure brief so forecasts, observed data, and Engineer View analysis remain distinct.

The landing page is built with React, Framer Motion, Lucide, and adaptive HLS support. Run `pnpm install` and `pnpm build` after changing `src/landing.jsx`; the research pages remain dependency-free static HTML. Published quantitative claims link directly to their primary source records.

The root `CNAME`, `robots.txt`, and `sitemap.xml` files prepare the repository for standalone GitHub Pages hosting on `engineerview.com`.
