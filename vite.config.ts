import { rmSync } from 'node:fs'
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
const techOnlyFiles = ['documents', 'case-study-preview', 'icons']

export default defineConfig(({ mode }) => {
  const portfolio = (loadEnv(mode, '.').VITE_PORTFOLIO || 'all') as keyof typeof pageMeta
  const meta = pageMeta[portfolio] ?? pageMeta.all

  return {
    plugins: [
      react(),
      {
        name: 'portfolio-meta',
        transformIndexHtml: (html) =>
          html
            .replace(/<title>.*<\/title>/, `<title>${meta.title}</title>`)
            .replace(/(<meta name="description" content=")[^"]*(")/, `$1${meta.description}$2`),
      },
      {
        name: 'portfolio-public-files',
        apply: 'build',
        writeBundle(options) {
          if (portfolio !== 'va') return
          for (const file of techOnlyFiles) rmSync(`${options.dir}/${file}`, { recursive: true, force: true })
        },
      },
    ],
  }
})
