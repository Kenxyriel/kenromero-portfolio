export type Testimonial = {
  id: string
  name: string
  role: string
  rating: number
  quote: string
  // One line from the quote, shown large as a pull quote. Must appear word for word in `quote`.
  highlight?: string
}

// Client testimonials, kept in their original wording.
export const testimonials: Testimonial[] = [
  {
    id: 'jeffrey-james-jacinto',
    name: 'Jeffrey James',
    role: 'Business Owner, Founder of JJJ Accounting and Tax Services',
    rating: 5,
    highlight: 'took the time to understand requirements before delivering his work',
    quote: 'Ken consistently showed initiative, professionalism, and strong attention to detail throughout our work together. He approached tasks thoughtfully, communicated clearly, and took the time to understand requirements before delivering his work. His organized approach, reliability, and willingness to improve made the overall experience smooth and efficient. He consistently delivered quality work and was someone I could trust to handle tasks with care and accountability.Job well done, Ken.',
  },
  {
    id: 'bethany',
    name: 'Bethany',
    role: 'Business Owner',
    rating: 4.5,
    highlight: 'everything was handled with care, precision, and attention to detail',
    quote: [
      'Ken was absolutely amazing to work with. He is incredibly professional, kind, and clearly takes so much pride in his work.',
      'From start to finish, everything was handled with care, precision, and attention to detail.',
      'His expertise and calm presence made the entire experience seamless, and the quality of his work truly exceeded our expectations.',
      'We are beyond thankful for everything he did and would highly recommend him to anyone looking for someone they can trust to do an outstanding job.',
      'Thank you, Ken. We are so grateful.',
    ].join(' '),
  },
]
