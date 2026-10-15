import { useState } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import type { Testimonial } from '../data/testimonials'

type TestimonialsCarouselProps = {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMultipleTestimonials = testimonials.length > 1

  const showPrevious = () => {
    setActiveIndex((current) =>
      (current - 1 + testimonials.length) % testimonials.length,
    )
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <div className="testimonials-carousel">
      <div
        className="testimonials-stage"
        aria-label="Client testimonials"
        aria-roledescription="carousel"
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex
          const isPrevious =
            index ===
            (activeIndex - 1 + testimonials.length) % testimonials.length
          const position = isActive
            ? 'active'
            : isPrevious
              ? 'previous'
              : 'next'

          return (
            <article
              className={`testimonial-card testimonial-card-${position}`}
              key={testimonial.id}
              aria-hidden={!isActive}
              aria-label={`${testimonial.name}, ${index + 1} of ${testimonials.length}`}
            >
              <div className="testimonial-avatar" aria-hidden="true">
                {testimonial.name
                  .split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div className="testimonial-stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, starIndex) => {
                  const filledPercentage = Math.max(
                    0,
                    Math.min(100, (testimonial.rating - starIndex) * 100),
                  )

                  return (
                    <span className="testimonial-star" key={starIndex}>
                      <Star size={18} className="testimonial-star-empty" />
                      <span
                        className="testimonial-star-fill"
                        style={{ width: `${filledPercentage}%` }}
                      >
                        <Star size={18} className="testimonial-star-filled" />
                      </span>
                    </span>
                  )
                })}
              </div>
              <h3>{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
              <blockquote>{testimonial.quote}</blockquote>
            </article>
          )
        })}
      </div>

      {hasMultipleTestimonials && (
        <div className="testimonials-controls">
          <button
            className="testimonial-arrow"
            type="button"
            onClick={showPrevious}
            aria-label="Show previous testimonial"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <div className="testimonial-pagination" aria-label="Choose a testimonial">
            {testimonials.map((testimonial, index) => (
              <button
                className={`testimonial-dot${index === activeIndex ? ' is-active' : ''}`}
                type="button"
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            className="testimonial-arrow"
            type="button"
            onClick={showNext}
            aria-label="Show next testimonial"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
