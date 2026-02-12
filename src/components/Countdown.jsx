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
  title = 'Until We Say "I Do"'
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
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-cream/30 via-background to-cream/20 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(198, 93, 30, 0.05) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%) scale(1.5)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              color: '#3E2A24',
              lineHeight: 1.3
            }}
          >
            {title}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-secondary/20" />
            <svg className="w-3 h-3" style={{ color: '#C65D1E' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/20" />
          </div>
        </motion.div>

        {/* Countdown Units */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {units.map((unit, index) => (
            <CountdownUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              index={index}
              isLast={index === units.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Individual Countdown Unit Component
function CountdownUnit({ value, label, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="text-center"
    >
      <div className="relative">
        {/* Number */}
        <motion.div
          key={value}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-2"
        >
          <span 
            className="text-6xl md:text-7xl lg:text-8xl block"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 300,
              color: '#C65D1E',
              letterSpacing: '-0.02em'
            }}
          >
            {String(value).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Label */}
        <p 
          className="text-sm md:text-base tracking-wider"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#5A4A3F',
            fontWeight: 400,
            textTransform: 'lowercase',
            fontStyle: 'italic'
          }}
        >
          {label.toLowerCase()}
        </p>

        {/* Separator */}
        {!isLast && (
          <div 
            className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2"
            style={{ color: '#C65D1E', opacity: 0.3 }}
          >
            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="2" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}
