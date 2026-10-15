# Ken Romero Portfolio Platform

One React + TypeScript codebase and one domain, with a separate entry point for each audience.
Visitors only see navigation for the portfolio they were sent to.

| Route | Audience | Status |
| --- | --- | --- |
| `/` and `/qa` | QA Analyst / Automation QA | Live |
| `/qa/projects/authentication-testing` | QA case study | Live |
| `/qa/projects/api-testing` | QA case study | Live |
| `/it` | Software development roles | Scaffolded, content in progress |
| `/va` | Creative / VA clients (home) | Built from the Canva creative portfolio |
| `/va/design-branding`, `/va/social-media-content`, `/va/podcast-editing` | VA work samples | Built; images pending |
| `/va/smm-packages`, `/va/podcast-packages` | VA pricing (USD / PHP toggle) | Built |

Old `/projects/*` case-study URLs redirect to `/qa/projects/*`. Unknown URLs show a 404 page.

## Structure

```
src/
  App.tsx              routes
  components/          shared UI (header, footer, hero, contact form, testimonials, case-study layout)
  data/                content: profile.ts, testimonials.ts, it.ts, va.ts
  pages/qa/            QA homepage, case studies, QA-specific components
  pages/it/            IT homepage
  pages/va/            VA home, work pages, packages, va.css theme
  styles.css           global design system + QA styles
  audience.css         /it and /va layouts and accent themes
```

## Adding IT / VA content

Edit `src/data/it.ts` and `src/data/va.ts`. Empty IT sections are hidden in production and show
a "Content pending" marker under `npm run dev`. VA images live in `public/va/`; any VA image
whose `image` path is empty renders as a labelled placeholder. Only publish claims that are
supported by real work.

## One portfolio per link (private views)

`VITE_PORTFOLIO` decides what a deployment contains:

| Value | Site contains | Root URL |
| --- | --- | --- |
| `all` (default) | QA, IT, and VA, plus the owner-only view switcher | QA portfolio |
| `qa` | QA portfolio and case studies only | QA portfolio |
| `it` | IT portfolio only | redirects to `/it` |
| `va` | VA / creative portfolio only | redirects to `/va` |

A single-portfolio build does not include the other portfolios at all: their pages, text,
and portfolio-specific files in `public/` are left out, and their URLs show "Page not found".
Each build also gets its own page title and description for link previews.

Recommended Vercel setup: one Vercel project per audience, all pointing at this repository,
each with its own `VITE_PORTFOLIO` environment variable and domain, for example:

| Vercel project | `VITE_PORTFOLIO` | Domain to share |
| --- | --- | --- |
| portfolio-qa | `qa` | `qa.kenromerogoestdigital.space` |
| portfolio-va | `va` | `creative.kenromerogoestdigital.space` |
| portfolio-it | `it` | `dev.kenromerogoestdigital.space` |

Local check: `VITE_PORTFOLIO=va npm run build && npm run preview`.

### View switcher (combined site only)

On the `all` build, a floating **QA | IT | VA** switcher (bottom-left) jumps between portfolios.
It shows on `localhost` and Vercel preview URLs; on a production domain add `?switcher=on` once
to enable it in your browser (`?switcher=off` to hide). Single-portfolio builds never include it.

## Notes

- The contact form UI does not deliver messages yet; a form/email endpoint still needs to be connected.

## Scripts

```
npm run dev       # local dev server
npm run build     # typecheck + production build
npm run preview   # serve the production build
```
