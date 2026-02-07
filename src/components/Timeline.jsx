import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * Timeline Component
 * 
 * Features:
 * - Horizontal timeline on desktop with center line
 * - Vertical stacked cards on mobile
 * - Staggered reveal animations
 * - Swipe-friendly on mobile
 * - Handwritten signature SVG on special card
 * - Accessible with ARIA labels
 * 
 * @param {Object} props
 * @param {Array} props.timeline - Array of timeline events
 * @param {string} props.timeline[].date - Event date
 * @param {string} props.timeline[].title - Event title
 * @param {string} props.timeline[].description - Event description
 * @param {boolean} props.timeline[].featured - If true, shows signature
 */

// Default timeline data
const defaultTimeline = [
  {
    id: 1,
    date: 'Summer 2020',
    title: 'First Meeting',
    description: 'We met at a mutual friend\'s beach party. The sunset was beautiful, but not as beautiful as that first smile.',
    featured: false,
  },
  {
    id: 2,
    date: 'December 2020',
    title: 'First Date',
    description: 'Coffee turned into dinner, dinner turned into a walk under the stars. We talked until 3 AM.',
    featured: false,
  },
  {
    id: 3,
    date: 'Valentine\'s Day 2021',
    title: 'Official',
    description: 'Made it official on the most romantic day of the year. Best decision ever.',
    featured: true, // This card will have the signature
  },
  {
    id: 4,
    date: 'June 2025',
    title: 'The Proposal',
    description: 'On a mountaintop at sunrise, with the world at our feet, I asked the most important question of my life.',
    featured: false,
  },
  {
    id: 5,
    date: 'October 2026',
    title: 'Our Wedding Day',
    description: 'The beginning of our forever, surrounded by the people we love most.',
    featured: false,
  },
]

// Handwritten signature SVG component
function SignatureSVG({ className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: prefersReducedMotion ? 0 : 1.5, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
      },
    },
  }

  return (
    <motion.svg
      viewBox="0 0 120 40"
      className={`${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="Handwritten signature"
    >
      {/* Handwritten "Love" */}
      <motion.path
        d="M10 25 Q15 15, 20 20 T30 25 Q35 30, 40 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-gold"
        variants={pathVariants}
      />
      {/* Heart */}
      <motion.path
        d="M50 22 C50 18, 45 15, 42 18 C39 21, 42 25, 50 30 C58 25, 61 21, 58 18 C55 15, 50 18, 50 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-blush"
        variants={pathVariants}
      />
      {/* More script text */}
      <motion.path
        d="M65 25 Q70 20, 75 25 Q80 30, 85 25 Q90 20, 95 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-gold"
        variants={pathVariants}
      />
    </motion.svg>
  )
}

// Timeline Card Component
function TimelineCard({ event, index, isLast }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  // Staggered animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50,
      scale: prefersReducedMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative flex-shrink-0 w-full md:w-80 lg:w-96"
      aria-label={`Timeline event: ${event.title}`}
    >
      {/* Card */}
      <div
        className={`
          relative bg-surface border-2 border-border rounded-2xl p-6 md:p-8
          shadow-md hover:shadow-lg hover:border-blush/50
          transition-all duration-300
          ${event.featured ? 'ring-2 ring-gold/20' : ''}
        `}
      >
        {/* Featured badge */}
        {event.featured && (
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-md">
            <span className="text-background text-lg" aria-label="Featured event">
              ★
            </span>
          </div>
        )}

        {/* Date */}
        <time
          className="inline-block px-3 py-1 bg-blush/20 text-gold font-body font-semibold text-sm rounded-full mb-4"
          dateTime={event.date}
        >
          {event.date}
        </time>

        {/* Title */}
        <h3 className="font-heading text-2xl font-bold text-primary mb-3">
          {event.title}
        </h3>

        {/* Description */}
        <p className="font-body text-base text-secondary leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Signature on featured card */}
        {event.featured && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <SignatureSVG className="w-28 h-10 opacity-60" />
          </div>
        )}
      </div>

      {/* Connector dot for desktop */}
      <div className="hidden md:block absolute -bottom-16 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.3 }}
          className={`
            w-4 h-4 rounded-full border-4 border-background
            ${event.featured ? 'bg-gold' : 'bg-blush'}
          `}
          aria-hidden="true"
        />
      </div>
    </motion.article>
  )
}

// Main Timeline Component
export default function Timeline({ timeline = defaultTimeline, title = 'Our Journey' }) {
  const timelineRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={timelineRef}
      className="relative py-16 md:py-24 bg-background overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="timeline-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            {title}
          </h2>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-gold rounded-full" />
          </div>
        </motion.div>

        {/* Desktop: Horizontal scrollable timeline */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blush/40 to-transparent"
            aria-hidden="true"
          />

          {/* Timeline cards */}
          <div
            className="flex gap-8 overflow-x-auto pb-24 pt-8 px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            role="list"
          >
            {timeline.map((event, index) => (
              <div key={event.id} className="snap-center" role="listitem">
                <TimelineCard
                  event={event}
                  index={index}
                  isLast={index === timeline.length - 1}
                />
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-8">
            <motion.div
              animate={prefersReducedMotion ? {} : { x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-secondary font-body text-sm flex items-center gap-2"
            >
              <span>Scroll to explore</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Mobile: Vertical stacked cards */}
        <div className="md:hidden space-y-8" role="list">
          {timeline.map((event, index) => (
            <div key={event.id} role="listitem">
              <TimelineCard event={event} index={index} isLast={index === timeline.length - 1} />
              
              {/* Connector line for mobile */}
              {index < timeline.length - 1 && (
                <div className="flex justify-center my-4" aria-hidden="true">
                  <div className="w-0.5 h-8 bg-blush/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

/**
 * ============================================================================
 * UNIT TEST CHECKLIST
 * ============================================================================
 * 
 * □ Reveal Order Tests:
 *   □ Cards animate in sequence (index * 0.15s delay)
 *   □ First card starts after 0s delay
 *   □ Each subsequent card delays by 0.15s
 *   □ Connector dots appear 0.3s after card
 *   □ Signature SVG draws on featured card when in view
 * 
 * □ Accessibility Tests:
 *   □ Section has aria-labelledby="timeline-heading"
 *   □ Each card has aria-label with event title
 *   □ time element has valid dateTime attribute
 *   □ Timeline has role="list"
 *   □ Each card has role="listitem"
 *   □ Featured badge has aria-label="Featured event"
 *   □ Signature SVG has aria-label
 *   □ Decorative elements have aria-hidden="true"
 * 
 * □ Responsive Tests:
 *   □ Desktop shows horizontal scrollable timeline
 *   □ Mobile shows vertical stacked cards
 *   □ Horizontal scroll works with snap points
 *   □ Touch swipe works on mobile
 *   □ Cards are 320px on mobile (w-full)
 *   □ Cards are 320-384px on desktop (md:w-80 lg:w-96)
 * 
 * □ Animation Tests:
 *   □ prefersReducedMotion disables all motion
 *   □ Cards fade in with scale and translate
 *   □ Hover state increases shadow
 *   □ Featured card has ring effect
 *   □ Scroll hint arrow animates
 * 
 * □ Content Tests:
 *   □ Accepts custom timeline array
 *   □ Accepts custom title prop
 *   □ Falls back to defaultTimeline if no data
 *   □ Featured card shows signature SVG
 *   □ Non-featured cards don't show signature
 *   □ Date formatting is correct
 * 
 * ============================================================================
 */

/**
 * SAMPLE USAGE:
 * 
 * import Timeline from './components/Timeline'
 * 
 * const ourStory = [
 *   {
 *     id: 1,
 *     date: 'May 2019',
 *     title: 'The Beginning',
 *     description: 'Our paths crossed at a coffee shop...',
 *     featured: false,
 *   },
 *   {
 *     id: 2,
 *     date: 'Christmas 2020',
 *     title: 'Became Official',
 *     description: 'Under the mistletoe, we knew...',
 *     featured: true,
 *   },
 *   {
 *     id: 3,
 *     date: 'July 2025',
 *     title: 'The Question',
 *     description: 'On a beach at sunset...',
 *     featured: false,
 *   },
 * ]
 * 
 * <Timeline timeline={ourStory} title="How We Met" />
 * 
 * 
 * CSS CLASSES USED:
 * - Layout: flex, grid, space-y-*, gap-*
 * - Responsive: md:block, md:w-80, lg:w-96
 * - Colors: bg-background, bg-surface, text-primary, text-secondary
 * - Effects: shadow-md, hover:shadow-lg, rounded-2xl
 * - Animations: transition-all, duration-300
 * - Scroll: overflow-x-auto, snap-x, snap-center, scroll-smooth
 * - Custom: scrollbar-hide (defined in <style> tag)
 */
