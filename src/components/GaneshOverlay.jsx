import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/**
 * GaneshOverlay - A premium animated divine experience
 * SVG line-drawing of Lord Ganesha with floating petals and Om symbol
 */

// ── Floating Petal Particle ──────────────────────────────────────────
function FloatingPetal({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.5, 0.7, 0.4, 0],
        y: [0, -60, -130, -200, -280],
        x: [0, 15, -10, 20, -5],
        rotate: [0, 45, 90, 135, 180],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
        <ellipse cx="5" cy="6" rx="4" ry="5.5" fill="#C9A85B" opacity="0.25" />
        <ellipse cx="5" cy="6" rx="2.5" ry="3.5" fill="#C9A85B" opacity="0.15" />
      </svg>
    </motion.div>
  )
}

// ── Om Symbol ────────────────────────────────────────────────────────
function OmSymbol() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 0.35, 0.35, 0], scale: [0.8, 1, 1, 1.1] }}
      transition={{ duration: 3.5, delay: 1.5, ease: 'easeInOut' }}
    >
      <span
        className="font-serif select-none"
        style={{
          fontSize: '48px',
          color: '#C9A85B',
          textShadow: '0 0 20px rgba(201,168,91,0.3)',
          letterSpacing: '0.05em',
        }}
      >
        ॐ
      </span>
    </motion.div>
  )
}

// ── Lord Ganesha SVG (minimal single-line art) ───────────────────────
function GaneshaSVG({ onComplete }) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.ganesh-path')
    const glowPaths = glowRef.current?.querySelectorAll('.ganesh-glow')

    // Set initial state — all paths hidden
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

    // Stagger‑draw timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Subtle glow pulse after drawing completes
        if (glowPaths) {
          glowPaths.forEach((glow, i) => {
            const length = glow.getTotalLength()
            gsap.to(glow, {
              strokeDashoffset: 0,
              opacity: 0.4,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power2.out',
            })
          })
        }
        // Signal animation complete after glow
        setTimeout(() => onComplete?.(), 800)
      },
    })

    // Phase 1: Crown / Head outline (top of figure)
    tl.to(paths[0], {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    // Phase 2: Trunk curve
    tl.to(
      paths[1],
      {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power2.inOut',
      },
      '-=0.3'
    )

    // Phase 3: Ears
    tl.to(
      paths[2],
      {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
      },
      '-=0.2'
    )

    // Phase 4: Body
    tl.to(
      paths[3],
      {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power2.inOut',
      },
      '-=0.2'
    )

    // Phase 5: Hands / details
    tl.to(
      paths[4],
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '-=0.15'
    )

    // Phase 6: Base / lotus
    tl.to(
      paths[5],
      {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      },
      '-=0.15'
    )

    return () => tl.kill()
  }, [onComplete])

  const pathStyle = {
    fill: 'none',
    stroke: '#C9A85B',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  const glowStyle = {
    fill: 'none',
    stroke: '#C9A85B',
    strokeWidth: 3.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    filter: 'url(#ganesh-glow)',
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Main SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 200 260"
        className="w-48 h-60 md:w-56 md:h-72"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="ganesh-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer (drawn after main paths) */}
        <g ref={glowRef} opacity="0.3">
          {/* Crown glow */}
          <path
            className="ganesh-glow"
            style={glowStyle}
            d="M70,55 C75,25 90,15 100,12 C110,15 125,25 130,55"
          />
          {/* Trunk glow */}
          <path
            className="ganesh-glow"
            style={glowStyle}
            d="M100,80 C100,90 95,105 85,120 C80,128 82,135 90,135"
          />
        </g>

        {/* Path 0: Crown & Head */}
        <path
          className="ganesh-path"
          style={pathStyle}
          d="M70,55 C75,25 90,15 100,12 C110,15 125,25 130,55
             M65,70 C65,45 80,30 100,28 C120,30 135,45 135,70
             C135,80 130,88 122,92
             M78,92 C70,88 65,80 65,70
             M80,38 L85,30 M90,33 L92,24 M100,32 L100,22
             M108,33 L110,24 M118,38 L122,30"
        />

        {/* Path 1: Trunk */}
        <path
          className="ganesh-path"
          style={pathStyle}
          d="M100,80 C100,90 95,105 85,120
             C80,128 82,135 90,135
             M92,105 C96,108 98,105 95,100"
        />

        {/* Path 2: Ears */}
        <path
          className="ganesh-path"
          style={pathStyle}
          d="M65,65 C55,55 48,62 48,75 C48,85 55,92 65,88
             M135,65 C145,55 152,62 152,75 C152,85 145,92 135,88
             M52,70 C50,68 52,72 54,74
             M148,70 C150,68 148,72 146,74"
        />

        {/* Path 3: Body */}
        <path
          className="ganesh-path"
          style={pathStyle}
          d="M78,95 C70,100 60,115 58,135
             C56,150 62,165 75,172
             M122,95 C130,100 140,115 142,135
             C144,150 138,165 125,172
             M75,172 C85,180 115,180 125,172"
        />

        {/* Path 4: Hands */}
        <path
          className="ganesh-path"
          style={pathStyle}
          d="M60,115 C50,118 40,125 38,130
             C36,135 40,138 45,136
             C48,134 50,130 52,128
             M140,115 C150,118 160,125 162,130
             C164,135 160,138 155,136
             C152,134 150,130 148,128
             M85,130 C82,135 80,142 82,148
             M115,130 C118,135 120,142 118,148"
        />

        {/* Path 5: Lotus base */}
        <path
          className="ganesh-path"
          style={pathStyle}
          d="M60,185 C65,178 75,175 85,178
             C90,180 95,185 100,185
             C105,185 110,180 115,178
             C125,175 135,178 140,185
             M55,190 C65,195 75,192 85,188
             M145,190 C135,195 125,192 115,188
             M70,195 C80,200 90,197 100,195
             C110,197 120,200 130,195"
        />
      </svg>
    </div>
  )
}

// ── Petal positions ──────────────────────────────────────────────────
const petalPositions = [
  { left: '12%', bottom: '5%' },
  { left: '50%', bottom: '2%' },
  { left: '85%', bottom: '8%' },
  { right: '15%', bottom: '15%' },
  { left: '35%', bottom: '18%' },
  { right: '30%', bottom: '10%' },
]

// ── Helper: format time ──────────────────────────────────────────────
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

function generateICS(event) {
  const fmt = (date, time) => {
    const [y, m, d] = date.split('-')
    const [h, min] = time.split(':')
    return `${y}${m}${d}T${h}${min}00`
  }
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Wedding//EN\nBEGIN:VEVENT\nUID:${event.id}-${now}@wedding\nDTSTAMP:${now}\nDTSTART:${fmt(event.date, event.startTime)}\nDTEND:${fmt(event.date, event.endTime)}\nSUMMARY:${event.name}\nDESCRIPTION:${event.description}\nLOCATION:${event.venue}, ${event.address}\nEND:VEVENT\nEND:VCALENDAR`
}

function downloadICS(event) {
  const blob = new Blob([generateICS(event)], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${event.name.replace(/\s+/g, '-').toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

// ── Main Overlay Component ───────────────────────────────────────────
export default function GaneshOverlay({ event, isOpen, onClose }) {
  const [animationPhase, setAnimationPhase] = useState('drawing') // 'drawing' | 'details'
  const overlayRef = useRef(null)

  // Reset phase when opening
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase('drawing')
    }
  }, [isOpen])

  // ESC to close
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
          {/* Full-screen backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: '#FBF6F0' }}
            ref={overlayRef}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{
                backgroundColor: 'rgba(201,168,91,0.08)',
                color: '#C9A85B',
              }}
              whileHover={{ backgroundColor: 'rgba(201,168,91,0.15)', scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Floating petals — always visible */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {petalPositions.map((pos, i) => (
                <FloatingPetal key={i} delay={i * 0.6} style={pos} />
              ))}
            </div>

            {/* Om symbol — appears during drawing phase */}
            {animationPhase === 'drawing' && <OmSymbol />}

            {/* Thin gold decorative lines at corners */}
            <svg className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-30" viewBox="0 0 100 100">
              <motion.line
                x1="0" y1="20" x2="60" y2="20"
                stroke="#C9A85B" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.3 }}
              />
              <motion.line
                x1="20" y1="0" x2="20" y2="60"
                stroke="#C9A85B" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
            <svg className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-30" viewBox="0 0 100 100">
              <motion.line
                x1="100" y1="80" x2="40" y2="80"
                stroke="#C9A85B" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.3 }}
              />
              <motion.line
                x1="80" y1="100" x2="80" y2="40"
                stroke="#C9A85B" strokeWidth="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>

            {/* Scrollable content area */}
            <div className="absolute inset-0 overflow-y-auto">
              <div className="min-h-full flex flex-col items-center justify-center pt-12 pb-10 px-4">

                {/* ── Ganesh SVG Section ── */}
                <motion.div
                  className="flex flex-col items-center justify-center"
                  animate={
                    animationPhase === 'details'
                      ? { opacity: 0.08, scale: 0.45 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={animationPhase === 'details' ? { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0 } : {}}
                >
                  {/* Title above Ganesha */}
                  <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center mb-6"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontSize: '14px',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#C9A85B',
                    }}
                  >
                    श्री गणेशाय नमः
                  </motion.p>

                  <GaneshaSVG onComplete={handleDrawingComplete} />

                  {/* "Ganesh Pooja" label */}
                  <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                    transition={{ delay: 3.5, duration: 0.8 }}
                    className="mt-5 text-center"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontSize: '28px',
                      fontWeight: 500,
                      color: '#3D3229',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Ganesh Pooja
                  </motion.h2>
                </motion.div>

                {/* ── Event Details Section ── */}
                <AnimatePresence>
                  {animationPhase === 'details' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full max-w-sm flex flex-col items-center"
                    >
                      {/* Animated gold line — draws itself */}
                      <motion.svg
                        width="80" height="2" viewBox="0 0 80 2"
                        className="mb-10"
                      >
                        <motion.line
                          x1="0" y1="1" x2="80" y2="1"
                          stroke="#C9A85B"
                          strokeWidth="0.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                        />
                      </motion.svg>

                      {/* Event Name — large, airy */}
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

                      {/* Date — whisper-light */}
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

                      {/* Time — centered, no container */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                        className="text-center mb-10"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: '18px',
                          fontWeight: 300,
                          color: '#C9A85B',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {formatTime(event.startTime)} — {formatTime(event.endTime)}
                      </motion.p>

                      {/* Description — elegant, generous line-height */}
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

                      {/* Second gold line */}
                      <motion.svg
                        width="40" height="2" viewBox="0 0 40 2"
                        className="mb-10"
                      >
                        <motion.line
                          x1="0" y1="1" x2="40" y2="1"
                          stroke="#C9A85B"
                          strokeWidth="0.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.4 }}
                          transition={{ duration: 0.8, delay: 1.3, ease: 'easeInOut' }}
                        />
                      </motion.svg>

                      {/* Venue — minimal, no card */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.7 }}
                        className="text-center mb-3"
                      >
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '19px',
                            fontWeight: 500,
                            color: '#3D3229',
                            letterSpacing: '0.03em',
                          }}
                        >
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
                            {/* Subtle grid pattern */}
                            <defs>
                              <pattern id="ganesh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8DFD6" strokeWidth="0.3" opacity="0.5" />
                              </pattern>
                            </defs>
                            <rect width="320" height="200" fill="url(#ganesh-grid)" />

                            {/* Roads — soft, minimal */}
                            <g stroke="#E2D9CE" strokeWidth="2.5" fill="none" opacity="0.6">
                              <path d="M0,100 Q80,95 160,100 T320,100" />
                              <path d="M160,0 Q155,50 160,100 T165,200" />
                              <path d="M0,60 L320,60" strokeWidth="1.5" />
                              <path d="M0,145 L320,145" strokeWidth="1.5" />
                              <path d="M80,0 L80,200" strokeWidth="1.5" />
                              <path d="M240,0 L240,200" strokeWidth="1.5" />
                            </g>

                            {/* Greenery — small abstract trees */}
                            <g fill="#C9A85B" opacity="0.12">
                              <circle cx="50" cy="40" r="10" />
                              <circle cx="280" cy="35" r="12" />
                              <circle cx="40" cy="160" r="9" />
                              <circle cx="260" cy="170" r="11" />
                              <circle cx="120" cy="45" r="7" />
                              <circle cx="210" cy="160" r="8" />
                            </g>

                            {/* Subtle building blocks */}
                            <g fill="#C9A85B" opacity="0.06">
                              <rect x="90" y="115" width="28" height="18" rx="2" />
                              <rect x="200" y="70" width="24" height="22" rx="2" />
                              <rect x="100" y="55" width="18" height="25" rx="2" />
                              <rect x="215" y="120" width="30" height="20" rx="2" />
                            </g>

                            {/* Center venue pin — pulsing glow */}
                            <g>
                              {/* Outer glow rings */}
                              <circle cx="160" cy="100" r="22" fill="#C9A85B" opacity="0.06">
                                <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.06;0.02;0.06" dur="3s" repeatCount="indefinite" />
                              </circle>
                              <circle cx="160" cy="100" r="14" fill="#C9A85B" opacity="0.1">
                                <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.1;0.05;0.1" dur="3s" repeatCount="indefinite" />
                              </circle>

                              {/* Pin — minimal heart */}
                              <g transform="translate(160, 96)">
                                <path
                                  d="M0 -6 C-2.5 -10, -7 -10, -8.5 -6.5 C-10 -3, -10 0.5, 0 7 C10 0.5, 10 -3, 8.5 -6.5 C7 -10, 2.5 -10, 0 -6 Z"
                                  fill="#C9A85B"
                                  stroke="#FAF5ED"
                                  strokeWidth="0.8"
                                />
                                <circle cx="0" cy="-1.5" r="1.5" fill="#FAF5ED" />
                              </g>
                            </g>

                            {/* Venue label */}
                            <text
                              x="160"
                              y="128"
                              textAnchor="middle"
                              fill="#3D3229"
                              fontSize="8"
                              fontFamily="'Cormorant Garamond', Georgia, serif"
                              fontWeight="500"
                              letterSpacing="0.08em"
                            >
                              {event.venue}
                            </text>

                            {/* Subtle "tap to open" hint */}
                            <text
                              x="160"
                              y="185"
                              textAnchor="middle"
                              fill="#8A7D6B"
                              fontSize="6"
                              fontFamily="'Cormorant Garamond', Georgia, serif"
                              opacity="0.4"
                              letterSpacing="0.15em"
                              className="transition-opacity group-hover:opacity-70"
                            >
                              TAP TO OPEN MAP
                            </text>
                          </svg>
                        </a>
                      </motion.div>

                      {/* Directions — text link only */}
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
                          color: '#C9A85B',
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

                      {/* Dress code — just text, no pill */}
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
