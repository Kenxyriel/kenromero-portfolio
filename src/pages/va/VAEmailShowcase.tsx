import { Maximize2 } from 'lucide-react'
import type { VAImage } from '../../data/va'
import { useLightbox } from './VALayout'
import { imageProps } from '../../components/responsiveImage'

// Email designs are long, so each card is a window onto the top of the email
// that scrolls to the footer on hover or focus. Clicking opens the full email
// in the viewer, where it scrolls at reading size.
export default function VAEmailShowcase({ items }: { items: VAImage[] }) {
  const open = useLightbox()

  return (
    <ul className="va-email-grid">
      {items.map((item) => {
        const name = `${item.brand} · ${item.label}`
        return (
          <li key={item.image}>
            <button className="va-email-card" type="button" aria-label={`View ${name} full size`} onClick={() => open({ ...item, label: name })}>
              <span className="va-email-window">
                <img {...imageProps(item.image, '(max-width: 760px) 45vw, 280px')} alt="" loading="lazy" />
                <span className="va-email-zoom" aria-hidden="true">
                  <Maximize2 size={16} />
                </span>
              </span>
              <span className="va-email-meta">
                <strong>{item.brand}</strong>
                <span>{item.label}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
