import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'

/**
 * Hero Component - Premium, Playful & Made with Love
 */

// Default content
const defaultContent = {
  names: 'Keval & Drashti',
  subtitle: "We're getting married!",
  date: 'October 15, 2026',
  location: 'The Grand Estate, Napa Valley',
  initials: 'K&D',
  cta: {
    primary: { text: 'RSVP Now', href: '#rsvp' },
    secondary: { text: 'Our Story', href: '#story' },
  },
}

// Cute Animated Love Birds
function LoveBirds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Left Bird */}
      <motion.div
        className="absolute top-[20%] left-[8%] text-3xl md:text-4xl"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
      >
        <motion.span
          className="inline-block"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🕊️
        </motion.span>
      </motion.div>
      
      {/* Right Bird */}
      <motion.div
        className="absolute top-[25%] right-[8%] text-3xl md:text-4xl"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 1, ease: 'easeOut' }}
      >
        <motion.span
          className="inline-block scale-x-[-1]"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          🕊️
        </motion.span>
      </motion.div>
    </div>
  )
}

// Playful Floating Hearts with varying sizes and paths
function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 6,
    size: 0.6 + Math.random() * 1,
    type: Math.random() > 0.5 ? '♥' : '💕',
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-blush/25"
          style={{
            left: heart.left,
            fontSize: `${heart.size}rem`,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            opacity: [0, 0.4, 0.6, 0.4, 0],
            x: [0, 20, -20, 30, 0],
            rotate: [0, 15, -15, 20, 0],
            scale: [0.8, 1.1, 1, 1.1, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {heart.type}
        </motion.div>
      ))}
    </div>
  )
}

// Magical Sparkles with different colors
function MagicalSparkles() {
  const sparkles = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    color: Math.random() > 0.5 ? 'bg-gold/50' : 'bg-blush/50',
    size: Math.random() > 0.7 ? 'w-1.5 h-1.5' : 'w-1 h-1',
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className={`absolute ${sparkle.size} ${sparkle.color} rounded-full`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  )
}

// Animated Heart Connection Line between names
function HeartConnection({ names }) {
  const [name1, name2] = names.split('&').map(n => n.trim())
  
  return (
    <div className="relative inline-flex items-center justify-center gap-2 md:gap-4">
      {/* First Name */}
      <motion.span
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {name1}
      </motion.span>
      
      {/* Animated Heart Connector */}
      <motion.span
        className="relative mx-1 md:mx-3"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'backOut' }}
      >
        <motion.span
          className="text-3xl md:text-5xl lg:text-6xl text-blush inline-block"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.span>
        {/* Pulse Ring */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <span className="text-3xl md:text-5xl lg:text-6xl text-blush/30">♥</span>
        </motion.span>
      </motion.span>
      
      {/* Second Name */}
      <motion.span
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {name2}
      </motion.span>
    </div>
  )
}

// Elegant Animated Divider
function AnimatedDivider() {
  return (
    <motion.div 
      className="flex items-center justify-center gap-3 my-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <motion.div 
        className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/50"
        initial={{ width: 0 }}
        animate={{ width: '5rem' }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.span
        className="text-gold/60 text-sm"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        ✦
      </motion.span>
      <motion.span
        className="text-blush/60 text-xs"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ♥
      </motion.span>
      <motion.span
        className="text-gold/60 text-sm"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        ✦
      </motion.span>
      <motion.div 
        className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/50"
        initial={{ width: 0 }}
        animate={{ width: '5rem' }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </motion.div>
  )
}

// Save the Date Badge
function SaveTheDateBadge({ date }) {
  return (
    <motion.div
      className="inline-flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <motion.div
        className="relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-gold/10 via-blush/10 to-gold/10 rounded-full border border-gold/20 backdrop-blur-sm"
        whileHover={{ scale: 1.05, borderColor: 'rgba(212, 175, 55, 0.4)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-background text-[10px] md:text-xs text-gold/80 uppercase tracking-widest font-medium"
        >
          Save the Date
        </motion.span>
        <motion.span
          className="font-heading text-xl md:text-2xl lg:text-3xl text-gold font-semibold"
          animate={{
            textShadow: [
              '0 0 0px rgba(212, 175, 55, 0)',
              '0 0 15px rgba(212, 175, 55, 0.3)',
              '0 0 0px rgba(212, 175, 55, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {date}
        </motion.span>
        {/* Decorative corners */}
        <span className="absolute top-0 left-2 text-gold/30 text-xs">✧</span>
        <span className="absolute top-0 right-2 text-gold/30 text-xs">✧</span>
        <span className="absolute bottom-0 left-2 text-gold/30 text-xs">✧</span>
        <span className="absolute bottom-0 right-2 text-gold/30 text-xs">✧</span>
      </motion.div>
    </motion.div>
  )
}

// Decorative floral/ornament SVG
function DecorativeOrnament({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 120 20"
      className={`w-24 h-4 text-gold/40 ${className}`}
      aria-hidden="true"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.path
        d="M0 10 L40 10 M80 10 L120 10"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.circle 
        cx="60" 
        cy="10" 
        r="3" 
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: 'backOut' }}
      />
      <motion.circle 
        cx="50" 
        cy="10" 
        r="1.5" 
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, duration: 0.3, ease: 'backOut' }}
      />
      <motion.circle 
        cx="70" 
        cy="10" 
        r="1.5" 
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, duration: 0.3, ease: 'backOut' }}
      />
    </motion.svg>
  )
}

export default function Hero({ content = {} }) {
  const heroContent = { ...defaultContent, ...content }
  const { names, subtitle, date, location, cta } = heroContent
  
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const backgroundY = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, 150]
  )
  const contentY = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, 50]
  )
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // Trigger animation on mount
  useEffect(() => {
    setHasAnimated(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      },
    },
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: prefersReducedMotion ? 0 : -3,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: prefersReducedMotion ? 1 : 0.98,
    },
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Decorative background element with breathing animation */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blush/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Floating Hearts */}
      <FloatingHearts />
      
      {/* Magical Sparkles */}
      <MagicalSparkles />
      
      {/* Love Birds */}
      <LoveBirds />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? 'visible' : 'hidden'}
        >
          {/* Playful Subtitle with emoji */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <motion.p
              className="font-body text-lg md:text-xl text-secondary tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="inline-block mr-2"
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                💍
              </motion.span>
              {subtitle}
              <motion.span
                className="inline-block ml-2"
                animate={{ rotate: [0, -14, 8, -14, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                💍
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Main Heading - Couple Names with Heart */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 leading-tight"
          >
            <HeartConnection names={names} />
          </motion.h1>

          {/* Animated Divider */}
          <AnimatedDivider />

          {/* Save the Date Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <SaveTheDateBadge date={date} />
          </motion.div>

          {/* Location with playful animation */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <motion.p
              className="font-body text-base md:text-lg text-secondary inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blush/5 border border-blush/10"
              whileHover={{ scale: 1.02, borderColor: 'rgba(232, 180, 184, 0.3)' }}
            >
              <motion.span
                animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                📍
              </motion.span>
              <span>{location}</span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* Primary CTA - RSVP */}
            <motion.a
              href={cta.primary.href}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="
                relative overflow-hidden
                inline-flex items-center justify-center
                px-8 py-4 min-w-[200px]
                bg-gradient-to-r from-gold to-gold/90 text-background
                font-body font-semibold text-base tracking-wide
                rounded-full shadow-lg shadow-gold/25
                hover:shadow-xl hover:shadow-gold/35
                focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background
                transition-all duration-300
                group
              "
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                >
                  💌
                </motion.span>
                {cta.primary.text}
              </span>
            </motion.a>

            {/* Secondary CTA - Our Story */}
            <motion.a
              href={cta.secondary.href}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="
                relative
                inline-flex items-center justify-center
                px-8 py-4 min-w-[200px]
                bg-transparent text-primary
                border-2 border-blush/40
                font-body font-semibold text-base tracking-wide
                rounded-full
                hover:border-blush hover:bg-blush/5
                focus:outline-none focus:ring-2 focus:ring-blush focus:ring-offset-2 focus:ring-offset-background
                transition-all duration-300
                group
              "
            >
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ✨
                </motion.span>
                {cta.secondary.text}
                <motion.span
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
                >
                  ✨
                </motion.span>
              </span>
            </motion.a>
          </motion.div>

          {/* Cute footer message */}
          <motion.p
            variants={itemVariants}
            className="mt-12 text-sm text-secondary/60 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.span
              className="inline-flex items-center gap-1"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Made with <span className="text-blush">♥</span> for our special day
            </motion.span>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Playful Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.span
          className="text-xs text-secondary/50 font-body tracking-widest uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-6 h-10 border-2 border-blush/30 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-3 bg-gradient-to-b from-gold to-blush rounded-full"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

/**
 * USAGE EXAMPLE:
 * 
 * import Hero from './components/Hero'
 * 
 * const heroContent = {
 *   names: 'Emily & Michael',
 *   subtitle: 'Together forever',
 *   date: 'June 20, 2026',
 *   location: 'Château de Versailles, France',
 *   initials: 'E&M',
 *   cta: {
 *     primary: { text: 'RSVP', href: '#rsvp' },
 *     secondary: { text: 'Our Story', href: '#story' },
 *   },
 * }
 * 
 * <Hero content={heroContent} />
 */
