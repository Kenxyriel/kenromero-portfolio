import { rmSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Title and description baked into index.html, which is what link previews
// (Messenger, LinkedIn, email) read. Each single-portfolio build gets its own.
const pageMeta = {
  all: {
    title: 'Ken Romero | QA / Application System Engineer',
    description: 'Ken Romero - QA / Application System Engineer portfolio.',
  },
  qa: {
    title: 'Ken Romero | QA / Application System Engineer',
    description: 'Ken Romero - QA / Application System Engineer portfolio.',
  },
  it: {
    title: 'Ken Romero | Software Development Portfolio',
    description: 'Ken Romero - IT professional and developer building web applications with React and TypeScript.',
  },
  va: {
    title: 'Ken Romero | Social Media Manager, Podcast Editor & Graphic Designer',
    description:
      'Ken Romero - social media management, podcast editing, graphic design, and content support for small businesses.',
  },
}

// Files in public/ that belong to one portfolio. Single-portfolio builds drop
// the others so, for example, the QA case-study PDF is not on the VA site.
const publicFiles = {
  qa: ['documents', 'case-study-preview', 'icons'],
  it: [] as string[],
  va: [] as string[],
}

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
          if (portfolio === 'all') return
          for (const [audience, files] of Object.entries(publicFiles)) {
            if (audience === portfolio) continue
            for (const file of files) rmSync(`${options.dir}/${file}`, { recursive: true, force: true })
          }
        },
      },
    ],
  }
})
