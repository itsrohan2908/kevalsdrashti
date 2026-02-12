import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/**
 * GarbaOverlay - Cinematic Raas Garba celebration
 * Semi-realistic SVG silhouettes with GSAP dance animation,
 * dandiya sparks, floating diyas, rangoli, and warm festive glow
 */

// ── Palette ── Warm Indian-Inspired Theme ──────────────────────────
const CREAM   = '#F5E6D3'   // Creamy Beige
const GOLD    = '#C65D1E'   // Burnt Orange
const WARM    = '#D67347'   // Warm Burnt Orange variation
const MAROON  = '#A84832'   // Deep Terracotta
const MUTED_RED = '#C97A56' // Terracotta
const COPPER  = '#E8B89D'   // Soft Highlight
const DARK    = '#3E2A24'   // Deep Warm Brown
const MUTED   = '#7A5B4F'   // Medium Brown
const SAFFRON = '#E89A6F'   // Light Terracotta
const DEEP_MAROON = '#8B3426' // Deep Burnt Orange

// ── Distant Diya Bokeh ──────────────────────────────────────────────
function DiyaBokeh({ cx, cy, r, delay, color = GOLD }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.15, 0.25, 0.12, 0.22, 0.15, 0],
        r: [r, r * 1.3, r, r * 1.2, r * 0.9, r * 1.1, r],
      }}
      transition={{
        duration: 6 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// ── Floating Diya (foreground) ──────────────────────────────────────
function FloatingDiya({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.6, 0.8, 0.5, 0.7, 0.4, 0],
        y: [0, -8, -2, -10, -4, -12, -20],
        x: [0, 3, -2, 5, -1, 3, 0],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        {/* Diya base */}
        <ellipse cx="9" cy="18" rx="7" ry="3" fill={WARM} opacity="0.4" />
        <path d="M4,16 Q4,13 9,12 Q14,13 14,16 Q14,18 9,19 Q4,18 4,16Z" fill={COPPER} opacity="0.35" />
        {/* Flame */}
        <path d="M9,12 Q7,8 9,3 Q11,8 9,12Z" fill={SAFFRON} opacity="0.6" />
        <path d="M9,11 Q8,8 9,5 Q10,8 9,11Z" fill={GOLD} opacity="0.8" />
        {/* Glow */}
        <circle cx="9" cy="6" r="4" fill={GOLD} opacity="0.15" />
      </svg>
    </motion.div>
  )
}

// ── Golden Spark Particle ───────────────────────────────────────────
function GoldenSpark({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.9, 0.7, 0],
        scale: [0, 1, 0.8, 0],
        y: [0, -20, -45, -70],
        x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 80],
      }}
      transition={{
        duration: 1.4,
        delay,
        ease: 'easeOut',
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: 3 + Math.random() * 3,
          height: 3 + Math.random() * 3,
          backgroundColor: GOLD,
          boxShadow: `0 0 6px ${GOLD}, 0 0 12px ${SAFFRON}`,
        }}
      />
    </motion.div>
  )
}

// ── Warm Festive Glow ───────────────────────────────────────────────
function WarmGlow() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, rgba(201,150,59,0.06) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, rgba(139,46,59,0.04) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, rgba(139,46,59,0.04) 0%, transparent 50%)`,
        }}
      />
    </>
  )
}

// ── Dusk Sky Gradient ───────────────────────────────────────────────
function DuskGradient() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        background: `linear-gradient(180deg, 
          rgba(110,29,42,0.06) 0%, 
          rgba(201,168,91,0.04) 25%, 
          rgba(251,246,240,0) 50%, 
          rgba(201,150,59,0.03) 80%, 
          rgba(139,46,59,0.05) 100%)`,
      }}
    />
  )
}

// ── Rangoli Pattern (floor under dancers) ───────────────────────────
function RangoliFloor({ visible }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        bottom: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={visible
        ? { opacity: 0.12, scale: 1 }
        : { opacity: 0, scale: 0.6 }
      }
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
        {/* Outer ring */}
        <ellipse cx="110" cy="55" rx="108" ry="52" stroke={MAROON} strokeWidth="0.6" opacity="0.5" />
        {/* Inner ring */}
        <ellipse cx="110" cy="55" rx="85" ry="40" stroke={GOLD} strokeWidth="0.4" opacity="0.4" />
        {/* Innermost */}
        <ellipse cx="110" cy="55" rx="55" ry="26" stroke={MUTED_RED} strokeWidth="0.5" opacity="0.35" />
        {/* Radial petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180
          const x1 = 110 + 55 * Math.cos(angle)
          const y1 = 55 + 26 * Math.sin(angle)
          const x2 = 110 + 90 * Math.cos(angle)
          const y2 = 55 + 43 * Math.sin(angle)
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={GOLD} strokeWidth="0.3" opacity="0.3" />
          )
        })}
        {/* Petal dots */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45) * Math.PI / 180
          const cx = 110 + 70 * Math.cos(angle)
          const cy = 55 + 33 * Math.sin(angle)
          return <circle key={`d${i}`} cx={cx} cy={cy} r="2" fill={MAROON} opacity="0.2" />
        })}
        {/* Centre dot */}
        <circle cx="110" cy="55" r="4" fill={GOLD} opacity="0.15" />
      </svg>
    </motion.div>
  )
}

// ── Garba Dancer SVG with GSAP line-drawing + dance motion ──────────
function GarbaDancersSVG({ onComplete }) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)
  const dancerGroupRef = useRef(null)
  const dandiyaSparkRef = useRef(null)
  const [showSparks, setShowSparks] = useState(false)
  const [sparksRound, setSparksRound] = useState(0)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const phaseEls = svg.querySelectorAll('.garba-path')
    const glowPaths = glowRef.current?.querySelectorAll('.garba-glow')

    // Unwrap <g> elements to children for getTotalLength
    const phases = Array.from(phaseEls).map(el => {
      if (el.tagName.toLowerCase() === 'g') {
        return Array.from(el.children)
      }
      return [el]
    })

    // Set initial state
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

    if (glowPaths) {
      glowPaths.forEach(glow => {
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

    const tl = gsap.timeline()

    // Phase 1: Female figure — chaniya choli silhouette
    if (phases[0]) tl.to(phases[0], {
      strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut',
    })

    // Phase 2: Male figure — kediyu silhouette
    if (phases[1]) tl.to(phases[1], {
      strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut',
    }, '-=0.8')

    // Phase 3: Female details (dupatta flow, jewelry hints)
    if (phases[2]) tl.to(phases[2], {
      strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut',
    }, '-=0.5')

    // Phase 4: Male details (pagdi/headwrap, neckline)
    if (phases[3]) tl.to(phases[3], {
      strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut',
    }, '-=0.4')

    // Phase 5: Dandiya sticks
    if (phases[4]) tl.to(phases[4], {
      strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut',
    }, '-=0.2')

    // Phase 6: Foot shadows & ground details
    if (phases[5]) tl.to(phases[5], {
      strokeDashoffset: 0, duration: 0.5, ease: 'power2.out',
    }, '-=0.1')

    // After drawing: start dance motion
    tl.call(() => {
      // Gentle dance sway for the whole dancer group
      const dg = dancerGroupRef.current
      if (dg) {
        gsap.to(dg, {
          rotation: 2, transformOrigin: '50% 90%',
          duration: 0.8, ease: 'power1.inOut',
          yoyo: true, repeat: 3,
        })
      }
    })

    // Female gentle twirl / sway
    tl.to(phases[0], {
      x: -2, duration: 0.6, ease: 'power1.inOut',
      yoyo: true, repeat: 1,
    }, '-=0.1')

    // Male slight step
    tl.to(phases[1], {
      x: 2, duration: 0.6, ease: 'power1.inOut',
      yoyo: true, repeat: 1,
    }, '<')

    // Dandiya tap #1-2 sparks
    tl.call(() => {
      setShowSparks(true)
      setSparksRound(1)
    })
    tl.to({}, { duration: 0.6 }) // pause for spark
    tl.call(() => setSparksRound(2))
    tl.to({}, { duration: 0.6 }) // pause for spark

    // Show glow layer
    tl.call(() => {
      if (glowPaths) {
        glowPaths.forEach((glow, i) => {
          gsap.to(glow, {
            strokeDashoffset: 0,
            opacity: 0.3,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power2.out',
          })
        })
      }
    })

    tl.to({}, { duration: 0.7 })
    tl.call(() => onComplete?.())

    return () => tl.kill()
  }, [onComplete])

  const pathStyle = {
    fill: 'none',
    stroke: MAROON,
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  const goldPathStyle = {
    ...pathStyle,
    stroke: GOLD,
    strokeWidth: 1.3,
  }

  const glowStyle = {
    fill: 'none',
    stroke: MAROON,
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    filter: 'url(#garba-glow)',
  }

  // Spark positions for dandiya contact point
  const sparkCenter = { left: '50%', top: '32%' }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 340 320"
        className="w-64 h-60 md:w-80 md:h-72"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="garba-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Distant bokeh diyas in background */}
        <g opacity="0.3">
          <DiyaBokeh cx="30" cy="30" r="3" delay={0} color={SAFFRON} />
          <DiyaBokeh cx="310" cy="45" r="2.5" delay={0.8} color={GOLD} />
          <DiyaBokeh cx="55" cy="15" r="2" delay={1.5} color={WARM} />
          <DiyaBokeh cx="285" cy="20" r="2.8" delay={2.0} color={SAFFRON} />
          <DiyaBokeh cx="170" cy="12" r="2" delay={0.5} color={GOLD} />
          <DiyaBokeh cx="15" cy="70" r="1.8" delay={3.0} color={WARM} />
          <DiyaBokeh cx="325" cy="80" r="2.2" delay={1.2} color={SAFFRON} />
        </g>

        {/* Glow layer */}
        <g ref={glowRef} opacity="0.2">
          {/* Female outline glow */}
          <path className="garba-glow" style={glowStyle}
            d="M100,100 C95,85 98,70 105,60 C110,52 118,48 122,50 C126,52 128,58 125,65 C122,72 115,78 110,85 C108,90 105,95 100,100"
          />
          {/* Male outline glow */}
          <path className="garba-glow" style={glowStyle}
            d="M240,100 C245,85 242,70 235,60 C230,52 222,48 218,50 C214,52 212,58 215,65 C218,72 225,78 230,85 C232,90 235,95 240,100"
          />
        </g>

        <g ref={dancerGroupRef}>
          {/* ═══════════ PHASE 0: Female dancer (Chaniya Choli) ═══════════ */}
          <g className="garba-path" style={pathStyle}>
            {/* Head */}
            <ellipse cx="115" cy="78" rx="14" ry="16" />
            {/* Neck */}
            <path d="M110,94 L110,100" />
            <path d="M120,94 L120,100" />
            {/* Torso — fitted choli */}
            <path d="M100,100 C100,108 98,118 95,128" />
            <path d="M130,100 C130,108 132,118 135,128" />
            <path d="M100,100 L130,100" />
            {/* Choli waist */}
            <path d="M95,128 Q115,132 135,128" />
            {/* Chaniya (flowing skirt) — wide and graceful */}
            <path d="M95,128 C88,155 78,190 65,240" />
            <path d="M135,128 C142,155 152,190 165,240" />
            {/* Skirt bottom curve */}
            <path d="M65,240 Q115,248 165,240" />
            {/* Skirt fabric folds */}
            <path d="M90,140 C92,170 88,200 80,235" strokeWidth="0.8" opacity="0.5" />
            <path d="M115,133 C115,170 112,200 110,238" strokeWidth="0.8" opacity="0.5" />
            <path d="M130,140 C132,170 138,200 145,235" strokeWidth="0.8" opacity="0.5" />
            {/* Left arm raised (garba clap pose) */}
            <path d="M100,105 C90,98 82,88 78,78" />
            <path d="M78,78 C76,74 75,70 78,68" />
            {/* Right arm extended */}
            <path d="M130,105 C140,100 148,95 155,88" />
            <path d="M155,88 C158,86 160,84 158,82" />
            {/* Hand */}
            <circle cx="78" cy="67" r="4" strokeWidth="1.2" />
            <circle cx="158" cy="81" r="4" strokeWidth="1.2" />
          </g>

          {/* ═══════════ PHASE 1: Male dancer (Kediyu) ═══════════ */}
          <g className="garba-path" style={pathStyle}>
            {/* Head */}
            <ellipse cx="225" cy="72" rx="14" ry="16" />
            {/* Neck */}
            <path d="M220,88 L220,95" />
            <path d="M230,88 L230,95" />
            {/* Torso — kediyu (fitted upper) */}
            <path d="M208,95 C208,105 206,115 204,122" />
            <path d="M242,95 C242,105 244,115 246,122" />
            <path d="M208,95 L242,95" />
            {/* Kediyu flare at waist */}
            <path d="M204,122 Q225,126 246,122" />
            {/* Kediyu skirt section (short flare) */}
            <path d="M204,122 C200,135 196,148 194,158" />
            <path d="M246,122 C250,135 254,148 256,158" />
            <path d="M194,158 Q225,162 256,158" />
            {/* Dhoti/pants below */}
            <path d="M198,158 C196,180 195,210 192,240" />
            <path d="M252,158 C254,180 255,210 258,240" />
            {/* Pant folds */}
            <path d="M215,160 C214,185 213,210 212,240" strokeWidth="0.8" opacity="0.4" />
            <path d="M235,160 C236,185 237,210 238,240" strokeWidth="0.8" opacity="0.4" />
            {/* Left arm — raised with dandiya */}
            <path d="M208,100 C198,92 188,84 182,76" />
            <circle cx="182" cy="75" r="4" strokeWidth="1.2" />
            {/* Right arm — holding dandiya */}
            <path d="M242,100 C250,94 258,88 262,82" />
            <circle cx="262" cy="81" r="4" strokeWidth="1.2" />
          </g>

          {/* ═══════════ PHASE 2: Female details ═══════════ */}
          <g className="garba-path" style={{ ...goldPathStyle, strokeWidth: 0.9 }}>
            {/* Dupatta flowing from shoulder */}
            <path d="M130,102 C138,95 145,90 152,92 C158,94 162,100 165,108 C168,116 170,126 168,135" opacity="0.6" />
            <path d="M165,108 C170,115 175,125 172,135" strokeWidth="0.5" opacity="0.4" />
            {/* Hair — flowing down back */}
            <path d="M102,78 C98,82 95,90 94,100" strokeWidth="0.7" opacity="0.5" />
            <path d="M128,78 C130,82 130,86 129,92" strokeWidth="0.5" opacity="0.4" />
            {/* Necklace */}
            <path d="M108,95 Q115,100 122,95" />
            {/* Earring (left) */}
            <path d="M101,78 C99,82 100,84 102,83" strokeWidth="0.6" />
            {/* Bangles on raised hand */}
            <ellipse cx="80" cy="74" rx="5" ry="2" strokeWidth="0.5" />
            <ellipse cx="80" cy="76" rx="5" ry="2" strokeWidth="0.5" />
            {/* Waist chain (kamarpatta) */}
            <path d="M95,128 Q115,131 135,128" strokeWidth="0.7" />
            {/* Chaniya border design - small dots along bottom */}
            <circle cx="75" cy="238" r="1" opacity="0.4" />
            <circle cx="85" cy="240" r="1" opacity="0.4" />
            <circle cx="95" cy="241" r="1" opacity="0.4" />
            <circle cx="115" cy="243" r="1" opacity="0.4" />
            <circle cx="135" cy="241" r="1" opacity="0.4" />
            <circle cx="145" cy="240" r="1" opacity="0.4" />
            <circle cx="155" cy="238" r="1" opacity="0.4" />
          </g>

          {/* ═══════════ PHASE 3: Male details ═══════════ */}
          <g className="garba-path" style={{ ...goldPathStyle, strokeWidth: 0.9 }}>
            {/* Pagdi (turban / headwrap) */}
            <path d="M212,60 C216,55 224,53 232,55 C238,57 240,62 238,65" />
            <path d="M238,65 C240,60 238,55 234,54" strokeWidth="0.5" opacity="0.5" />
            {/* Pagdi tail */}
            <path d="M212,60 C208,65 206,72 208,78" strokeWidth="0.6" opacity="0.5" />
            {/* Neckline detail */}
            <path d="M218,95 Q225,99 232,95" />
            {/* Kediyu front pattern — mirror work hints */}
            <circle cx="220" cy="108" r="1.5" opacity="0.4" />
            <circle cx="225" cy="105" r="1.5" opacity="0.4" />
            <circle cx="230" cy="108" r="1.5" opacity="0.4" />
            <circle cx="225" cy="112" r="1.5" opacity="0.4" />
            {/* Angrakha neckline stitch */}
            <path d="M218,95 C222,102 228,102 232,95" strokeWidth="0.5" opacity="0.4" />
            {/* Feet detail */}
            <path d="M190,240 L186,244 L198,244 L196,240" strokeWidth="0.7" opacity="0.5" />
            <path d="M256,240 L252,244 L264,244 L260,240" strokeWidth="0.7" opacity="0.5" />
          </g>

          {/* ═══════════ PHASE 4: Dandiya sticks ═══════════ */}
          <g className="garba-path" style={{ ...pathStyle, stroke: GOLD, strokeWidth: 2 }}>
            {/* Female's right dandiya — extends from right hand toward center-top */}
            <path d="M158,82 L172,48" />
            {/* Dandiya grip end (female) */}
            <circle cx="158" cy="82" r="2.5" fill="none" strokeWidth="1" />
            {/* Male's left dandiya — extends from left hand toward center-top */}
            <path d="M182,76 L172,48" />
            {/* Dandiya grip end (male) */}
            <circle cx="182" cy="76" r="2.5" fill="none" strokeWidth="1" />
            {/* Contact point glow dot */}
            <circle cx="172" cy="48" r="3" fill="none" stroke={SAFFRON} strokeWidth="1" opacity="0.7" />

            {/* Female's left dandiya — held in raised left hand */}
            <path d="M78,68 L60,38" />
            <circle cx="78" cy="68" r="2.5" fill="none" strokeWidth="1" />
            {/* Male's right dandiya */}
            <path d="M262,82 L278,50" />
            <circle cx="262" cy="82" r="2.5" fill="none" strokeWidth="1" />
          </g>

          {/* ═══════════ PHASE 5: Foot shadows & ground ═══════════ */}
          <g className="garba-path" style={{ ...pathStyle, strokeWidth: 0.5 }}>
            {/* Female foot shadows */}
            <ellipse cx="85" cy="245" rx="18" ry="3" stroke={DARK} opacity="0.15" />
            <ellipse cx="140" cy="245" rx="18" ry="3" stroke={DARK} opacity="0.15" />
            {/* Male foot shadows */}
            <ellipse cx="195" cy="245" rx="16" ry="3" stroke={DARK} opacity="0.15" />
            <ellipse cx="258" cy="245" rx="16" ry="3" stroke={DARK} opacity="0.15" />
            {/* Ground line */}
            <path d="M40,248 Q170,252 300,248" stroke={COPPER} opacity="0.15" strokeWidth="0.4" />
          </g>
        </g>
      </svg>

      {/* Dandiya spark particles — at contact point */}
      {showSparks && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <GoldenSpark
              key={`spark-${sparksRound}-${i}`}
              delay={i * 0.05}
              style={{
                left: sparkCenter.left,
                top: sparkCenter.top,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Particle and diya positions ─────────────────────────────────────
const diyaPositions = [
  { left: '8%', bottom: '30%' },
  { left: '88%', bottom: '35%' },
  { left: '15%', bottom: '55%' },
  { left: '82%', bottom: '50%' },
  { left: '5%', bottom: '65%' },
  { left: '92%', bottom: '68%' },
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
export default function GarbaOverlay({ event, isOpen, onClose }) {
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
                style={{ backgroundColor: 'rgba(139,46,59,0.08)', color: MAROON }}
                whileHover={{ backgroundColor: 'rgba(139,46,59,0.15)', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Dusk sky gradient */}
              <DuskGradient />

              {/* Warm festive glow */}
              <WarmGlow />

              {/* Floating diyas */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {diyaPositions.map((pos, i) => (
                  <FloatingDiya key={`diya-${i}`} delay={i * 1.2} style={pos} />
                ))}
              </div>

              {/* Rangoli floor pattern — shows during drawing */}
              <RangoliFloor visible={animationPhase === 'drawing'} />

              {/* Corner accents — maroon + gold */}
              <svg className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="0" y1="20" x2="55" y2="20" stroke={MAROON} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="20" y1="0" x2="20" y2="55" stroke={MAROON} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="0" y1="28" x2="32" y2="28" stroke={GOLD} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>
              <svg className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-25" viewBox="0 0 100 100">
                <motion.line x1="100" y1="80" x2="45" y2="80" stroke={MAROON} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="80" y1="100" x2="80" y2="45" stroke={MAROON} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="100" y1="72" x2="55" y2="72" stroke={GOLD} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>

              {/* ── Scrollable content ── */}
              <div className="absolute inset-0 overflow-y-auto">
                <div className="min-h-full flex flex-col items-center justify-center pt-12 pb-10 px-4">

                  {/* ── Dancers SVG area ── */}
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    animate={
                      animationPhase === 'details'
                        ? { opacity: 0.05, scale: 0.3 }
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
                        color: MAROON,
                      }}
                    >
                      રાસ ગરબા · An Evening of Dance
                    </motion.p>

                    <GarbaDancersSVG onComplete={handleDrawingComplete} />

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
                        color: DARK,
                        letterSpacing: '0.04em',
                      }}
                    >
                      Raas Garba
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 0.55 : 0 }}
                      transition={{ delay: 4.0, duration: 0.7 }}
                      className="mt-2 text-center"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '13px',
                        color: MUTED,
                        letterSpacing: '0.12em',
                      }}
                    >
                      Rhythm, joy & togetherness under the stars
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
                        {/* Self-drawing maroon divider */}
                        <motion.svg width="80" height="2" viewBox="0 0 80 2" className="mb-10">
                          <motion.line x1="0" y1="1" x2="80" y2="1" stroke={MAROON} strokeWidth="0.5"
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
                            color: DARK, letterSpacing: '0.06em',
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
                            fontSize: '13px', color: MUTED,
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
                            color: MAROON, letterSpacing: '0.08em',
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
                          <motion.line x1="0" y1="1" x2="40" y2="1" stroke={MAROON} strokeWidth="0.5"
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
                            color: DARK, letterSpacing: '0.03em',
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
                            fontSize: '13px', color: MUTED, letterSpacing: '0.04em',
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
                                <pattern id="garba-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8B89D" strokeWidth="0.3" opacity="0.5" />
                                </pattern>
                              </defs>
                              <rect width="320" height="200" fill="url(#garba-grid)" />

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
                              <g fill={MAROON} opacity="0.1">
                                <circle cx="50" cy="40" r="10" />
                                <circle cx="280" cy="35" r="12" />
                                <circle cx="40" cy="160" r="9" />
                                <circle cx="260" cy="170" r="11" />
                                <circle cx="120" cy="45" r="7" />
                                <circle cx="210" cy="160" r="8" />
                              </g>

                              {/* Buildings */}
                              <g fill={MAROON} opacity="0.05">
                                <rect x="90" y="115" width="28" height="18" rx="2" />
                                <rect x="200" y="70" width="24" height="22" rx="2" />
                                <rect x="100" y="55" width="18" height="25" rx="2" />
                                <rect x="215" y="120" width="30" height="20" rx="2" />
                              </g>

                              {/* Centre pin */}
                              <g>
                                <circle cx="160" cy="100" r="22" fill={MAROON} opacity="0.06">
                                  <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.06;0.02;0.06" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="160" cy="100" r="14" fill={MAROON} opacity="0.1">
                                  <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.1;0.05;0.1" dur="3s" repeatCount="indefinite" />
                                </circle>

                                <g transform="translate(160, 96)">
                                  <path
                                    d="M0 -6 C-2.5 -10, -7 -10, -8.5 -6.5 C-10 -3, -10 0.5, 0 7 C10 0.5, 10 -3, 8.5 -6.5 C7 -10, 2.5 -10, 0 -6 Z"
                                    fill={MAROON} stroke="#FAF5ED" strokeWidth="0.8"
                                  />
                                  <circle cx="0" cy="-1.5" r="1.5" fill="#FAF5ED" />
                                </g>
                              </g>

                              <text x="160" y="128" textAnchor="middle" fill={DARK} fontSize="8"
                                fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="500" letterSpacing="0.08em">
                                {event.venue}
                              </text>
                              <text x="160" y="185" textAnchor="middle" fill={MUTED} fontSize="6"
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
                            textTransform: 'uppercase', color: MAROON,
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
                              textTransform: 'uppercase', color: MUTED,
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
