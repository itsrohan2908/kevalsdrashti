import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/**
 * JamanvarOverlay — Premium animated opening for the Jamanvar (wedding feast)
 *
 * Symbolises hospitality, togetherness, comfort, and celebration.
 *
 * Animation sequence:
 *   1.  Cream backdrop + warm afternoon sunlight glow
 *   2.  Traditional thali self-draws in warm gold line-art
 *   3.  Katoris (bowls) appear one by one around the thali
 *   4.  Roti and rice details emerge
 *   5.  Serving hand gracefully places food
 *   6.  Gentle steam + golden particles rise
 *   7.  Rangoli mandala appears beneath
 *   8.  Everything fades to watermark → event details appear
 */

// ── Feast palette - Warm Indian Tones ────────────────────────────────────────────────
const GOLD    = '#C65D1E'   // Burnt Orange
const WARM    = '#D67347'   // Warm Burnt Orange
const CREAM   = '#F5E6D3'   // Creamy Beige
const COPPER  = '#E8B89D'   // Soft Highlight
const SAFFRON = '#E89A6F'   // Light Terracotta
const RICH    = '#8B3426'   // Deep Burnt Orange

// ── Steam Wisp ───────────────────────────────────────────────────────
function SteamWisp({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scaleX: 1 }}
      animate={{
        opacity: [0, 0.18, 0.25, 0.12, 0],
        y: [0, -20, -50, -85, -130],
        x: [0, 4, -3, 6, 0],
        scaleX: [1, 1.1, 1.3, 1.6, 2],
      }}
      transition={{ duration: 6, delay: delay + 3.5, repeat: Infinity, ease: 'easeOut' }}
    >
      <svg width="8" height="30" viewBox="0 0 8 30" fill="none">
        <path
          d="M4 28 C4 24, 2 20, 4 16 C6 12, 2 8, 4 4 C5 2, 3 0, 4 0"
          stroke={GOLD}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  )
}

// ── Golden Particle ──────────────────────────────────────────────────
function GoldenParticle({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{
        opacity: [0, 0.5, 0.65, 0.35, 0],
        scale: [0, 0.7, 1, 0.8, 0],
        y: [0, -20, -55, -100, -160],
        x: [0, Math.random() * 20 - 10, Math.random() * 28 - 14, Math.random() * 16 - 8, 0],
      }}
      transition={{ duration: 7.5, delay: delay + 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="5" height="5" viewBox="0 0 5 5">
        <circle cx="2.5" cy="2.5" r="2" fill={GOLD} opacity="0.5" />
      </svg>
    </motion.div>
  )
}

// ── Warm Sunlight Glow ───────────────────────────────────────────────
function WarmGlow() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '-15%', left: '50%', transform: 'translateX(-50%)',
        width: '120%', height: '60%',
        background: `radial-gradient(ellipse at 50% 0%, rgba(201,168,91,0.08) 0%, rgba(201,168,91,0.03) 40%, transparent 70%)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.85, 1] }}
      transition={{ duration: 4, ease: 'easeInOut' }}
    />
  )
}

// ── Rangoli Mandala (watermark beneath plate) ────────────────────────
function RangoliMandala() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ bottom: '8%', left: '50%', transform: 'translateX(-50%)' }}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 0.06, scale: 1, rotate: 15 }}
      transition={{ delay: 4.2, duration: 1.5, ease: 'easeOut' }}
    >
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        {/* Outer ring */}
        <circle cx="110" cy="110" r="105" stroke={GOLD} strokeWidth="0.5" opacity="0.6" />
        <circle cx="110" cy="110" r="95" stroke={GOLD} strokeWidth="0.3" opacity="0.4" />
        {/* Petal arcs */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180
          const x1 = 110 + 70 * Math.cos(angle)
          const y1 = 110 + 70 * Math.sin(angle)
          const x2 = 110 + 95 * Math.cos(angle)
          const y2 = 110 + 95 * Math.sin(angle)
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={GOLD} strokeWidth="0.4" opacity="0.5" />
          )
        })}
        {/* Inner petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45) * Math.PI / 180
          const cx = 110 + 50 * Math.cos(angle)
          const cy = 110 + 50 * Math.sin(angle)
          return (
            <ellipse key={`p${i}`} cx={cx} cy={cy} rx="12" ry="6"
              fill="none" stroke={GOLD} strokeWidth="0.4" opacity="0.4"
              transform={`rotate(${i * 45}, ${cx}, ${cy})`} />
          )
        })}
        {/* Centre lotus */}
        <circle cx="110" cy="110" r="20" stroke={GOLD} strokeWidth="0.5" opacity="0.5" fill="none" />
        <circle cx="110" cy="110" r="8" fill={GOLD} opacity="0.15" />
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60) * Math.PI / 180
          const cx = 110 + 14 * Math.cos(angle)
          const cy = 110 + 14 * Math.sin(angle)
          return <circle key={`c${i}`} cx={cx} cy={cy} r="3" fill={GOLD} opacity="0.1" />
        })}
      </svg>
    </motion.div>
  )
}

// ── Feast / Thali SVG with GSAP line-drawing ─────────────────────────
function FeastSVG({ onComplete }) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)
  const steamRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const phaseEls = svg.querySelectorAll('.feast-path')
    const glowPaths = glowRef.current?.querySelectorAll('.feast-glow')

    // Build array of drawable elements per phase
    // <g> elements don't have getTotalLength — unwrap to children
    const phases = Array.from(phaseEls).map(el => {
      if (el.tagName.toLowerCase() === 'g') {
        return Array.from(el.children)
      }
      return [el]
    })

    // Set initial state: hidden via stroke-dasharray
    phases.forEach(group => {
      group.forEach(el => {
        if (typeof el.getTotalLength === 'function') {
          const length = el.getTotalLength()
          gsap.set(el, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
          })
        }
      })
    })

    // Glow paths: initially hidden
    if (glowPaths) {
      glowPaths.forEach((glow) => {
        if (typeof glow.getTotalLength === 'function') {
          const length = glow.getTotalLength()
          gsap.set(glow, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          })
        }
      })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Show glow layer
        if (glowPaths) {
          glowPaths.forEach((glow, i) => {
            gsap.to(glow, {
              strokeDashoffset: 0,
              opacity: 0.35,
              duration: 0.7,
              delay: i * 0.08,
              ease: 'power2.out',
            })
          })
        }
        setTimeout(() => onComplete?.(), 700)
      },
    })

    // Phase 1: Main thali rim (outer circle)
    if (phases[0]) tl.to(phases[0], {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    // Phase 2: Inner thali ring
    if (phases[1]) tl.to(phases[1], {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: 'power2.inOut',
    }, '-=0.4')

    // Phase 3: Katoris (small bowls)
    if (phases[2]) tl.to(phases[2], {
      strokeDashoffset: 0,
      duration: 1.0,
      ease: 'power2.inOut',
    }, '-=0.3')

    // Phase 4: Roti in centre
    if (phases[3]) tl.to(phases[3], {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '-=0.2')

    // Phase 5: Rice texture & food details
    if (phases[4]) tl.to(phases[4], {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    }, '-=0.15')

    // Phase 6: Serving hand
    if (phases[5]) tl.to(phases[5], {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: 'power2.inOut',
    }, '-=0.2')

    // Phase 7: Steam wisps
    if (phases[6]) tl.to(phases[6], {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.1')

    return () => tl.kill()
  }, [onComplete])

  const pathStyle = {
    fill: 'none',
    stroke: GOLD,
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  const glowStyle = {
    fill: 'none',
    stroke: GOLD,
    strokeWidth: 3.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    filter: 'url(#feast-glow)',
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 280 260"
        className="w-56 h-52 md:w-64 md:h-60"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="feast-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer */}
        <g ref={glowRef} opacity="0.25">
          <ellipse className="feast-glow" style={glowStyle}
            cx="140" cy="140" rx="95" ry="85" />
          <ellipse className="feast-glow" style={glowStyle}
            cx="140" cy="140" rx="72" ry="64" />
        </g>

        {/* Path 0: Outer thali rim — large oval plate */}
        <ellipse className="feast-path" style={pathStyle}
          cx="140" cy="140" rx="98" ry="88"
        />

        {/* Path 1: Inner thali ring — decorative edge */}
        <ellipse className="feast-path" style={pathStyle}
          cx="140" cy="140" rx="82" ry="73"
          strokeWidth="0.8" opacity="0.7"
        />

        {/* Path 2: Katoris (small bowls) around the thali */}
        <g className="feast-path" style={pathStyle}>
          {/* Top-left katori */}
          <ellipse cx="90" cy="108" rx="18" ry="12" />
          <ellipse cx="90" cy="106" rx="14" ry="8" opacity="0.5" />
          {/* Top-right katori */}
          <ellipse cx="190" cy="108" rx="18" ry="12" />
          <ellipse cx="190" cy="106" rx="14" ry="8" opacity="0.5" />
          {/* Bottom-left katori */}
          <ellipse cx="95" cy="168" rx="16" ry="11" />
          <ellipse cx="95" cy="166" rx="12" ry="7" opacity="0.5" />
          {/* Bottom-right katori */}
          <ellipse cx="185" cy="168" rx="16" ry="11" />
          <ellipse cx="185" cy="166" rx="12" ry="7" opacity="0.5" />
          {/* Centre-bottom small bowl (dal) */}
          <ellipse cx="140" cy="185" rx="17" ry="11" />
          <ellipse cx="140" cy="183" rx="13" ry="7" opacity="0.5" />
        </g>

        {/* Path 3: Roti — centre of thali */}
        <g className="feast-path" style={pathStyle}>
          <circle cx="140" cy="132" r="22" strokeWidth="1.2" />
          {/* Roti texture — subtle charred marks */}
          <path d="M128,126 Q132,130 130,134" strokeWidth="0.6" opacity="0.4" />
          <path d="M145,124 Q148,128 146,133" strokeWidth="0.6" opacity="0.4" />
          <path d="M137,138 Q140,142 143,139" strokeWidth="0.6" opacity="0.4" />
          {/* Torn edge of roti */}
          <path d="M118,132 Q120,128 122,131 Q123,134 120,136" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Path 4: Rice & food details */}
        <g className="feast-path" style={{ ...pathStyle, strokeWidth: 0.7 }}>
          {/* Rice grains in top-right katori */}
          <path d="M185,104 L187,106" opacity="0.5" />
          <path d="M189,103 L191,105" opacity="0.5" />
          <path d="M193,105 L195,107" opacity="0.5" />
          <path d="M186,107 L188,109" opacity="0.5" />
          <path d="M190,106 L192,108" opacity="0.5" />
          {/* Sabzi texture in left katori */}
          <circle cx="88" cy="106" r="3" opacity="0.3" />
          <circle cx="92" cy="108" r="2.5" opacity="0.3" />
          <circle cx="86" cy="110" r="2" opacity="0.25" />
          {/* Dal swirl in bottom bowl */}
          <path d="M134,182 Q138,180 142,182 Q146,184 142,186 Q138,184 134,182" opacity="0.35" />
          {/* Garnish dots */}
          <circle cx="140" cy="182" r="1" fill={GOLD} opacity="0.3" />
          <circle cx="136" cy="184" r="0.8" fill={GOLD} opacity="0.25" />
        </g>

        {/* Path 5: Serving hand — graceful, coming from right */}
        <g className="feast-path" style={{ ...pathStyle, strokeWidth: 1.3 }}>
          {/* Wrist & forearm */}
          <path d="M260,80 C248,85 240,95 235,105" />
          {/* Palm */}
          <path d="M235,105 C232,110 228,115 225,112 C222,110 224,106 228,104" />
          {/* Fingers — gently cupped, serving gesture */}
          <path d="M228,104 C230,100 234,97 236,100" />
          <path d="M236,100 C238,96 242,94 243,98" />
          <path d="M243,98 C244,94 248,93 248,97" />
          <path d="M248,97 C249,95 252,94 251,98 C250,102 247,105 243,107" />
          {/* Thumb */}
          <path d="M225,112 C222,116 220,118 222,120 C224,120 227,117 230,114" />
          {/* Bangle */}
          <path d="M256,82 C254,80 252,82 254,84" strokeWidth="0.8" opacity="0.45" />
          <path d="M258,85 C256,83 254,85 256,87" strokeWidth="0.8" opacity="0.4" />
          {/* Spoon in hand */}
          <path d="M234,108 C230,115 226,122 228,126 C230,130 236,128 238,124 C240,120 237,112 234,108"
            strokeWidth="1" opacity="0.6" />
          <path d="M236,124 L240,140" strokeWidth="0.9" opacity="0.5" />
        </g>

        {/* Path 6: Steam wisps rising from food */}
        <g className="feast-path" style={{ ...pathStyle, strokeWidth: 0.6 }}>
          <path d="M120,95 C118,88 122,82 120,75" opacity="0.3" />
          <path d="M140,88 C138,80 142,74 140,66" opacity="0.35" />
          <path d="M160,92 C162,85 158,78 160,70" opacity="0.3" />
        </g>
      </svg>
    </div>
  )
}

// ── Particle positions ───────────────────────────────────────────────
const steamPositions = [
  { left: '38%', bottom: '55%' },
  { left: '48%', bottom: '58%' },
  { left: '56%', bottom: '54%' },
  { left: '43%', bottom: '60%' },
]

const particlePositions = [
  { left: '20%', bottom: '15%' },
  { left: '45%', bottom: '10%' },
  { left: '75%', bottom: '18%' },
  { left: '30%', bottom: '25%' },
  { left: '65%', bottom: '8%' },
  { left: '50%', bottom: '22%' },
]

// ── Helper functions ─────────────────────────────────────────────────
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

// ── Main Overlay Component ───────────────────────────────────────────
export default function JamanvarOverlay({ event, isOpen, onClose }) {
  const [animationPhase, setAnimationPhase] = useState('drawing') // 'drawing' | 'details'
  const overlayRef = useRef(null)

  useEffect(() => { if (isOpen) setAnimationPhase('drawing') }, [isOpen])

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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ', ' + event.address)}`

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: 'rgba(61,50,41,0.4)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ backgroundColor: CREAM }}
              ref={overlayRef}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: 'rgba(201,168,91,0.08)', color: GOLD }}
                whileHover={{ backgroundColor: 'rgba(201,168,91,0.15)', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Warm afternoon glow */}
              <WarmGlow />

              {/* Steam wisps — always visible */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {steamPositions.map((pos, i) => (
                  <SteamWisp key={`steam-${i}`} delay={i * 0.8} style={pos} />
                ))}
              </div>

              {/* Golden particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particlePositions.map((pos, i) => (
                  <GoldenParticle key={`gp-${i}`} delay={i * 0.5} style={pos} />
                ))}
              </div>

              {/* Rangoli mandala watermark */}
              {animationPhase === 'drawing' && <RangoliMandala />}

              {/* Corner accents */}
              <svg className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="0" y1="20" x2="55" y2="20" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="20" y1="0" x2="20" y2="55" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="0" y1="28" x2="32" y2="28" stroke={WARM} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>
              <svg className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="100" y1="80" x2="45" y2="80" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="80" y1="100" x2="80" y2="45" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="100" y1="72" x2="55" y2="72" stroke={WARM} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>

              {/* ── Scrollable content ── */}
              <div className="absolute inset-0 overflow-y-auto">
                <div className="min-h-full flex flex-col items-center justify-center pt-12 pb-10 px-4">

                  {/* ── Feast SVG area ── */}
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    animate={
                      animationPhase === 'details'
                        ? { opacity: 0.06, scale: 0.35 }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
                    style={
                      animationPhase === 'details'
                        ? { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0 }
                        : {}
                    }
                  >
                    {/* Header text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="text-center mb-5"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '14px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: GOLD,
                      }}
                    >
                      जमणवार · The Wedding Feast
                    </motion.p>

                    <FeastSVG onComplete={handleDrawingComplete} />

                    {/* Ceremony label */}
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                      transition={{ delay: 3.6, duration: 0.8 }}
                      className="mt-5 text-center"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '28px',
                        fontWeight: 500,
                        color: '#3D3229',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Jamnavar
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 0.55 : 0 }}
                      transition={{ delay: 4.0, duration: 0.7 }}
                      className="mt-2 text-center"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '13px',
                        color: '#8A7D6B',
                        letterSpacing: '0.12em',
                      }}
                    >
                      A feast of love, warmth & togetherness
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
                        {/* Self-drawing gold divider */}
                        <motion.svg width="80" height="2" viewBox="0 0 80 2" className="mb-10">
                          <motion.line x1="0" y1="1" x2="80" y2="1" stroke={GOLD} strokeWidth="0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }} />
                        </motion.svg>

                        {/* Event Name */}
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                          className="text-center mb-3"
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '36px', fontWeight: 400,
                            color: '#3D3229', letterSpacing: '0.06em',
                          }}
                        >
                          {event.name}
                        </motion.h3>

                        {/* Date */}
                        <motion.p
                          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                          className="text-center mb-8"
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '13px', color: '#8A7D6B',
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                          }}
                        >
                          {formatDate(event.date)}
                        </motion.p>

                        {/* Time */}
                        <motion.p
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: 0.9, duration: 0.7 }}
                          className="text-center mb-10"
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '18px', fontWeight: 300,
                            color: GOLD, letterSpacing: '0.08em',
                          }}
                        >
                          {formatTime(event.startTime)} — {formatTime(event.endTime)}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
                          transition={{ delay: 1.1, duration: 0.8 }}
                          className="text-center mb-12 px-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '16px', lineHeight: '1.9',
                            color: '#6B5E50', fontWeight: 300, maxWidth: '320px',
                          }}
                        >
                          {event.description}
                        </motion.p>

                        {/* Second divider */}
                        <motion.svg width="40" height="2" viewBox="0 0 40 2" className="mb-10">
                          <motion.line x1="0" y1="1" x2="40" y2="1" stroke={GOLD} strokeWidth="0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.4 }}
                            transition={{ duration: 0.8, delay: 1.3, ease: 'easeInOut' }} />
                        </motion.svg>

                        {/* Venue */}
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: 1.4, duration: 0.7 }}
                          className="text-center mb-3"
                        >
                          <p style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '19px', fontWeight: 500,
                            color: '#3D3229', letterSpacing: '0.03em',
                          }}>
                            {event.venue}
                          </p>
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                          transition={{ delay: 1.55, duration: 0.6 }}
                          className="text-center mb-8"
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '13px', color: '#8A7D6B', letterSpacing: '0.04em',
                          }}
                        >
                          {event.address}
                        </motion.p>

                        {/* Illustrated Map */}
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: 1.65, duration: 0.7 }}
                          className="w-full flex flex-col items-center mb-6"
                        >
                          <a
                            href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
                            className="block w-full rounded-xl overflow-hidden transition-all group"
                            style={{ boxShadow: '0 2px 20px rgba(61,50,41,0.05)' }}
                          >
                            <svg
                              viewBox="0 0 320 200" className="w-full" role="img"
                              aria-label={`Illustrated map showing ${event.venue}`}
                              style={{ backgroundColor: '#FAF5ED' }}
                            >
                              <defs>
                                <pattern id="jamanvar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8B89D" strokeWidth="0.3" opacity="0.5" />
                                </pattern>
                              </defs>
                              <rect width="320" height="200" fill="url(#jamanvar-grid)" />

                              {/* Roads */}
                              <g stroke="#EDD4C1" strokeWidth="2.5" fill="none" opacity="0.6">
                                <path d="M0,100 Q80,95 160,100 T320,100" />
                                <path d="M160,0 Q155,50 160,100 T165,200" />
                                <path d="M0,60 L320,60" strokeWidth="1.5" />
                                <path d="M0,145 L320,145" strokeWidth="1.5" />
                                <path d="M80,0 L80,200" strokeWidth="1.5" />
                                <path d="M240,0 L240,200" strokeWidth="1.5" />
                              </g>

                              {/* Greenery */}
                              <g fill={GOLD} opacity="0.12">
                                <circle cx="50" cy="40" r="10" />
                                <circle cx="280" cy="35" r="12" />
                                <circle cx="40" cy="160" r="9" />
                                <circle cx="260" cy="170" r="11" />
                                <circle cx="120" cy="45" r="7" />
                                <circle cx="210" cy="160" r="8" />
                              </g>

                              {/* Buildings */}
                              <g fill={GOLD} opacity="0.06">
                                <rect x="90" y="115" width="28" height="18" rx="2" />
                                <rect x="200" y="70" width="24" height="22" rx="2" />
                                <rect x="100" y="55" width="18" height="25" rx="2" />
                                <rect x="215" y="120" width="30" height="20" rx="2" />
                              </g>

                              {/* Centre pin */}
                              <g>
                                <circle cx="160" cy="100" r="22" fill={GOLD} opacity="0.06">
                                  <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.06;0.02;0.06" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="160" cy="100" r="14" fill={GOLD} opacity="0.1">
                                  <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.1;0.05;0.1" dur="3s" repeatCount="indefinite" />
                                </circle>

                                <g transform="translate(160, 96)">
                                  <path
                                    d="M0 -6 C-2.5 -10, -7 -10, -8.5 -6.5 C-10 -3, -10 0.5, 0 7 C10 0.5, 10 -3, 8.5 -6.5 C7 -10, 2.5 -10, 0 -6 Z"
                                    fill={GOLD} stroke="#FAF5ED" strokeWidth="0.8"
                                  />
                                  <circle cx="0" cy="-1.5" r="1.5" fill="#FAF5ED" />
                                </g>
                              </g>

                              <text x="160" y="128" textAnchor="middle" fill="#3D3229" fontSize="8"
                                fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="500" letterSpacing="0.08em">
                                {event.venue}
                              </text>
                              <text x="160" y="185" textAnchor="middle" fill="#8A7D6B" fontSize="6"
                                fontFamily="'Cormorant Garamond', Georgia, serif" opacity="0.4" letterSpacing="0.15em"
                                className="transition-opacity group-hover:opacity-70">
                                TAP TO OPEN MAP
                              </text>
                            </svg>
                          </a>
                        </motion.div>

                        {/* Directions */}
                        <motion.a
                          href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
                          initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ delay: 1.8, duration: 0.5 }}
                          className="inline-flex items-center gap-1.5 mb-10 group"
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: '13px', letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: GOLD,
                          }}
                        >
                          <span>Directions</span>
                          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                          </svg>
                        </motion.a>

                        {/* Dress code */}
                        {event.dressCode && (
                          <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
                            transition={{ delay: 1.9, duration: 0.5 }}
                            className="text-center"
                            style={{
                              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                              fontSize: '12px', letterSpacing: '0.15em',
                              textTransform: 'uppercase', color: '#8A7D6B',
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
