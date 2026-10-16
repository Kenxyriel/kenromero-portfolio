// Package price lists are shared by link, each on its own subdomain of the
// creative site, e.g. smm-packages.creative.kenromerogoestdigital.space.
// The first label of the hostname picks the page shown at that address.

export type PackagePage = 'smm-usd' | 'smm-php' | 'podcast'

const pagesBySubdomain: Record<string, PackagePage> = {
  'smm-packages': 'smm-usd',
  'smm-local-packages': 'smm-php',
  'podcast-packages': 'podcast',
}

export function packagePageForHost(hostname = window.location.hostname): PackagePage | null {
  return pagesBySubdomain[hostname.split('.')[0]] ?? null
}

// A link into the creative portfolio. On a package subdomain it points at the
// parent domain (the portfolio itself), so visitors leave the price list.
export function portfolioUrl(path: string): string {
  const { protocol, hostname, port } = window.location
  if (!packagePageForHost(hostname)) return path
  const parent = hostname.split('.').slice(1).join('.')
  return `${protocol}//${parent}${port ? `:${port}` : ''}${path}`
}
