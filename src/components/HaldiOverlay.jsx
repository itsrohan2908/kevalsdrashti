import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/**
 * HaldiOverlay — Premium animated opening for the Haldi ceremony
 *
 * Symbolises joy, purity, turmeric ritual, and glowing happiness.
 *
 * Animation sequence:
 *   1.  Cream backdrop + warm yellow sunlight glow
 *   2.  Realistic steel katori bowl self-draws in gold line-art
 *   3.  Inner wall depth + decorative rim appear
 *   4.  Bright yellow haldi paste fills the bowl softly
 *   5.  Surface texture & shimmer highlights emerge
 *   6.  Warm glow radiates from the sacred bowl
 *   7.  Haldi particles drift — some morph into floral shapes
 *   8.  Bowl shrinks to watermark → event details fade in
 */

// ── Turmeric palette ─────────────────────────────────────────────────
const HALDI   = '#D4A843'   // soft muted turmeric yellow
const GOLD    = '#C9A85B'   // gold highlight
const SAFFRON = '#E8C56D'   // lighter shimmer
const WARM    = '#C9963B'   // deep warm accent
const YELLOW  = '#E6B821'   // bright haldi paste yellow

// ── Haldi Powder Particle ────────────────────────────────────────────
function HaldiParticle({ delay, style, morphToFloral = false }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{
        opacity: [0, 0.55, 0.7, 0.4, 0],
        scale: [0, 0.8, 1.1, morphToFloral ? 1.4 : 0.9, 0],
        y: [0, -25, -65, -115, -175],
        x: [0, Math.random() * 24 - 12, Math.random() * 30 - 15, Math.random() * 20 - 10, 0],
        rotate: morphToFloral ? [0, 45, 90, 180, 270] : [0, 15, -10, 20, 0],
      }}
      transition={{ duration: 8, delay: delay + 2.0, repeat: Infinity, ease: 'easeInOut' }}
    >
      {morphToFloral ? (
        /* Tiny floral shape */
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="3" r="2" fill={HALDI} opacity="0.35" />
          <circle cx="9" cy="6" r="2" fill={HALDI} opacity="0.35" />
          <circle cx="6" cy="9" r="2" fill={HALDI} opacity="0.35" />
          <circle cx="3" cy="6" r="2" fill={HALDI} opacity="0.35" />
          <circle cx="6" cy="6" r="1.2" fill={GOLD} opacity="0.5" />
        </svg>
      ) : (
        <svg width="6" height="6" viewBox="0 0 6 6">
          <circle cx="3" cy="3" r="2.2" fill={HALDI} opacity="0.45" />
          <circle cx="3" cy="3" r="0.9" fill={SAFFRON} opacity="0.6" />
        </svg>
      )}
    </motion.div>
  )
}

// ── Warm Glow Burst (radiates from ritual touch) ─────────────────────
function GlowBurst() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.18, 0.12, 0] }}
      transition={{ duration: 2.5, delay: 3.2, ease: 'easeOut' }}
    >
      <div
        className="rounded-full"
        style={{
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, rgba(212,168,67,0.2) 0%, rgba(212,168,67,0.06) 45%, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

// ── Sunlight Glow (scene opening) ────────────────────────────────────
function SunlightGlow() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: [0, 0.14, 0.14, 0.08], scale: [0.7, 1, 1, 1.05] }}
      transition={{ duration: 4.5, delay: 0.15, ease: 'easeInOut' }}
    >
      <div
        className="rounded-full"
        style={{
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, rgba(232,197,109,0.18) 0%, rgba(212,168,67,0.06) 50%, transparent 75%)`,
        }}
      />
    </motion.div>
  )
}

// ── Sun-like Mandala Watermark ───────────────────────────────────────
function SunMandala() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{
        opacity: [0, 0.055, 0.055, 0],
        scale: [0.5, 1, 1, 1.03],
        rotate: [0, 0, 8, 12],
      }}
      transition={{ duration: 5.5, delay: 3.0, ease: 'easeInOut' }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
        {/* Outer glow ring */}
        <circle cx="160" cy="160" r="145" stroke={HALDI} strokeWidth="0.4" opacity="0.3" />
        <circle cx="160" cy="160" r="125" stroke={GOLD} strokeWidth="0.3" opacity="0.25" />
        <circle cx="160" cy="160" r="100" stroke={HALDI} strokeWidth="0.25" opacity="0.2" />

        {/* Sun rays — pointed petals */}
        {[...Array(16)].map((_, i) => (
          <path
            key={i}
            d={`M160,${160 - 95} L${160 - 8},${160 - 55} L${160 + 8},${160 - 55} Z`}
            stroke={HALDI}
            strokeWidth="0.35"
            fill={HALDI}
            opacity="0.06"
            transform={`rotate(${i * 22.5} 160 160)`}
          />
        ))}

        {/* Inner petal ring */}
        {[...Array(10)].map((_, i) => (
          <ellipse
            key={`ip-${i}`}
            cx="160" cy="85"
            rx="9" ry="22"
            stroke={GOLD} strokeWidth="0.3" opacity="0.18"
            fill="none"
            transform={`rotate(${i * 36} 160 160)`}
          />
        ))}

        {/* Centre dot */}
        <circle cx="160" cy="160" r="12" stroke={HALDI} strokeWidth="0.5" opacity="0.15" fill={HALDI} fillOpacity="0.04" />
      </svg>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════════
// ── Haldi Bowl SVG — Realistic katori with yellow turmeric paste ─────
// ═════════════════════════════════════════════════════════════════════
function HaldiBowlSVG({ onComplete }) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.haldi-path')
    const glowPaths = glowRef.current?.querySelectorAll('.haldi-glow')

    // All stroke paths start hidden
    paths.forEach((p) => {
      const len = p.getTotalLength()
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
    })
    if (glowPaths) {
      glowPaths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }
    // Haldi paste fill starts invisible
    if (fillRef.current) {
      gsap.set(fillRef.current, { opacity: 0, scale: 0.85, transformOrigin: '140px 140px' })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Gentle glow echo
        if (glowPaths) {
          glowPaths.forEach((g, i) => {
            gsap.to(g, {
              strokeDashoffset: 0, opacity: 0.25,
              duration: 0.8, delay: i * 0.1, ease: 'power2.out',
            })
          })
        }
        setTimeout(() => onComplete?.(), 600)
      },
    })

    // 1 — Outer bowl body (smooth rounded katori shape)
    tl.to(paths[0], { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' })
    // 2 — Bowl base / pedestal ring
    tl.to(paths[1], { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.2')
    // 3 — Inner wall depth + rim lip
    tl.to(paths[2], { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.15')
    // 4 — Yellow haldi paste fill blooms in
    tl.to(fillRef.current, { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, '-=0.2')
    // 5 — Paste surface texture lines
    tl.to(paths[3], { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.5')
    // 6 — Shimmer highlights on paste
    tl.to(paths[4], { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
    // 7 — Warm glow rays above bowl
    tl.to(paths[5], { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.1')

    return () => tl.kill()
  }, [onComplete])

  const ps = {
    fill: 'none',
    stroke: GOLD,
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  const gs = { ...ps, strokeWidth: 2.6, filter: 'url(#haldi-glow)' }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 280 260"
        className="w-56 h-52 md:w-64 md:h-60"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="haldi-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Bright yellow haldi paste gradient */}
          <radialGradient id="haldi-fill" cx="48%" cy="42%" r="50%">
            <stop offset="0%" stopColor={YELLOW} stopOpacity="0.65" />
            <stop offset="45%" stopColor={HALDI} stopOpacity="0.45" />
            <stop offset="85%" stopColor={WARM} stopOpacity="0.22" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.08" />
          </radialGradient>
          {/* Subtle ambient warmth behind bowl */}
          <radialGradient id="bowl-ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={YELLOW} stopOpacity="0.12" />
            <stop offset="100%" stopColor={HALDI} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient warm glow behind the bowl */}
        <circle cx="140" cy="135" r="80" fill="url(#bowl-ambient)" />

        {/* Glow echo layer */}
        <g ref={glowRef} opacity="0.18">
          <ellipse className="haldi-glow" style={gs}
            cx="140" cy="135" rx="62" ry="30" />
        </g>

        {/* ── Yellow haldi paste fill (fades in during phase 4) ── */}
        <g ref={fillRef}>
          {/* Main paste body */}
          <ellipse cx="140" cy="132" rx="50" ry="22"
            fill="url(#haldi-fill)" />
          {/* Paste is slightly uneven/chunky — organic blobs */}
          <ellipse cx="128" cy="128" rx="8" ry="5"
            fill={YELLOW} opacity="0.25" />
          <ellipse cx="155" cy="130" rx="10" ry="4"
            fill={YELLOW} opacity="0.2" />
          <ellipse cx="140" cy="126" rx="6" ry="3.5"
            fill={SAFFRON} opacity="0.18" />
          <circle cx="148" cy="135" r="4"
            fill={YELLOW} opacity="0.15" />
          <circle cx="132" cy="136" r="3"
            fill={HALDI} opacity="0.2" />
          {/* Centre mound highlight */}
          <ellipse cx="140" cy="130" rx="14" ry="7"
            fill={YELLOW} opacity="0.12" />
        </g>

        {/* ── Path 0: Bowl outer body — realistic rounded katori ──
             Side-view profile: wide belly, tapered top, curved bottom ── */}
        <path
          className="haldi-path" style={ps}
          d={`
            M72,120
            C72,100 92,86 115,80
            C125,77 132,76 140,76
            C148,76 155,77 165,80
            C188,86 208,100 208,120

            C208,142 192,158 170,165
            C158,169 148,170 140,170
            C132,170 122,169 110,165
            C88,158 72,142 72,120 Z
          `}
        />

        {/* ── Path 1: Bowl base / pedestal ── */}
        <path
          className="haldi-path" style={{ ...ps, strokeWidth: 1.2 }}
          d={`
            M108,170
            C108,174 118,180 140,180
            C162,180 172,174 172,170

            M112,180
            C112,184 122,188 140,188
            C158,188 168,184 168,180

            M116,188
            C116,191 126,194 140,194
            C154,194 164,191 164,188
          `}
        />

        {/* ── Path 2: Inner wall depth + rim lip ──
             Shows the thickness of the bowl and the inside edge ── */}
        <path
          className="haldi-path" style={{ ...ps, strokeWidth: 1.1 }}
          d={`
            M80,118
            C82,104 100,92 120,86
            C128,84 134,83 140,83
            C146,83 152,84 160,86
            C180,92 198,104 200,118

            M86,122
            C88,110 104,100 122,95
            C130,93 135,92 140,92
            C145,92 150,93 158,95
            C176,100 192,110 194,122

            M78,115
            C78,113 79,111 80,110
            M202,115
            C202,113 201,111 200,110
          `}
        />

        {/* ── Path 3: Haldi paste surface texture ──
             Soft curved lines across the paste surface ── */}
        <path
          className="haldi-path" style={{ ...ps, stroke: HALDI, strokeWidth: 1.1 }}
          d={`
            M100,130
            C108,126 120,124 140,124
            C160,124 172,126 180,130

            M106,136
            C114,133 126,131 140,131
            C154,131 166,133 174,136

            M114,141
            C122,139 132,138 140,138
            C148,138 158,139 166,141

            M122,146
            C130,144 135,144 140,144
            C145,144 150,144 158,146
          `}
        />

        {/* ── Path 4: Shimmer highlights on haldi surface ── */}
        <path
          className="haldi-path" style={{ ...ps, stroke: SAFFRON, strokeWidth: 0.75 }}
          d={`
            M120,128 C126,126 134,126 140,126
            M150,127 C156,126 162,127 166,128

            M126,134 C132,133 138,133 142,133
            M152,133 C156,133 160,134 162,135

            M132,140 C136,139 140,139 144,139
          `}
        />

        {/* ── Path 5: Warm sacred glow rays above the bowl ── */}
        <path
          className="haldi-path" style={{ ...ps, stroke: HALDI, strokeWidth: 0.7 }}
          d={`
            M140,72 L140,60
            M128,74 L122,64
            M152,74 L158,64
            M116,80 L108,72
            M164,80 L172,72
            M106,90 L96,84
            M174,90 L184,84
          `}
        />
      </svg>
    </div>
  )
}

// ── Particle positions ───────────────────────────────────────────────
const particlePositions = [
  { left: '16%', bottom: '24%', floral: false },
  { left: '80%', bottom: '30%', floral: true },
  { left: '10%', bottom: '50%', floral: false },
  { left: '88%', bottom: '46%', floral: false },
  { left: '30%', bottom: '14%', floral: true },
  { left: '68%', bottom: '12%', floral: false },
  { left: '50%', bottom: '6%',  floral: true },
  { left: '42%', bottom: '40%', floral: false },
  { left: '58%', bottom: '55%', floral: true },
]

// ── Helpers ──────────────────────────────────────────────────────────
function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h, 10)
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
}
function formatDate(d) {
  if (!d) return ''
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

// ═════════════════════════════════════════════════════════════════════
// ── Main Overlay ─────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════
export default function HaldiOverlay({ event, isOpen, onClose }) {
  const [animationPhase, setAnimationPhase] = useState('drawing')
  const overlayRef = useRef(null)

  const handleDrawingComplete = useCallback(() => {
    setTimeout(() => setAnimationPhase('details'), 400)
  }, [])

  useEffect(() => { if (isOpen) setAnimationPhase('drawing') }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

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
                style={{ backgroundColor: 'rgba(201,168,91,0.08)', color: GOLD }}
                whileHover={{ backgroundColor: 'rgba(201,168,91,0.15)', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Warm sunlight glow */}
              {animationPhase === 'drawing' && <SunlightGlow />}

              {/* Glow burst from ritual touch */}
              {animationPhase === 'drawing' && <GlowBurst />}

              {/* Haldi powder particles — some morph to floral */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particlePositions.map((pos, i) => (
                  <HaldiParticle
                    key={`hp-${i}`}
                    delay={i * 0.4 + 0.3}
                    morphToFloral={pos.floral}
                    style={{ left: pos.left, bottom: pos.bottom }}
                  />
                ))}
              </div>

              {/* Sun mandala watermark */}
              {animationPhase === 'drawing' && <SunMandala />}

              {/* Corner accents — gold + turmeric */}
              <svg className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="0" y1="20" x2="55" y2="20" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="20" y1="0" x2="20" y2="55" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="0" y1="28" x2="32" y2="28" stroke={HALDI} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>
              <svg className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="100" y1="80" x2="45" y2="80" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="80" y1="100" x2="80" y2="45" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="100" y1="72" x2="55" y2="72" stroke={HALDI} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>

              {/* ── Scrollable content ── */}
              <div className="absolute inset-0 overflow-y-auto">
                <div className="min-h-full flex flex-col items-center justify-center pt-12 pb-10 px-4">

                  {/* ── Bowl SVG area ── */}
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    animate={
                      animationPhase === 'details'
                        ? { opacity: 0.07, scale: 0.38 }
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
                      हल्दी · Sacred Turmeric
                    </motion.p>

                    <HaldiBowlSVG onComplete={handleDrawingComplete} />

                    {/* Ceremony label */}
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                      transition={{ delay: 3.4, duration: 0.8 }}
                      className="mt-5 text-center"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '28px',
                        fontWeight: 500,
                        color: '#3D3229',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Haldi Ceremony
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 0.55 : 0 }}
                      transition={{ delay: 3.8, duration: 0.7 }}
                      className="mt-2 text-center"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '13px',
                        color: '#8A7D6B',
                        letterSpacing: '0.12em',
                      }}
                    >
                      A golden glow of joy and love
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
                            color: HALDI, letterSpacing: '0.08em',
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
                                <pattern id="haldi-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8DFD6" strokeWidth="0.3" opacity="0.5" />
                                </pattern>
                              </defs>
                              <rect width="320" height="200" fill="url(#haldi-grid)" />

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
                                <circle cx="160" cy="100" r="22" fill={HALDI} opacity="0.06">
                                  <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.06;0.02;0.06" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="160" cy="100" r="14" fill={HALDI} opacity="0.1">
                                  <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.1;0.05;0.1" dur="3s" repeatCount="indefinite" />
                                </circle>

                                <g transform="translate(160, 96)">
                                  <path
                                    d="M0 -6 C-2.5 -10, -7 -10, -8.5 -6.5 C-10 -3, -10 0.5, 0 7 C10 0.5, 10 -3, 8.5 -6.5 C7 -10, 2.5 -10, 0 -6 Z"
                                    fill={HALDI} stroke="#FAF5ED" strokeWidth="0.8"
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
