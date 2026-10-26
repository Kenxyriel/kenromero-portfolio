import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Title and description baked into index.html, which is what link previews
// (Messenger, LinkedIn, email) read. Each single-portfolio build gets its own.
const pageMeta = {
  all: {
    title: 'Ken Romero | QA Engineer & Web Developer',
    description:
      'Ken Romero - QA and software development portfolio: manual and automation testing, API testing, and web applications built with React and TypeScript.',
  },
  qa: {
    title: 'Ken Romero | QA Engineer & Web Developer',
    description:
      'Ken Romero - QA and software development portfolio: manual and automation testing, API testing, and web applications built with React and TypeScript.',
  },
  it: {
    title: 'Ken Romero | QA Engineer & Web Developer',
    description:
      'Ken Romero - QA and software development portfolio: manual and automation testing, API testing, and web applications built with React and TypeScript.',
  },
  va: {
    title: 'Ken Romero | Social Media Manager, Podcast Editor & Graphic Designer',
    description:
      'Ken Romero - social media management, podcast editing, graphic design, and content support for small businesses.',
  },
}

// Files in public/ used only by the QA + development portfolio. The VA-only
// build drops them so, for example, the QA case-study PDF is not on that site.
const techOnlyFiles = ['documents', 'case-study-preview', 'icons', 'brand/tech']

// Public pages listed in sitemap.xml. Unlisted package pages are left out on purpose.
const techPages = ['/', '/qa/projects/authentication-testing', '/qa/projects/api-testing', '/qa/projects/saripoint', '/qa/projects/jjj-website', '/qa/projects/salinlibro-cms', '/privacy', '/terms']
const vaPages = ['/va', '/va/design-branding', '/va/social-media-content', '/va/podcast-editing', '/va/privacy', '/va/terms']

// Absolute address of the site, needed for the sitemap and link-preview image.
// On Vercel this is the project's production domain; SITE_URL overrides it.
function siteUrl(portfolio: string) {
  const fromEnv = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (fromEnv) return (fromEnv.startsWith('http') ? fromEnv : `https://${fromEnv}`).replace(/\/$/, '')
  return portfolio === 'va' ? 'https://creative.kenromerogoestdigital.space' : 'https://kenromerogoestdigital.space'
}

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

export default defineConfig(({ mode }) => {
  const portfolio = (loadEnv(mode, '.').VITE_PORTFOLIO || 'all') as keyof typeof pageMeta
  const meta = pageMeta[portfolio] ?? pageMeta.all
  const brand = portfolio === 'va' ? 'creative' : 'tech'
  const site = siteUrl(portfolio)
  const pages = portfolio === 'va' ? vaPages : portfolio === 'all' ? [...techPages, ...vaPages] : techPages

  // Favicon and link-preview tags (Messenger, LinkedIn, Facebook, X, Slack).
  const headTags = `
    <link rel="icon" href="/brand/${brand}/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/brand/${brand}/favicon-32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="/brand/${brand}/apple-touch-icon.png" />
    <meta name="theme-color" content="${brand === 'creative' ? '#f6f1e7' : '#070b16'}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Ken Romero" />
    <meta property="og:url" content="${site}/" />
    <meta property="og:title" content="${escapeAttr(meta.title)}" />
    <meta property="og:description" content="${escapeAttr(meta.description)}" />
    <meta property="og:image" content="${site}/brand/${brand}/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Ken Romero, ${brand === 'creative' ? 'creative portfolio' : 'QA Engineer and Web Developer'}" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>`

  return {
    plugins: [
      react(),
      {
        name: 'portfolio-meta',
        transformIndexHtml: (html) =>
          html
            .replace(/<title>.*<\/title>/, `<title>${meta.title}</title>`)
            .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(meta.description)}$2`)
            .replace('  </head>', headTags.slice(1)),
      },
      {
        name: 'portfolio-public-files',
        apply: 'build',
        writeBundle(options) {
          const dir = options.dir!
          if (portfolio === 'va') {
            for (const file of techOnlyFiles) rmSync(`${dir}/${file}`, { recursive: true, force: true })
          }
          // Browsers ask for /favicon.ico on their own, so serve one at the root.
          writeFileSync(`${dir}/favicon.ico`, readFileSync(`public/brand/${brand}/favicon.ico`))
          writeFileSync(
            `${dir}/sitemap.xml`,
            `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
              .map((path) => `  <url><loc>${site}${path}</loc></url>`)
              .join('\n')}\n</urlset>\n`,
          )
          writeFileSync(`${dir}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`)
        },
      },
    ],
  }
})
