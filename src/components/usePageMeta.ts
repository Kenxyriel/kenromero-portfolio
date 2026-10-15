import { useEffect } from 'react'

// Gives each audience route its own browser title and description, since all
// routes share a single index.html.
export default function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
  }, [title, description])
}
