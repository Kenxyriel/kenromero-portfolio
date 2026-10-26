import imageSizes from '../data/imageSizes.json'

const sizesByPath: Record<string, number[]> = imageSizes

// Folders and files that also ship a small copy (scripts/optimize-images.mjs).
const smallCopies: [prefix: string, width: number][] = [
  ['/va/work/', 480],
  ['/va/services/', 480],
  ['/ken-romero.webp', 640],
  ['/ken-romero-hero.webp', 640],
]

/**
 * Props for an <img> from public/: its real width and height, so the page keeps
 * the space before it loads, plus a smaller copy for cards when one exists.
 * `sizes` is how wide the image shows, e.g. "(max-width: 760px) 45vw, 240px".
 */
export function imageProps(src: string | undefined, sizes?: string) {
  const size = src ? sizesByPath[src] : undefined
  const props: { src?: string; width?: number; height?: number; srcSet?: string; sizes?: string } = { src }
  if (!src || !size) return props
  props.width = size[0]
  props.height = size[1]

  const copy = smallCopies.find(([prefix]) => src.startsWith(prefix))
  if (copy && sizes && size[0] > copy[1]) {
    props.srcSet = `${src.replace(/\.webp$/, `-${copy[1]}.webp`)} ${copy[1]}w, ${src} ${size[0]}w`
    props.sizes = sizes
  }
  return props
}
