import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/**
 * MameruOverlay — Premium animated opening for the Mameru ceremony
 *
 * The Mameru tradition: the bride's maternal uncle (mama) lovingly bestows
 * gifts — saree, jewellery, coconut, cash — as blessings.
 *
 * Animation sequence:
 *   1.  Cream backdrop + soft centre glow
 *   2.  Golden line-art thali draws itself (plate → rim → items)
 *   3.  Blessing hands descend, placing a symbolic envelope
 *   4.  Gold particles rain downward like blessings
 *   5.  Floral mandala watermark blooms and fades
 *   6.  Thali shrinks to faint watermark → event details fade in
 */

// ── Sparkle Particle ─────────────────────────────────────────────────
function SparkleParticle({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.55, 0.75, 0.45, 0],
        scale: [0, 1, 1.15, 0.85, 0],
        y: [0, -18, -44, -72, -110],
      }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="5" height="5" viewBox="0 0 5 5">
        <circle cx="2.5" cy="2.5" r="2" fill="#C9A85B" opacity="0.45" />
        <circle cx="2.5" cy="2.5" r="0.8" fill="#C9A85B" opacity="0.7" />
      </svg>
    </motion.div>
  )
}

// ── Blessing Particle (gold falling downward like ashirwad) ──────────
function BlessingParticle({ delay, x }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: '18%' }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.65, 0.85, 0.5, 0],
        y: [0, 35, 80, 135, 200],
        x: [0, Math.random() * 14 - 7, Math.random() * 18 - 9, Math.random() * 10 - 5, 0],
      }}
      transition={{
        duration: 5,
        delay: delay + 3.0,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      <svg width="4" height="4" viewBox="0 0 4 4">
        <circle cx="2" cy="2" r="1.4" fill="#C9A85B" opacity="0.5" />
      </svg>
    </motion.div>
  )
}

// ── Floating Petal (blush) ───────────────────────────────────────────
function FloatingPetal({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.3, 0.45, 0.25, 0],
        y: [0, -35, -90, -150, -210],
        x: [0, 10, -7, 14, -4],
        rotate: [0, 25, 60, 100, 150],
      }}
      transition={{ duration: 10, delay: delay + 2.0, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
        <ellipse cx="4.5" cy="5.5" rx="3.2" ry="4.5" fill="#F4D7D3" opacity="0.45" />
        <ellipse cx="4.5" cy="5.5" rx="1.8" ry="2.8" fill="#F4D7D3" opacity="0.25" />
      </svg>
    </motion.div>
  )
}

// ── Floral Mandala heart-centre watermark ─────────────────────────────
function FloralMandala() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.55, rotate: 0 }}
      animate={{
        opacity: [0, 0.055, 0.055, 0],
        scale: [0.55, 1, 1, 1.04],
        rotate: [0, 0, 0, 4],
      }}
      transition={{ duration: 5.5, delay: 3.2, ease: 'easeInOut' }}
    >
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="130" stroke="#C9A85B" strokeWidth="0.4" opacity="0.35" />
        <circle cx="150" cy="150" r="108" stroke="#C9A85B" strokeWidth="0.3" opacity="0.25" />
        <circle cx="150" cy="150" r="85" stroke="#C9A85B" strokeWidth="0.25" opacity="0.2" />
        {[...Array(12)].map((_, i) => (
          <ellipse
            key={i}
            cx="150" cy="42"
            rx="10" ry="26"
            stroke="#C9A85B" strokeWidth="0.35" opacity="0.2"
            fill="none"
            transform={`rotate(${i * 30} 150 150)`}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={`inner-${i}`}
            cx="150" cy="80"
            rx="7" ry="18"
            stroke="#F4D7D3" strokeWidth="0.3" opacity="0.2"
            fill="none"
            transform={`rotate(${i * 45} 150 150)`}
          />
        ))}
        {/* Heart centre */}
        <path
          d="M150 180 C138 168, 120 160, 120 146 C120 133, 130 126, 140 126
             C146 126, 150 131, 150 136 C150 131, 154 126, 160 126
             C170 126, 180 133, 180 146 C180 160, 162 168, 150 180 Z"
          stroke="#C9A85B" strokeWidth="0.4" fill="#C9A85B" opacity="0.07"
        />
      </svg>
    </motion.div>
  )
}

// ── Centre golden glow ───────────────────────────────────────────────
function CentreGlow() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.12, 0.12, 0.06] }}
      transition={{ duration: 4, delay: 0.2, ease: 'easeInOut' }}
    >
      <div
        className="rounded-full"
        style={{
          width: '340px',
          height: '340px',
          background: 'radial-gradient(circle, rgba(201,168,91,0.15) 0%, rgba(201,168,91,0.04) 50%, transparent 75%)',
        }}
      />
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════════
// ── Thali SVG  —  line-art gift plate with items + blessing hands ──
// ═════════════════════════════════════════════════════════════════════
function ThaliSVG({ onComplete }) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.thali-path')
    const glowPaths = glowRef.current?.querySelectorAll('.thali-glow')

    // Initial hidden state
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

    const tl = gsap.timeline({
      onComplete: () => {
        // Soft glow pulse
        if (glowPaths) {
          glowPaths.forEach((g, i) => {
            gsap.to(g, {
              strokeDashoffset: 0,
              opacity: 0.3,
              duration: 0.7,
              delay: i * 0.08,
              ease: 'power2.out',
            })
          })
        }
        setTimeout(() => onComplete?.(), 650)
      },
    })

    // 1 — Thali plate outline
    tl.to(paths[0], { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' })
    // 2 — Decorative scalloped rim
    tl.to(paths[1], { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, '-=0.25')
    // 3 — Folded saree cloth
    tl.to(paths[2], { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.15')
    // 4 — Coconut with coir
    tl.to(paths[3], { strokeDashoffset: 0, duration: 0.65, ease: 'power2.inOut' }, '-=0.1')
    // 5 — Flower cluster
    tl.to(paths[4], { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.1')
    // 6 — Jewelry ornament
    tl.to(paths[5], { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.1')
    // 7 — Blessing hands + envelope
    tl.to(paths[6], { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.15')

    return () => tl.kill()
  }, [onComplete])

  const ps = {
    fill: 'none',
    stroke: '#C9A85B',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  const gs = {
    ...ps,
    strokeWidth: 2.6,
    filter: 'url(#thali-glow)',
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 280 260"
        className="w-56 h-52 md:w-64 md:h-58"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="thali-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer */}
        <g ref={glowRef} opacity="0.2">
          <path className="thali-glow" style={gs}
            d="M45,170 C45,142 72,118 140,118 C208,118 235,142 235,170
               C235,184 208,195 140,195 C72,195 45,184 45,170 Z" />
          <path className="thali-glow" style={gs}
            d="M108,62 C100,54 94,44 94,34  M172,62 C180,54 186,44 186,34" />
        </g>

        {/* ── Path 0: Thali plate — elegant wide oval with depth ring ── */}
        <path
          className="thali-path" style={ps}
          d="M45,170 C45,142 72,118 140,118
             C208,118 235,142 235,170
             C235,184 208,195 140,195
             C72,195 45,184 45,170 Z
             M53,170 C53,147 78,127 140,127
             C202,127 227,147 227,170
             C227,181 202,189 140,189
             C78,189 53,181 53,170 Z"
        />

        {/* ── Path 1: Decorative scalloped rim ── */}
        <path
          className="thali-path" style={ps}
          d="M60,170 C63,162 74,154 88,150
             C91,147 96,145 100,146
             C105,142 112,140 118,141
             C123,138 130,136 138,137
             C142,135 150,135 154,137
             C160,136 168,138 172,141
             C178,140 184,142 188,146
             C192,145 197,147 200,150
             C214,154 225,162 228,170"
        />

        {/* ── Path 2: Folded saree cloth ── */}
        <path
          className="thali-path" style={ps}
          d="M100,162 C100,157 106,152 114,151
             C122,150 129,153 129,158
             C129,162 126,165 121,167
             C116,169 108,169 104,167
             C101,165 100,163 100,162 Z
             M104,156 C107,154 112,153 116,154
             M106,160 C109,158 114,157 118,158
             M108,164 C111,163 116,163 119,164
             M102,168 Q112,174 126,168"
        />

        {/* ── Path 3: Coconut with coir tufts ── */}
        <path
          className="thali-path" style={ps}
          d="M162,156 C162,150 168,145 176,145
             C184,145 190,150 190,156
             C190,161 184,165 176,165
             C168,165 162,161 162,156 Z
             M168,150 C171,147 174,146 176,146
             M184,150 C181,147 178,146 176,146
             M176,145 L176,141
             M172,146 L169,142
             M180,146 L183,142
             M170,148 L166,145
             M182,148 L186,145"
        />

        {/* ── Path 4: Flower cluster — two blossoms ── */}
        <path
          className="thali-path" style={ps}
          d="M140,158 C142,155 145,153 148,155
             C151,153 154,155 155,158
             C157,157 158,160 156,162
             C158,164 156,167 154,165
             C152,168 149,166 148,164
             C145,166 142,164 142,162
             C140,163 139,160 141,159
             M148,157 C148,156 149,155 150,156
             C151,155 152,157 151,158
             M148,162 C148,163 149,164 150,163
             C151,164 152,162 151,161

             M198,160 C200,157 203,156 206,158
             C208,156 211,158 211,161
             C213,161 212,164 210,164
             C211,166 209,168 207,166
             C205,168 203,166 203,164
             C201,165 200,163 201,161
             M206,159 C206,158 207,158 208,159
             C209,158 209,160 208,161"
        />

        {/* ── Path 5: Jewelry ornament — small maang tikka shape ── */}
        <path
          className="thali-path" style={ps}
          d="M78,160 C78,155 83,152 89,155
             C92,152 96,154 95,158
             C97,157 97,161 94,162
             C96,164 93,166 90,164
             C87,166 84,164 83,162
             C80,163 79,160 81,158
             M85,156 C87,155 89,156 90,157
             M90,157 C91,156 93,157 93,159
             M84,161 C86,160 89,160 92,161
             M86,163 C88,163 90,163 92,163
             M89,155 L89,150 L86,148 L89,150 L92,148"
        />

        {/* ── Path 6: Blessing hands from above + envelope placed on thali ── */}
        <path
          className="thali-path" style={{ ...ps, strokeWidth: 1.2 }}
          d={`
             M100,85 C96,78 93,70 92,62
             C91,55 93,49 98,47
             C102,45 105,47 106,51
             C106,47 108,43 112,43
             C116,43 118,47 118,51
             C118,47 120,45 124,45
             C128,45 130,49 129,55
             L126,60
             M100,85 C102,90 105,94 109,96
             C113,98 117,98 121,96
             L123,94
             M92,62 C90,60 88,55 88,51
             C88,47 90,45 93,47

             M180,85 C184,78 187,70 188,62
             C189,55 187,49 182,47
             C178,45 175,47 174,51
             C174,47 172,43 168,43
             C164,43 162,47 162,51
             C162,47 160,45 156,45
             C152,45 150,49 151,55
             L154,60
             M180,85 C178,90 175,94 171,96
             C167,98 163,98 159,96
             L157,94
             M188,62 C190,60 192,55 192,51
             C192,47 190,45 187,47

             M128,100 L152,100
             M126,105 L154,105
             M128,100 L126,105
             M152,100 L154,105
             M130,103 L150,103
             M138,98 L140,96 L142,98
          `}
        />
      </svg>
    </div>
  )
}

// ── Particle positions ───────────────────────────────────────────────
const sparklePositions = [
  { left: '14%', bottom: '22%' },
  { left: '83%', bottom: '28%' },
  { left: '9%',  bottom: '52%' },
  { left: '91%', bottom: '48%' },
  { left: '33%', bottom: '12%' },
  { left: '67%', bottom: '14%' },
  { left: '50%', bottom: '6%'  },
]

const petalPositions = [
  { left: '11%', bottom: '28%' },
  { left: '80%', bottom: '38%' },
  { left: '24%', bottom: '9%'  },
  { left: '88%', bottom: '16%' },
  { left: '48%', bottom: '4%'  },
]

const blessingXPositions = ['36%', '40%', '44%', '48%', '52%', '56%', '60%', '64%']

// ── Helpers ──────────────────────────────────────────────────────────
function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${m} ${ampm}`
}
function formatDate(d) {
  if (!d) return ''
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

// ═════════════════════════════════════════════════════════════════════
// ── Main Overlay ─────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════
export default function MameruOverlay({ event, isOpen, onClose }) {
  const [animationPhase, setAnimationPhase] = useState('drawing') // 'drawing' | 'details'
  const overlayRef = useRef(null)

  const handleDrawingComplete = useCallback(() => {
    setTimeout(() => setAnimationPhase('details'), 400)
  }, [])

  useEffect(() => { if (isOpen) setAnimationPhase('drawing') }, [isOpen])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  if (!event) return null

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ', ' + event.address)}`
  const gold  = '#C9A85B'
  const blush = '#F4D7D3'

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
                style={{ backgroundColor: 'rgba(201,168,91,0.08)', color: gold }}
                whileHover={{ backgroundColor: 'rgba(201,168,91,0.15)', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Centre golden glow */}
              {animationPhase === 'drawing' && <CentreGlow />}

              {/* Sparkle particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {sparklePositions.map((pos, i) => (
                  <SparkleParticle key={`sp-${i}`} delay={i * 0.45 + 0.2} style={pos} />
                ))}
              </div>

              {/* Blush floating petals */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {petalPositions.map((pos, i) => (
                  <FloatingPetal key={`pt-${i}`} delay={i * 0.65} style={pos} />
                ))}
              </div>

              {/* Gold blessing particles falling */}
              {animationPhase === 'drawing' && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {blessingXPositions.map((x, i) => (
                    <BlessingParticle key={`bl-${i}`} delay={i * 0.25} x={x} />
                  ))}
                </div>
              )}

              {/* Floral mandala watermark */}
              {animationPhase === 'drawing' && <FloralMandala />}

              {/* Corner accents — gold + blush */}
              <svg className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="0" y1="20" x2="55" y2="20" stroke={gold} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="20" y1="0" x2="20" y2="55" stroke={gold} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="0" y1="28" x2="32" y2="28" stroke={blush} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>
              <svg className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="100" y1="80" x2="45" y2="80" stroke={gold} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="80" y1="100" x2="80" y2="45" stroke={gold} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="100" y1="72" x2="55" y2="72" stroke={blush} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>

              {/* ── Scrollable content ── */}
              <div className="absolute inset-0 overflow-y-auto">
                <div className="min-h-full flex flex-col items-center justify-center pt-12 pb-10 px-4">

                  {/* ── Thali SVG area ── */}
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
                    {/* Header text above thali */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-center mb-5"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '14px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: gold,
                      }}
                    >
                      मामेरू · Blessings of Love
                    </motion.p>

                    <ThaliSVG onComplete={handleDrawingComplete} />

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
                      Mameru Ceremony
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
                      A mama's pride, love & blessings
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
                          <motion.line x1="0" y1="1" x2="80" y2="1" stroke={gold} strokeWidth="0.5"
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
                            color: gold, letterSpacing: '0.08em',
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
                          <motion.line x1="0" y1="1" x2="40" y2="1" stroke={gold} strokeWidth="0.5"
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
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full rounded-xl overflow-hidden transition-all group"
                            style={{ boxShadow: '0 2px 20px rgba(61,50,41,0.05)' }}
                          >
                            <svg
                              viewBox="0 0 320 200" className="w-full" role="img"
                              aria-label={`Illustrated map showing ${event.venue}`}
                              style={{ backgroundColor: '#FAF5ED' }}
                            >
                              <defs>
                                <pattern id="mameru-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8DFD6" strokeWidth="0.3" opacity="0.5" />
                                </pattern>
                              </defs>
                              <rect width="320" height="200" fill="url(#mameru-grid)" />

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
                              <g fill={gold} opacity="0.12">
                                <circle cx="50" cy="40" r="10" />
                                <circle cx="280" cy="35" r="12" />
                                <circle cx="40" cy="160" r="9" />
                                <circle cx="260" cy="170" r="11" />
                                <circle cx="120" cy="45" r="7" />
                                <circle cx="210" cy="160" r="8" />
                              </g>

                              {/* Buildings */}
                              <g fill={gold} opacity="0.06">
                                <rect x="90" y="115" width="28" height="18" rx="2" />
                                <rect x="200" y="70" width="24" height="22" rx="2" />
                                <rect x="100" y="55" width="18" height="25" rx="2" />
                                <rect x="215" y="120" width="30" height="20" rx="2" />
                              </g>

                              {/* Centre pin — pulsing */}
                              <g>
                                <circle cx="160" cy="100" r="22" fill={gold} opacity="0.06">
                                  <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.06;0.02;0.06" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="160" cy="100" r="14" fill={gold} opacity="0.1">
                                  <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.1;0.05;0.1" dur="3s" repeatCount="indefinite" />
                                </circle>

                                <g transform="translate(160, 96)">
                                  <path
                                    d="M0 -6 C-2.5 -10, -7 -10, -8.5 -6.5 C-10 -3, -10 0.5, 0 7 C10 0.5, 10 -3, 8.5 -6.5 C7 -10, 2.5 -10, 0 -6 Z"
                                    fill={gold} stroke="#FAF5ED" strokeWidth="0.8"
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
                            textTransform: 'uppercase', color: gold,
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
