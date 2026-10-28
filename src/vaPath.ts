// The creative-only build (VITE_PORTFOLIO=va) serves its pages from the root of
// its own domain: /design-branding, /privacy. The combined build keeps them
// under /va so they don't clash with the tech pages.
export const VA_AT_ROOT = import.meta.env.VITE_PORTFOLIO === 'va'
export const VA_BASE = VA_AT_ROOT ? '' : '/va'

/** A creative-portfolio link, written as "/va/..." and served at the right place. */
export function vaPath(path: string): string {
  const rest = path.replace(/^\/va(?=[/#?]|$)/, '')
  if (VA_BASE) return VA_BASE + rest
  return rest.startsWith('/') ? rest : `/${rest}`
}
