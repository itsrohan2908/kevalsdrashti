import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/**
 * GrahShantiOverlay — Premium animated divine experience
 * Sacred Kalash line-drawing with ripples, incense smoke, and swastik symbol
 * Theme: Peace, purification, positive energy
 */

// ── Floating Incense Smoke ───────────────────────────────────────────
function IncenseSmoke({ delay, x }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, bottom: '30%' }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.15, 0.25, 0.15, 0],
        y: [0, -50, -120, -200, -300],
        x: [0, 8, -6, 10, -4],
        scale: [0.8, 1, 1.3, 1.6, 2],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      <svg width="16" height="30" viewBox="0 0 16 30" fill="none">
        <path
          d="M8 30 Q4 22 8 16 Q12 10 8 4 Q6 0 8 0"
          stroke="#C9A85B"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  )
}

// ── Glowing Particle ─────────────────────────────────────────────────
function GlowParticle({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: '3px',
        height: '3px',
        backgroundColor: '#C9A85B',
        boxShadow: '0 0 6px rgba(201,168,91,0.4)',
        ...style,
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.6, 0.4, 0],
        y: [0, -80, -170, -260],
        x: [0, 6, -4, 8],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// ── Ripple Wave ──────────────────────────────────────────────────────
function RippleWave({ delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #C9A85B',
      }}
      initial={{ width: 0, height: 0, opacity: 0.3 }}
      animate={{
        width: [0, 200, 400],
        height: [0, 200, 400],
        opacity: [0.2, 0.08, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// ── Swastik Symbol ───────────────────────────────────────────────────
function SwastikSymbol() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ marginTop: '-80px' }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: [0, 0.3, 0.3, 0], scale: [0.7, 1, 1, 1.05] }}
      transition={{ duration: 3.5, delay: 2.0, ease: 'easeInOut' }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        {/* Swastik — minimal line art */}
        <g stroke="#C9A85B" strokeWidth="1.2" strokeLinecap="round" fill="none"
          style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,91,0.25))' }}
        >
          {/* Center cross */}
          <line x1="18" y1="6" x2="18" y2="30" />
          <line x1="6" y1="18" x2="30" y2="18" />
          {/* Arms */}
          <line x1="18" y1="6" x2="26" y2="6" />
          <line x1="30" y1="18" x2="30" y2="10" />
          <line x1="18" y1="30" x2="10" y2="30" />
          <line x1="6" y1="18" x2="6" y2="26" />
          {/* Corner dots */}
          <circle cx="10" cy="10" r="0.8" fill="#C9A85B" />
          <circle cx="26" cy="10" r="0.8" fill="#C9A85B" />
          <circle cx="10" cy="26" r="0.8" fill="#C9A85B" />
          <circle cx="26" cy="26" r="0.8" fill="#C9A85B" />
        </g>
      </svg>
    </motion.div>
  )
}

// ── Sacred Kalash SVG (line-drawing animation) ───────────────────────
function KalashSVG({ onComplete }) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.kalash-path')
    const glowPaths = glowRef.current?.querySelectorAll('.kalash-glow')

    // Hide all paths initially
    paths.forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      })
    })

    if (glowPaths) {
      glowPaths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        })
      })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Glow after drawing
        if (glowPaths) {
          glowPaths.forEach((glow, i) => {
            gsap.to(glow, {
              strokeDashoffset: 0,
              opacity: 0.35,
              duration: 0.8,
              delay: i * 0.12,
              ease: 'power2.out',
            })
          })
        }
        setTimeout(() => onComplete?.(), 900)
      },
    })

    // Phase 1: Pot body (main vessel)
    tl.to(paths[0], {
      strokeDashoffset: 0,
      duration: 1.3,
      ease: 'power2.inOut',
    })

    // Phase 2: Pot neck & rim
    tl.to(
      paths[1],
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '-=0.3'
    )

    // Phase 3: Water line decoration
    tl.to(
      paths[2],
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.15'
    )

    // Phase 4: Mango leaves (one by one feel)
    tl.to(
      paths[3],
      {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power2.inOut',
      },
      '-=0.1'
    )

    // Phase 5: Coconut on top
    tl.to(
      paths[4],
      {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
      },
      '-=0.2'
    )

    // Phase 6: Base / pedestal
    tl.to(
      paths[5],
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.15'
    )

    return () => tl.kill()
  }, [onComplete])

  const pathStyle = {
    fill: 'none',
    stroke: '#C9A85B',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  const glowStyle = {
    fill: 'none',
    stroke: '#C9A85B',
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    filter: 'url(#kalash-glow)',
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 180 200"
        className="w-40 h-56 md:w-48 md:h-64"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="kalash-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer */}
        <g ref={glowRef} opacity="0.25">
          <path
            className="kalash-glow"
            style={glowStyle}
            d="M62,175 C56,160 44,140 42,118 C40,100 46,88 58,80 C66,75 78,72 90,72 C102,72 114,75 122,80 C134,88 140,100 138,118 C136,140 124,160 118,175"
          />
          <path
            className="kalash-glow"
            style={glowStyle}
            d="M90,55 C78,42 66,35 56,22 M90,55 C102,42 114,35 124,22"
          />
        </g>

        {/* Path 0: Pot body — wide belly traditional lota shape */}
        <path
          className="kalash-path"
          style={pathStyle}
          d="M62,175 C56,165 46,148 43,128
             C40,108 44,94 52,85
             C58,78 72,73 90,73
             C108,73 122,78 128,85
             C136,94 140,108 137,128
             C134,148 124,165 118,175
             M43,128 C43,135 45,142 48,148
             M137,128 C137,135 135,142 132,148"
        />

        {/* Path 1: Neck — narrowing with flared rim & lip */}
        <path
          className="kalash-path"
          style={pathStyle}
          d="M78,73 C78,68 76,64 75,61
             C74,58 74,56 76,54
             M102,73 C102,68 104,64 105,61
             C106,58 106,56 104,54
             M76,54 C76,52 80,50 90,50
             C100,50 104,52 104,54
             M72,58 C72,56 78,54 90,54
             C102,54 108,56 108,58
             M72,58 C72,60 78,62 90,62
             C102,62 108,60 108,58"
        />

        {/* Path 2: Decorative bands on pot belly */}
        <path
          className="kalash-path"
          style={pathStyle}
          d="M50,110 C62,106 76,104 90,104
             C104,104 118,106 130,110
             M48,118 C60,122 75,124 90,124
             C105,124 120,122 132,118
             M52,135 C64,131 76,130 90,130
             C104,130 116,131 128,135
             M56,142 C68,146 78,147 90,147
             C102,147 112,146 124,142"
        />

        {/* Path 3: Mango leaves — 7 leaves fanning from rim */}
        <path
          className="kalash-path"
          style={pathStyle}
          d="M90,50 C80,40 68,34 56,22
             C58,26 62,32 68,36
             M90,50 C78,42 64,40 50,40
             C56,41 64,43 72,46
             M90,50 C82,40 78,32 80,20
             C81,26 83,34 86,40
             M90,50 C100,40 112,34 124,22
             C122,26 118,32 112,36
             M90,50 C102,42 116,40 130,40
             C124,41 116,43 108,46
             M90,50 C98,40 102,32 100,20
             C99,26 97,34 94,40
             M90,50 C90,40 90,30 90,18
             C90,24 90,32 90,40"
        />

        {/* Path 4: Coconut on top with tuft & texture */}
        <path
          className="kalash-path"
          style={pathStyle}
          d="M76,22 C74,14 80,6 90,6
             C100,6 106,14 104,22
             C103,28 98,32 90,32
             C82,32 77,28 76,22 Z
             M80,14 C83,10 87,8 90,8
             M100,14 C97,10 93,8 90,8
             M84,10 C86,7 90,6 90,6
             M96,10 C94,7 90,6 90,6
             M90,6 L90,2
             M86,7 L84,3
             M94,7 L96,3
             M82,10 L78,6
             M98,10 L102,6"
        />

        {/* Path 5: Base / pedestal — stepped platform */}
        <path
          className="kalash-path"
          style={pathStyle}
          d="M62,175 L118,175
             M58,180 C58,178 60,176 62,175
             M122,180 C122,178 120,176 118,175
             M58,180 L122,180
             M54,185 L126,185
             M58,180 L54,185
             M122,180 L126,185
             M50,190 L130,190
             M54,185 L50,190
             M126,185 L130,190
             M50,190 C60,194 75,196 90,196
             C105,196 120,194 130,190"
        />
      </svg>
    </div>
  )
}

// ── Particle positions ───────────────────────────────────────────────
const particlePositions = [
  { left: '20%', bottom: '15%' },
  { left: '45%', bottom: '8%' },
  { left: '75%', bottom: '12%' },
  { right: '20%', bottom: '20%' },
  { left: '60%', bottom: '5%' },
]

// ── Helpers ──────────────────────────────────────────────────────────
function formatTime(time) {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

function formatDate(date) {
  const dateObj = new Date(date + 'T00:00:00')
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ── Main Component ───────────────────────────────────────────────────
export default function GrahShantiOverlay({ event, isOpen, onClose }) {
  const [animationPhase, setAnimationPhase] = useState('drawing')

  useEffect(() => {
    if (isOpen) setAnimationPhase('drawing')
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleDrawingComplete = useCallback(() => {
    setAnimationPhase('details')
  }, [])

  if (!event) return null

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: '#FBF6F0' }}
          >
            {/* Close */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: 'rgba(201,168,91,0.08)', color: '#C9A85B' }}
              whileHover={{ backgroundColor: 'rgba(201,168,91,0.15)', scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Ripple waves — purification energy */}
            {animationPhase === 'drawing' && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <RippleWave delay={1.5} />
                <RippleWave delay={2.5} />
                <RippleWave delay={3.5} />
              </div>
            )}

            {/* Incense smoke */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <IncenseSmoke delay={1.0} x="44%" />
              <IncenseSmoke delay={2.5} x="52%" />
              <IncenseSmoke delay={4.0} x="48%" />
            </div>

            {/* Glowing particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particlePositions.map((pos, i) => (
                <GlowParticle key={i} delay={i * 1.2 + 0.5} style={pos} />
              ))}
            </div>

            {/* Swastik symbol — appears during drawing */}
            {animationPhase === 'drawing' && <SwastikSymbol />}

            {/* Corner accents — blush tint */}
            <svg className="absolute top-0 left-0 w-28 h-28 pointer-events-none opacity-20" viewBox="0 0 100 100">
              <motion.line
                x1="0" y1="18" x2="55" y2="18"
                stroke="#C76B7E" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.3 }}
              />
              <motion.line
                x1="18" y1="0" x2="18" y2="55"
                stroke="#C9A85B" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.5 }}
              />
            </svg>
            <svg className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none opacity-20" viewBox="0 0 100 100">
              <motion.line
                x1="100" y1="82" x2="45" y2="82"
                stroke="#C9A85B" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.3 }}
              />
              <motion.line
                x1="82" y1="100" x2="82" y2="45"
                stroke="#C76B7E" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.5 }}
              />
            </svg>

            {/* Scrollable content */}
            <div className="absolute inset-0 overflow-y-auto">
              <div className="min-h-full flex flex-col items-center justify-center pt-12 pb-10 px-4">

                {/* ── Kalash SVG Section ── */}
                <motion.div
                  className="flex flex-col items-center justify-center"
                  animate={
                    animationPhase === 'details'
                      ? { opacity: 0.07, scale: 0.4 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={animationPhase === 'details' ? { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0 } : {}}
                >
                  {/* Sanskrit invocation */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animationPhase === 'drawing' ? 0.8 : 0 }}
                    transition={{ delay: 0.6, duration: 0.9 }}
                    className="text-center mb-6"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontSize: '13px',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: '#C9A85B',
                    }}
                  >
                    शुभ गृह शांति
                  </motion.p>

                  <KalashSVG onComplete={handleDrawingComplete} />

                  {/* Title label */}
                  <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                    transition={{ delay: 3.8, duration: 0.8 }}
                    className="mt-6 text-center"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontSize: '26px',
                      fontWeight: 400,
                      color: '#3D3229',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Grah Shanti
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animationPhase === 'drawing' ? 0.4 : 0 }}
                    transition={{ delay: 4.2, duration: 0.7 }}
                    className="mt-2 text-center"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontSize: '12px',
                      color: '#8A7D6B',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Peace &amp; Purification
                  </motion.p>
                </motion.div>

                {/* ── Event Details ── */}
                <AnimatePresence>
                  {animationPhase === 'details' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full max-w-sm flex flex-col items-center"
                    >
                      {/* Gold divider line */}
                      <motion.svg width="80" height="2" viewBox="0 0 80 2" className="mb-10">
                        <motion.line
                          x1="0" y1="1" x2="80" y2="1"
                          stroke="#C9A85B" strokeWidth="0.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                        />
                      </motion.svg>

                      {/* Event Name */}
                      <motion.h3
                        initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-center mb-3"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '36px',
                          fontWeight: 400,
                          color: '#3D3229',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {event.name}
                      </motion.h3>

                      {/* Date */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-center mb-8"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '13px',
                          color: '#8A7D6B',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {formatDate(event.date)}
                      </motion.p>

                      {/* Time */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                        className="text-center mb-10"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '18px',
                          fontWeight: 300,
                          color: '#C76B7E',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {formatTime(event.startTime)} — {formatTime(event.endTime)}
                      </motion.p>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.75 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="text-center mb-12 px-2"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '16px',
                          lineHeight: '1.9',
                          color: '#6B5E50',
                          fontWeight: 300,
                          maxWidth: '320px',
                        }}
                      >
                        {event.description}
                      </motion.p>

                      {/* Second divider */}
                      <motion.svg width="40" height="2" viewBox="0 0 40 2" className="mb-10">
                        <motion.line
                          x1="0" y1="1" x2="40" y2="1"
                          stroke="#C76B7E" strokeWidth="0.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.35 }}
                          transition={{ duration: 0.8, delay: 1.3, ease: 'easeInOut' }}
                        />
                      </motion.svg>

                      {/* Venue */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.7 }}
                        className="text-center mb-3"
                      >
                        <p style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '19px',
                          fontWeight: 500,
                          color: '#3D3229',
                          letterSpacing: '0.03em',
                        }}>
                          {event.venue}
                        </p>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.45 }}
                        transition={{ delay: 1.55, duration: 0.6 }}
                        className="text-center mb-8"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '13px',
                          color: '#8A7D6B',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {event.address}
                      </motion.p>

                      {/* Illustrated Map */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.65, duration: 0.7 }}
                        className="w-full flex flex-col items-center mb-6"
                      >
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full rounded-xl overflow-hidden transition-all group"
                          style={{ boxShadow: '0 2px 20px rgba(61,50,41,0.05)' }}
                        >
                          <svg
                            viewBox="0 0 320 200"
                            className="w-full"
                            role="img"
                            aria-label={`Illustrated map showing ${event.venue}`}
                            style={{ backgroundColor: '#FAF5ED' }}
                          >
                            <defs>
                              <pattern id="grahshanti-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8DFD6" strokeWidth="0.3" opacity="0.5" />
                              </pattern>
                            </defs>
                            <rect width="320" height="200" fill="url(#grahshanti-grid)" />

                            {/* Roads */}
                            <g stroke="#E2D9CE" strokeWidth="2.5" fill="none" opacity="0.6">
                              <path d="M0,100 Q80,95 160,100 T320,100" />
                              <path d="M160,0 Q155,50 160,100 T165,200" />
                              <path d="M0,60 L320,60" strokeWidth="1.5" />
                              <path d="M0,145 L320,145" strokeWidth="1.5" />
                              <path d="M80,0 L80,200" strokeWidth="1.5" />
                              <path d="M240,0 L240,200" strokeWidth="1.5" />
                            </g>

                            {/* Greenery */}
                            <g fill="#C76B7E" opacity="0.08">
                              <circle cx="50" cy="40" r="10" />
                              <circle cx="280" cy="35" r="12" />
                              <circle cx="40" cy="160" r="9" />
                              <circle cx="260" cy="170" r="11" />
                              <circle cx="120" cy="45" r="7" />
                              <circle cx="210" cy="160" r="8" />
                            </g>

                            {/* Buildings */}
                            <g fill="#C76B7E" opacity="0.05">
                              <rect x="90" y="115" width="28" height="18" rx="2" />
                              <rect x="200" y="70" width="24" height="22" rx="2" />
                              <rect x="100" y="55" width="18" height="25" rx="2" />
                              <rect x="215" y="120" width="30" height="20" rx="2" />
                            </g>

                            {/* Pin — pulsing */}
                            <g>
                              <circle cx="160" cy="100" r="22" fill="#C76B7E" opacity="0.05">
                                <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.05;0.02;0.05" dur="3s" repeatCount="indefinite" />
                              </circle>
                              <circle cx="160" cy="100" r="14" fill="#C76B7E" opacity="0.08">
                                <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.08;0.04;0.08" dur="3s" repeatCount="indefinite" />
                              </circle>
                              <g transform="translate(160, 96)">
                                <path
                                  d="M0 -6 C-2.5 -10, -7 -10, -8.5 -6.5 C-10 -3, -10 0.5, 0 7 C10 0.5, 10 -3, 8.5 -6.5 C7 -10, 2.5 -10, 0 -6 Z"
                                  fill="#C76B7E"
                                  stroke="#FAF5ED"
                                  strokeWidth="0.8"
                                />
                                <circle cx="0" cy="-1.5" r="1.5" fill="#FAF5ED" />
                              </g>
                            </g>

                            {/* Venue label */}
                            <text
                              x="160" y="128"
                              textAnchor="middle"
                              fill="#3D3229"
                              fontSize="8"
                              fontFamily="'Cormorant Garamond', Georgia, serif"
                              fontWeight="500"
                              letterSpacing="0.08em"
                            >
                              {event.venue}
                            </text>

                            <text
                              x="160" y="185"
                              textAnchor="middle"
                              fill="#8A7D6B"
                              fontSize="6"
                              fontFamily="'Cormorant Garamond', Georgia, serif"
                              opacity="0.4"
                              letterSpacing="0.15em"
                            >
                              TAP TO OPEN MAP
                            </text>
                          </svg>
                        </a>
                      </motion.div>

                      {/* Directions */}
                      <motion.a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.55 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                        className="inline-flex items-center gap-1.5 mb-10 group"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '13px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#C76B7E',
                        }}
                      >
                        <span>Directions</span>
                        <svg
                          className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </motion.a>

                      {/* Dress code */}
                      {event.dressCode && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.35 }}
                          transition={{ delay: 1.9, duration: 0.5 }}
                          className="text-center"
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '12px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#8A7D6B',
                          }}
                        >
                          {event.dressCode} attire
                        </motion.p>
                      )}

                      <div className="h-10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
