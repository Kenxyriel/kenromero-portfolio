# Ken Romero Portfolio Platform

One React + TypeScript codebase and one domain, with a separate entry point for each audience.
Visitors only see navigation for the portfolio they were sent to.

| Route | Audience | Status |
| --- | --- | --- |
| `/` and `/qa` | QA Analyst / Automation QA | Live |
| `/qa/projects/authentication-testing` | QA case study | Live |
| `/qa/projects/api-testing` | QA case study | Live |
| `/it` | Software development roles | Scaffolded, content in progress |
| `/va` | Virtual assistant clients | Scaffolded, content in progress |

Old `/projects/*` case-study URLs redirect to `/qa/projects/*`. Unknown URLs show a 404 page.

## Structure

```
src/
  App.tsx              routes
  components/          shared UI (header, footer, hero, contact form, testimonials, case-study layout)
  data/                content: profile.ts, testimonials.ts, it.ts, va.ts
  pages/qa/            QA homepage, case studies, QA-specific components
  pages/it/            IT homepage
  pages/va/            VA homepage
  styles.css           global design system + QA styles
  audience.css         /it and /va layouts and accent themes
```

## Adding IT / VA content

Edit `src/data/it.ts` and `src/data/va.ts`. Sections backed by an empty list (IT experience,
VA tools and work samples) are hidden in production and show a "Content pending" marker
under `npm run dev`. Only publish claims that are supported by real work.

## Notes

- The contact form UI does not deliver messages yet; a form/email endpoint still needs to be connected.

## Scripts

```
npm run dev       # local dev server
npm run build     # typecheck + production build
npm run preview   # serve the production build
```
