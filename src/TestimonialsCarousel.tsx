import { useState } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'

const testimonials = [
  {
    id: 'jeffrey-james-jacinto',
    name: 'Jeffrey James',
    role: 'Business Owner, Founder of JJJ Accounting and Tax Services',
    quote: 'Ken consistently showed initiative, professionalism, and strong attention to detail throughout our work together. He approached tasks thoughtfully, communicated clearly, and took the time to understand requirements before delivering his work.His organized approach, reliability, and willingness to improve made the overall experience smooth and efficient. He consistently delivered quality work and was someone I could trust to handle tasks with care and accountability.Job well done, Ken.',
  },
  {
    id: 'bethany',
    name: 'Bethany',
    role: 'Business Owner',
    quote: [
      'Ken was absolutely amazing to work with. He is incredibly professional, kind, and clearly takes so much pride in his work.',
      'From start to finish, everything was handled with care, precision, and attention to detail.',
      'His expertise and calm presence made the entire experience seamless, and the quality of his work truly exceeded our expectations.',
      'We are beyond thankful for everything he did and would highly recommend him to anyone looking for someone they can trust to do an outstanding job.',
      'Thank you, Ken. We are so grateful.',
    ].join(' '),
  },
]

export default function TestimonialsCarousel() {
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
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star key={starIndex} size={18} />
                ))}
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
