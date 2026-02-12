import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Countdown Component
 * 
 * Premium wedding countdown timer showing days, hours, minutes, and seconds
 * until the wedding date.
 * 
 * @param {Object} props
 * @param {string} props.targetDate - Wedding date in ISO format or Date string
 * @param {string} props.title - Countdown title (default: "Counting Down To")
 */

export default function Countdown({ 
  targetDate = '2026-10-15T16:00:00',
  title = 'Counting Down To'
}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date()
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { value: timeLeft.days, label: 'Days', plural: 'Days' },
    { value: timeLeft.hours, label: 'Hour', plural: 'Hours' },
    { value: timeLeft.minutes, label: 'Minute', plural: 'Minutes' },
    { value: timeLeft.seconds, label: 'Second', plural: 'Seconds' },
  ]

  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-background via-surface to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-[0.03]"
          style={{ 
            background: 'radial-gradient(circle, #C65D1E 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-[0.03]"
          style={{ 
            background: 'radial-gradient(circle, #C97A56 0%, transparent 70%)',
            transform: 'translate(50%, -50%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-secondary mb-2">
            {title}
          </p>
          <div className="flex justify-center">
            <div className="h-px w-12 bg-gold rounded-full" />
          </div>
        </motion.div>

        {/* Countdown Units */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {units.map((unit, index) => (
            <CountdownUnit
              key={unit.label}
              value={unit.value}
              label={unit.value === 1 ? unit.label : unit.plural}
              index={index}
            />
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center mt-10 gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold">
            <path
              d="M12 2L15 9L22 9L16.5 14L19 21L12 16L5 21L7.5 14L2 9L9 9L12 2Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

// Individual Countdown Unit Component
function CountdownUnit({ value, label, index }) {
  const [prevValue, setPrevValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true)
      setTimeout(() => {
        setPrevValue(value)
        setIsFlipping(false)
      }, 300)
    }
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className="group"
    >
      <div className="relative">
        {/* Card background */}
        <div 
          className="
            relative bg-background border-2 border-border rounded-2xl
            p-4 sm:p-6 md:p-8
            transition-all duration-300
            hover:border-gold hover:shadow-xl
            group-hover:scale-105
          "
        >
          {/* Inner decorative border */}
          <div 
            className="absolute inset-2 rounded-xl border border-gold/20 pointer-events-none"
          />

          {/* Top corner decoration */}
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold/30" />
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-blush/30" />

          {/* Number */}
          <div className="relative mb-2 sm:mb-3">
            <motion.div
              key={value}
              initial={isFlipping ? { rotateX: -90, opacity: 0 } : false}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <span 
                className="
                  font-bold
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                  bg-gradient-to-br from-gold via-gold to-gold/70
                  bg-clip-text text-transparent
                "
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(198, 93, 30, 0.1)',
                }}
              >
                {String(value).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Subtle glow behind number */}
            <div 
              className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              style={{ backgroundColor: '#C65D1E' }}
            />
          </div>

          {/* Label */}
          <div className="text-center">
            <p className="
              text-xs sm:text-sm md:text-base
              uppercase tracking-[0.2em] text-secondary
              group-hover:text-gold transition-colors duration-300
            ">
              {label}
            </p>
          </div>

          {/* Separator dots (except for last item on desktop) */}
          {index < 3 && (
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <div className="flex flex-col gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
              </div>
            </div>
          )}
        </div>

        {/* Animated accent line */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gold rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: '60%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </motion.div>
  )
}

/**
 * ============================================================================
 * USAGE EXAMPLE
 * ============================================================================
 * 
 * import Countdown from './components/Countdown'
 * 
 * <Countdown 
 *   targetDate="2026-10-15T16:00:00"
 *   title="Counting Down To"
 * />
 * 
 * ============================================================================
 * FEATURES
 * ============================================================================
 * 
 * ✅ Live countdown with seconds precision
 * ✅ Flip animation on number change
 * ✅ Gradient gold numbers with glow effect
 * ✅ Responsive grid (2 cols mobile, 4 cols desktop)
 * ✅ Hover effects on cards
 * ✅ Premium decorative elements
 * ✅ Accessible and semantic HTML
 * ✅ Framer Motion animations
 * ✅ Automatic cleanup on unmount
 * 
 * ============================================================================
 */
