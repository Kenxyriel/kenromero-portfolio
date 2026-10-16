# Ken Romero Portfolio Platform

One React + TypeScript codebase and one domain, with a separate entry point for each audience.
Visitors only see navigation for the portfolio they were sent to.

| Route | Audience |
| --- | --- |
| `/` and `/qa` | QA + software development portfolio (tech) |
| `/qa/projects/authentication-testing`, `/qa/projects/api-testing` | QA case studies |
| `/va` | Creative / VA portfolio home |
| `/va/design-branding`, `/va/social-media-content`, `/va/podcast-editing` | VA work pages |
| `/va/smm-packages` (USD), `/va/smm-local-packages` (PHP), `/va/podcast-packages` | VA pricing, one currency per page. Unlisted: not linked from the portfolio and marked `noindex`; share directly with a client (see Package subdomains). |

The former `/it` portfolio is merged into `/qa`; `/it` redirects there. Old `/projects/*` case-study URLs redirect to `/qa/projects/*`. Unknown URLs show a 404 page.

## Structure

```
src/
  App.tsx              routes
  components/          shared UI (header, footer, hero, contact form, testimonials, case-study layout)
  data/                content: profile.ts, testimonials.ts, tech.ts, va.ts
  pages/qa/            QA + development homepage (tech.css), case studies
  pages/va/            VA home, work pages, packages, va.css theme
  styles.css           global design system + QA styles
```

## Editing content

Edit `src/data/tech.ts` (QA + development) and `src/data/va.ts` (creative). VA images live in
`public/va/`; any VA image whose `image` path is empty renders as a labelled placeholder. Only
publish claims that are supported by real work.

## One portfolio per link (private views)

`VITE_PORTFOLIO` decides what a deployment contains:

| Value | Site contains | Root URL |
| --- | --- | --- |
| `all` (default) | Tech and creative portfolios, plus the owner-only view switcher | Tech portfolio |
| `qa` (or `it`) | Tech portfolio (QA + development) and case studies only | Tech portfolio |
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

Local check: `VITE_PORTFOLIO=va npm run build && npm run preview`.

### View switcher (combined site only)

On the `all` build, a floating **Tech | Creative** switcher (bottom-left) jumps between portfolios.
It shows on `localhost` and Vercel preview URLs; on a production domain add `?switcher=on` once
to enable it in your browser (`?switcher=off` to hide). Single-portfolio builds never include it.

## Package subdomains

Each price list can also be shared on its own subdomain of the creative site. The first part
of the hostname picks the page (`src/packageHosts.ts`), so the same deployment serves them:

| Address | Page |
| --- | --- |
| `smm-packages.creative.kenromerogoestdigital.space` | Social media packages, USD |
| `smm-local-packages.creative.kenromerogoestdigital.space` | Social media packages, PHP (local) |
| `podcast-packages.creative.kenromerogoestdigital.space` | Podcast packages and retainer |

Add each address under **Settings → Domains** of the creative Vercel project (`VITE_PORTFOLIO=va`).
"Back to portfolio" and contact buttons on these pages link to the main creative site.

## Notes

- The contact form posts to `api/contact.ts`, a Vercel function that emails each message through [Resend](https://resend.com) from `contact@kenromerogoestdigital.space` to kenromero.digital@gmail.com, with reply-to set to the visitor. Set `RESEND_API_KEY` in Vercel (Project Settings > Environment Variables) and verify the domain in Resend. Optional overrides: `CONTACT_FROM`, `CONTACT_TO`. `npm run dev` does not serve `/api`; use `vercel dev` to test sending locally.

## Scripts

```
npm run dev       # local dev server
npm run build     # typecheck + production build
npm run preview   # serve the production build
```
