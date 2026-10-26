import { useEffect } from 'react'

// Wide tables and step rows on the case studies scroll sideways on phones.
// While more content sits off to the right, the box gets data-scroll-more,
// which fades its right edge (see styles.css) so visitors know to swipe.
const SCROLLERS = '.lockout-table-wrapper, .qa-table-wrapper, .api-table-scroll, .defect-lifecycle, .api-lifecycle'

export default function useScrollHints() {
  useEffect(() => {
    const boxes = Array.from(document.querySelectorAll<HTMLElement>(SCROLLERS))
    const update = (box: HTMLElement) => {
      const more = box.scrollWidth - box.clientWidth - box.scrollLeft > 4
      box.toggleAttribute('data-scroll-more', more)
    }
    const onScroll = (event: Event) => update(event.currentTarget as HTMLElement)
    const observer = new ResizeObserver((entries) => entries.forEach((entry) => update(entry.target as HTMLElement)))

    boxes.forEach((box) => {
      update(box)
      box.addEventListener('scroll', onScroll, { passive: true })
      observer.observe(box)
    })
    return () => {
      observer.disconnect()
      boxes.forEach((box) => box.removeEventListener('scroll', onScroll))
    }
  }, [])
}
