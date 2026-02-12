import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/**
 * LaganOverlay – The sacred Hindu wedding ceremony
 * Mandap line-drawing, bride & groom silhouettes,
 * agni (sacred fire), phera motion, golden particles,
 * and sacred geometry mandala backdrop
 */

// ── Palette - Warm Indian Wedding Tones ─────────────────────────────
const CREAM      = '#F5E6D3'   // Creamy Beige
const GOLD       = '#C65D1E'   // Burnt Orange
const WARM       = '#D67347'   // Warm Burnt Orange
const IVORY      = '#EED9C4'   // Soft Beige
const DEEP_RED   = '#A84832'   // Deep Terracotta
const MUTED_RED  = '#C97A56'   // Terracotta
const FIRE_GOLD  = '#E89A6F'   // Light Terracotta
const FIRE_ORANGE = '#D4774A'  // Warm Terracotta
const DARK       = '#3E2A24'   // Deep Warm Brown
const MUTED      = '#7A5B4F'   // Medium Brown
const SAFFRON    = '#E89A6F'   // Light Terracotta
const COPPER     = '#E8B89D'   // Soft Highlight

// ── Sacred Fire (Agni) ──────────────────────────────────────────────
function AgniFlame({ visible }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', bottom: '28%', transform: 'translateX(-50%)' }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={visible
        ? { opacity: 1, scale: 1 }
        : { opacity: 0, scale: 0.5 }
      }
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none" style={{ overflow: 'visible' }}>
        {/* Outer glow */}
        <ellipse cx="30" cy="50" rx="28" ry="22" fill={FIRE_GOLD} opacity="0.08">
          <animate attributeName="rx" values="28;32;28" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.08;0.12;0.08" dur="2s" repeatCount="indefinite" />
        </ellipse>

        {/* Main flame — centre */}
        <path d="M30,65 C26,55 18,45 22,32 C24,26 28,18 30,8 C32,18 36,26 38,32 C42,45 34,55 30,65Z"
          fill={FIRE_GOLD} opacity="0.7">
          <animate attributeName="d"
            values="M30,65 C26,55 18,45 22,32 C24,26 28,18 30,8 C32,18 36,26 38,32 C42,45 34,55 30,65Z;
                    M30,65 C24,53 16,44 20,30 C23,24 27,16 30,6 C33,16 37,24 40,30 C44,44 36,53 30,65Z;
                    M30,65 C26,55 18,45 22,32 C24,26 28,18 30,8 C32,18 36,26 38,32 C42,45 34,55 30,65Z"
            dur="1.8s" repeatCount="indefinite" />
        </path>

        {/* Inner flame — bright core */}
        <path d="M30,62 C28,55 24,48 26,40 C27,36 29,30 30,22 C31,30 33,36 34,40 C36,48 32,55 30,62Z"
          fill={SAFFRON} opacity="0.85">
          <animate attributeName="d"
            values="M30,62 C28,55 24,48 26,40 C27,36 29,30 30,22 C31,30 33,36 34,40 C36,48 32,55 30,62Z;
                    M30,62 C27,54 22,47 25,38 C27,34 29,28 30,20 C31,28 33,34 35,38 C38,47 33,54 30,62Z;
                    M30,62 C28,55 24,48 26,40 C27,36 29,30 30,22 C31,30 33,36 34,40 C36,48 32,55 30,62Z"
            dur="1.4s" repeatCount="indefinite" />
        </path>

        {/* White-hot tip */}
        <path d="M30,55 C29,50 28,46 29,42 C29.5,39 30,35 30,30 C30,35 30.5,39 31,42 C32,46 31,50 30,55Z"
          fill="#F5E6C8" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.4;0.6" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Tiny embers */}
        <circle cx="24" cy="38" r="1" fill={FIRE_ORANGE} opacity="0.5">
          <animate attributeName="cy" values="38;28;18" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.3;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="36" cy="35" r="0.8" fill={FIRE_GOLD} opacity="0.4">
          <animate attributeName="cy" values="35;22;12" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.2;0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="28" r="0.7" fill={SAFFRON} opacity="0.3">
          <animate attributeName="cy" values="28;15;5" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.15;0" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  )
}

// ── Rising Golden Particle ──────────────────────────────────────────
function SacredParticle({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.7, 0.9, 0.5, 0],
        y: [0, -40, -90, -150, -220],
        x: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40, 0],
        scale: [0.5, 1, 1.1, 0.8, 0.3],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: 2 + Math.random() * 3,
          height: 2 + Math.random() * 3,
          backgroundColor: GOLD,
          boxShadow: `0 0 4px ${GOLD}, 0 0 8px ${SAFFRON}`,
        }}
      />
    </motion.div>
  )
}

// ── Smoke Wisp ──────────────────────────────────────────────────────
function SmokeWisp({ delay, style }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.12, 0.08, 0.04, 0],
        y: [0, -30, -65, -110, -160],
        x: [0, 5, -3, 8, 2],
        scale: [0.7, 1, 1.3, 1.6, 2],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: 20,
          height: 20,
          background: `radial-gradient(circle, rgba(201,168,91,0.15) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

// ── Sacred Firelight Glow ───────────────────────────────────────────
function FirelightGlow() {
  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ duration: 2 }}
        style={{
          background: `radial-gradient(ellipse at 50% 65%, rgba(232,168,48,0.07) 0%, transparent 55%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse at 50% 60%, rgba(212,120,42,0.08) 0%, transparent 45%)`,
        }}
      />
    </>
  )
}

// ── Sacred Geometry Mandala (backdrop) ──────────────────────────────
function SacredMandala({ visible }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
      animate={visible
        ? { opacity: 0.06, scale: 1, rotate: 15 }
        : { opacity: 0, scale: 0.7, rotate: 0 }
      }
      transition={{ duration: 3, ease: 'easeOut' }}
    >
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
        {/* Outer circle */}
        <circle cx="200" cy="200" r="190" stroke={GOLD} strokeWidth="0.4" />
        <circle cx="200" cy="200" r="175" stroke={GOLD} strokeWidth="0.3" />
        <circle cx="200" cy="200" r="155" stroke={GOLD} strokeWidth="0.3" />
        {/* Inner circles */}
        <circle cx="200" cy="200" r="120" stroke={GOLD} strokeWidth="0.4" />
        <circle cx="200" cy="200" r="80" stroke={GOLD} strokeWidth="0.3" />
        <circle cx="200" cy="200" r="40" stroke={GOLD} strokeWidth="0.4" />
        {/* Radial lines */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5) * Math.PI / 180
          const x1 = 200 + 40 * Math.cos(angle)
          const y1 = 200 + 40 * Math.sin(angle)
          const x2 = 200 + 190 * Math.cos(angle)
          const y2 = 200 + 190 * Math.sin(angle)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth="0.2" />
        })}
        {/* Lotus petals — inner ring */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45) * Math.PI / 180
          const cx = 200 + 60 * Math.cos(angle)
          const cy = 200 + 60 * Math.sin(angle)
          return (
            <ellipse key={`lp${i}`} cx={cx} cy={cy} rx="12" ry="6"
              stroke={GOLD} strokeWidth="0.3" fill="none"
              transform={`rotate(${i * 45 + 90}, ${cx}, ${cy})`} />
          )
        })}
        {/* Lotus petals — outer ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180
          const cx = 200 + 140 * Math.cos(angle)
          const cy = 200 + 140 * Math.sin(angle)
          return (
            <ellipse key={`op${i}`} cx={cx} cy={cy} rx="16" ry="7"
              stroke={GOLD} strokeWidth="0.25" fill="none"
              transform={`rotate(${i * 30 + 90}, ${cx}, ${cy})`} />
          )
        })}
        {/* Centre flower */}
        <circle cx="200" cy="200" r="15" stroke={GOLD} strokeWidth="0.4" />
        <circle cx="200" cy="200" r="6" fill={GOLD} opacity="0.15" />
      </svg>
    </motion.div>
  )
}

// ── Tiny Diya Light for Mandap Pillars ──────────────────────────────
function PillarDiya({ cx, cy, delay }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="3" fill={FIRE_GOLD} opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.35;0.2" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="r" values="3;4;3" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="1.5" fill={SAFFRON} opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  )
}

// ── Main SVG: Mandap + Couple with GSAP line-drawing ────────────────
function LaganSVG({ onComplete }) {
  const svgRef = useRef(null)
  const glowRef = useRef(null)
  const coupleRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const phaseEls = svg.querySelectorAll('.lagan-path')
    const glowPaths = glowRef.current?.querySelectorAll('.lagan-glow')

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

    // Phase 0: Mandap canopy top
    if (phases[0]) tl.to(phases[0], {
      strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut',
    })

    // Phase 1: Mandap pillars
    if (phases[1]) tl.to(phases[1], {
      strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut',
    }, '-=0.7')

    // Phase 2: Floral strings & mandap decoration
    if (phases[2]) tl.to(phases[2], {
      strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut',
    }, '-=0.4')

    // Phase 3: Havan kund (sacred fire pit)
    if (phases[3]) tl.to(phases[3], {
      strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut',
    }, '-=0.3')

    // Phase 4: Bride silhouette
    if (phases[4]) tl.to(phases[4], {
      strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut',
    }, '-=0.3')

    // Phase 5: Groom silhouette
    if (phases[5]) tl.to(phases[5], {
      strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut',
    }, '-=0.8')

    // Phase 6: Couple details (jewelry, fabric, dupatta connection)
    if (phases[6]) tl.to(phases[6], {
      strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut',
    }, '-=0.5')

    // Phase 7: Feet & shadows
    if (phases[7]) tl.to(phases[7], {
      strokeDashoffset: 0, duration: 0.5, ease: 'power2.out',
    }, '-=0.2')

    // Gentle phera step — the couple sways forward together
    tl.call(() => {
      const couple = coupleRef.current
      if (couple) {
        // Slow, sacred forward step movement
        gsap.to(couple, {
          x: 3, y: -2,
          rotation: 1.5,
          transformOrigin: '50% 95%',
          duration: 1.2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 1,
        })
      }
    })

    tl.to({}, { duration: 2.6 }) // duration of phera sway

    // Show glow layer
    tl.call(() => {
      if (glowPaths) {
        glowPaths.forEach((glow, i) => {
          gsap.to(glow, {
            strokeDashoffset: 0,
            opacity: 0.25,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
          })
        })
      }
    })

    tl.to({}, { duration: 0.8 })
    tl.call(() => onComplete?.())

    return () => tl.kill()
  }, [onComplete])

  const pathStyle = {
    fill: 'none',
    stroke: GOLD,
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  const redPathStyle = {
    ...pathStyle,
    stroke: DEEP_RED,
    strokeWidth: 1.5,
  }

  const detailStyle = {
    ...pathStyle,
    strokeWidth: 0.8,
    stroke: GOLD,
  }

  const glowStyle = {
    fill: 'none',
    stroke: GOLD,
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    filter: 'url(#lagan-glow)',
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 380 360"
        className="w-72 h-64 md:w-96 md:h-80"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="lagan-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer */}
        <g ref={glowRef} opacity="0.2">
          <path className="lagan-glow" style={glowStyle}
            d="M60,90 Q190,30 320,90" />
          <path className="lagan-glow" style={glowStyle}
            d="M140,280 C140,260 150,250 155,245" />
          <path className="lagan-glow" style={glowStyle}
            d="M240,280 C240,260 230,250 225,245" />
        </g>

        {/* ═══════════ PHASE 0: Mandap Canopy ═══════════ */}
        <g className="lagan-path" style={pathStyle}>
          {/* Top dome / canopy */}
          <path d="M60,95 Q110,40 190,30 Q270,40 320,95" strokeWidth="1.6" />
          {/* Canopy inner curve */}
          <path d="M75,95 Q130,50 190,42 Q250,50 305,95" strokeWidth="0.8" opacity="0.5" />
          {/* Peak ornament — kalash */}
          <path d="M186,32 L190,22 L194,32" strokeWidth="1" />
          <circle cx="190" cy="20" r="4" strokeWidth="0.8" />
          {/* Ridge lines */}
          <path d="M120,65 Q190,35 260,65" strokeWidth="0.4" opacity="0.4" />
        </g>

        {/* ═══════════ PHASE 1: Mandap Pillars ═══════════ */}
        <g className="lagan-path" style={pathStyle}>
          {/* Left pillar */}
          <path d="M70,95 L70,290" strokeWidth="1.6" />
          <path d="M62,95 L78,95" strokeWidth="1" />
          <path d="M62,290 L78,290" strokeWidth="1" />
          {/* Right pillar */}
          <path d="M310,95 L310,290" strokeWidth="1.6" />
          <path d="M302,95 L318,95" strokeWidth="1" />
          <path d="M302,290 L318,290" strokeWidth="1" />
          {/* Inner left pillar */}
          <path d="M110,95 L110,285" strokeWidth="0.8" opacity="0.5" />
          {/* Inner right pillar */}
          <path d="M270,95 L270,285" strokeWidth="0.8" opacity="0.5" />
          {/* Base connection */}
          <path d="M62,290 Q190,298 318,290" strokeWidth="0.6" opacity="0.4" />
        </g>

        {/* ═══════════ PHASE 2: Floral Strings & Decoration ═══════════ */}
        <g className="lagan-path" style={{ ...detailStyle, stroke: SAFFRON }}>
          {/* Floral garlands hanging from canopy */}
          <path d="M85,95 Q90,115 85,130" strokeWidth="0.6" opacity="0.5" />
          <path d="M100,92 Q105,112 100,128" strokeWidth="0.6" opacity="0.5" />
          <path d="M280,92 Q275,112 280,128" strokeWidth="0.6" opacity="0.5" />
          <path d="M295,95 Q290,115 295,130" strokeWidth="0.6" opacity="0.5" />
          {/* Centre garland swag */}
          <path d="M110,92 Q150,108 190,100 Q230,108 270,92" strokeWidth="0.7" opacity="0.45" />
          {/* Flower dots on garlands */}
          <circle cx="85" cy="110" r="1.5" fill={SAFFRON} opacity="0.3" />
          <circle cx="85" cy="120" r="1.5" fill={SAFFRON} opacity="0.25" />
          <circle cx="100" cy="108" r="1.5" fill={SAFFRON} opacity="0.3" />
          <circle cx="100" cy="118" r="1.5" fill={SAFFRON} opacity="0.25" />
          <circle cx="280" cy="108" r="1.5" fill={SAFFRON} opacity="0.3" />
          <circle cx="280" cy="118" r="1.5" fill={SAFFRON} opacity="0.25" />
          <circle cx="295" cy="110" r="1.5" fill={SAFFRON} opacity="0.3" />
          <circle cx="295" cy="120" r="1.5" fill={SAFFRON} opacity="0.25" />
          {/* Toran (decorative door hanging) */}
          <path d="M130,95 Q145,105 160,95 Q175,105 190,95 Q205,105 220,95 Q235,105 250,95"
            strokeWidth="0.5" opacity="0.4" />
        </g>

        {/* Diya lights on pillars */}
        <PillarDiya cx="70" cy="140" delay={0} />
        <PillarDiya cx="70" cy="200" delay={0.5} />
        <PillarDiya cx="310" cy="140" delay={0.3} />
        <PillarDiya cx="310" cy="200" delay={0.8} />

        {/* ═══════════ PHASE 3: Havan Kund (sacred fire pit) ═══════════ */}
        <g className="lagan-path" style={{ ...pathStyle, stroke: COPPER }}>
          {/* Fire pit — trapezoidal vessel */}
          <path d="M170,275 L165,260 L215,260 L210,275 Z" strokeWidth="1.2" />
          {/* Inner edge */}
          <path d="M172,272 L168,262 L212,262 L208,272 Z" strokeWidth="0.6" opacity="0.5" />
          {/* Base platform */}
          <path d="M158,278 L222,278" strokeWidth="0.8" opacity="0.6" />
          <path d="M162,282 L218,282" strokeWidth="0.5" opacity="0.4" />
          {/* Samagri offerings beside */}
          <ellipse cx="152" cy="270" rx="6" ry="4" strokeWidth="0.5" opacity="0.35" />
          <ellipse cx="228" cy="270" rx="6" ry="4" strokeWidth="0.5" opacity="0.35" />
        </g>

        <g ref={coupleRef}>
          {/* ═══════════ PHASE 4: Bride (left — lehenga & dupatta) ═══════════ */}
          <g className="lagan-path" style={redPathStyle}>
            {/* Head */}
            <ellipse cx="155" cy="148" rx="12" ry="14" />
            {/* Neck */}
            <path d="M150,162 L150,168" />
            <path d="M160,162 L160,168" />
            {/* Torso — choli */}
            <path d="M142,168 C142,178 140,188 138,195" />
            <path d="M168,168 C168,178 170,188 172,195" />
            <path d="M142,168 L168,168" />
            {/* Choli waist */}
            <path d="M138,195 Q155,199 172,195" />
            {/* Lehenga — flowing volume */}
            <path d="M138,195 C132,215 125,238 118,262" />
            <path d="M172,195 C178,215 182,238 186,262" />
            {/* Lehenga bottom */}
            <path d="M118,262 Q152,270 186,262" />
            {/* Fabric folds */}
            <path d="M140,200 C138,220 134,240 128,258" strokeWidth="0.8" opacity="0.45" />
            <path d="M155,200 C155,225 152,245 150,262" strokeWidth="0.8" opacity="0.45" />
            <path d="M168,200 C170,220 175,240 180,258" strokeWidth="0.8" opacity="0.45" />
            {/* Left arm — folded, holding flowers */}
            <path d="M142,172 C135,168 128,170 125,175" />
            <circle cx="125" cy="176" r="3.5" strokeWidth="1" />
            {/* Right arm — extended toward groom */}
            <path d="M168,172 C175,170 180,172 185,175" />
            <circle cx="185" cy="176" r="3.5" strokeWidth="1" />
          </g>

          {/* ═══════════ PHASE 5: Groom (right — sherwani) ═══════════ */}
          <g className="lagan-path" style={pathStyle}>
            {/* Head */}
            <ellipse cx="228" cy="140" rx="13" ry="15" />
            {/* Neck */}
            <path d="M222,155 L222,162" />
            <path d="M234,155 L234,162" />
            {/* Torso — sherwani front */}
            <path d="M212,162 C212,175 210,188 208,198" />
            <path d="M244,162 C244,175 246,188 248,198" />
            <path d="M212,162 L244,162" />
            {/* Sherwani closure line */}
            <path d="M228,162 L228,198" strokeWidth="0.7" opacity="0.5" />
            {/* Waist sash */}
            <path d="M208,198 Q228,202 248,198" />
            {/* Churidar / lower body */}
            <path d="M210,198 C208,218 206,240 204,262" />
            <path d="M246,198 C248,218 250,240 252,262" />
            {/* Sherwani extension below waist */}
            <path d="M210,198 C212,210 210,225 206,238" strokeWidth="0.7" opacity="0.4" />
            <path d="M246,198 C244,210 246,225 250,238" strokeWidth="0.7" opacity="0.4" />
            {/* Left arm — toward bride */}
            <path d="M212,168 C205,165 198,168 195,172" />
            <circle cx="195" cy="173" r="3.5" strokeWidth="1" />
            {/* Right arm down */}
            <path d="M244,168 C250,172 254,178 256,185" />
            <circle cx="256" cy="186" r="3.5" strokeWidth="1" />
          </g>

          {/* ═══════════ PHASE 6: Details — jewelry, fabric connection ═══════════ */}
          <g className="lagan-path" style={{ ...detailStyle, stroke: GOLD }}>
            {/* Bride's dupatta draping over head and flowing back */}
            <path d="M143,140 C140,135 138,132 140,128 C142,125 148,122 155,122 C162,122 168,125 170,128"
              stroke={DEEP_RED} strokeWidth="0.7" opacity="0.5" />
            <path d="M140,128 C135,140 130,155 128,170 C126,180 125,195 130,205"
              stroke={DEEP_RED} strokeWidth="0.6" opacity="0.4" />
            {/* Dupatta pallu connection to groom (sacred bond — gathjod) */}
            <path d="M185,175 C190,174 195,173 195,172"
              stroke={DEEP_RED} strokeWidth="0.9" opacity="0.6" />
            {/* Bride's necklace */}
            <path d="M148,163 Q155,167 162,163" />
            {/* Maang tikka */}
            <path d="M155,135 L155,132" strokeWidth="0.6" />
            <circle cx="155" cy="131" r="1.5" fill={GOLD} opacity="0.3" />
            {/* Bride's bangles */}
            <ellipse cx="125" cy="173" rx="5" ry="2" strokeWidth="0.5" />
            <ellipse cx="125" cy="175" rx="5" ry="2" strokeWidth="0.5" />
            {/* Groom's safa / pagdi */}
            <path d="M216,128 C220,122 228,118 236,120 C242,122 245,128 244,134"
              strokeWidth="0.7" />
            <path d="M244,134 C246,130 244,124 240,121" strokeWidth="0.4" opacity="0.4" />
            {/* Safa kalgi (ornament) */}
            <path d="M235,119 L237,112 L239,119" strokeWidth="0.5" />
            <circle cx="237" cy="111" r="1.5" fill={GOLD} opacity="0.25" />
            {/* Groom's sehra fringe */}
            <path d="M218,130 L216,138" strokeWidth="0.3" opacity="0.3" />
            <path d="M221,129 L219,137" strokeWidth="0.3" opacity="0.3" />
            <path d="M224,128 L222,136" strokeWidth="0.3" opacity="0.3" />
            {/* Haar/varmala — garland exchange hint */}
            <path d="M155,170 Q165,180 175,178 Q185,176 195,168"
              stroke={SAFFRON} strokeWidth="0.6" opacity="0.5" />
            {/* Sherwani button details */}
            <circle cx="228" cy="175" r="1" opacity="0.35" />
            <circle cx="228" cy="182" r="1" opacity="0.35" />
            <circle cx="228" cy="189" r="1" opacity="0.35" />
          </g>

          {/* ═══════════ PHASE 7: Feet & shadows ═══════════ */}
          <g className="lagan-path" style={{ ...pathStyle, strokeWidth: 0.5 }}>
            {/* Bride feet */}
            <path d="M135,262 L130,267 L145,267 L142,262" strokeWidth="0.6" opacity="0.5" />
            <path d="M162,262 L158,267 L172,267 L170,262" strokeWidth="0.6" opacity="0.5" />
            {/* Groom feet */}
            <path d="M218,262 L214,267 L228,267 L226,262" strokeWidth="0.6" opacity="0.5" />
            <path d="M240,262 L236,267 L250,267 L248,262" strokeWidth="0.6" opacity="0.5" />
            {/* Bride shadow */}
            <ellipse cx="152" cy="269" rx="28" ry="4" stroke={DARK} opacity="0.1" strokeWidth="0.4" />
            {/* Groom shadow */}
            <ellipse cx="232" cy="269" rx="25" ry="4" stroke={DARK} opacity="0.1" strokeWidth="0.4" />
            {/* Ground line */}
            <path d="M50,272 Q190,280 330,272" stroke={COPPER} opacity="0.12" strokeWidth="0.4" />
          </g>
        </g>
      </svg>
    </div>
  )
}

// ── Particle positions ──────────────────────────────────────────────
const sacredParticlePositions = [
  { left: '44%', bottom: '32%' },
  { left: '50%', bottom: '30%' },
  { left: '56%', bottom: '34%' },
  { left: '47%', bottom: '28%' },
  { left: '53%', bottom: '26%' },
  { left: '42%', bottom: '35%' },
  { left: '58%', bottom: '33%' },
  { left: '48%', bottom: '38%' },
]

const smokePositions = [
  { left: '48%', bottom: '36%' },
  { left: '52%', bottom: '38%' },
  { left: '50%', bottom: '34%' },
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
export default function LaganOverlay({ event, isOpen, onClose }) {
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
            transition={{ duration: 0.6 }}
            style={{ backgroundColor: 'rgba(61,50,41,0.45)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
          />

          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
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

              {/* Sacred firelight glow */}
              <FirelightGlow />

              {/* Sacred mandala backdrop */}
              <SacredMandala visible={animationPhase === 'drawing'} />

              {/* Agni flame — visible after mandap draws */}
              <AgniFlame visible={animationPhase === 'drawing'} />

              {/* Rising golden particles from fire */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {sacredParticlePositions.map((pos, i) => (
                  <SacredParticle key={`sp-${i}`} delay={2.5 + i * 0.6} style={pos} />
                ))}
              </div>

              {/* Smoke wisps */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {smokePositions.map((pos, i) => (
                  <SmokeWisp key={`smoke-${i}`} delay={3 + i * 1.5} style={pos} />
                ))}
              </div>

              {/* Corner accents — sacred gold */}
              <svg className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-20" viewBox="0 0 100 100">
                <motion.line x1="0" y1="20" x2="55" y2="20" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="20" y1="0" x2="20" y2="55" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="0" y1="28" x2="32" y2="28" stroke={SAFFRON} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>
              <svg className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-20" viewBox="0 0 100 100">
                <motion.line x1="100" y1="80" x2="45" y2="80" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                <motion.line x1="80" y1="100" x2="80" y2="45" stroke={GOLD} strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                <motion.line x1="100" y1="72" x2="55" y2="72" stroke={SAFFRON} strokeWidth="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7 }} />
              </svg>

              {/* ── Scrollable content ── */}
              <div className="absolute inset-0 overflow-y-auto">
                <div className="min-h-full flex flex-col items-center justify-center pt-12 pb-10 px-4">

                  {/* ── Lagan SVG area ── */}
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    animate={
                      animationPhase === 'details'
                        ? { opacity: 0.04, scale: 0.3 }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
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
                      शुभ विवाह · The Sacred Union
                    </motion.p>

                    <LaganSVG onComplete={handleDrawingComplete} />

                    {/* Ceremony label */}
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 1 : 0 }}
                      transition={{ delay: 3.8, duration: 0.8 }}
                      className="mt-5 text-center"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '30px',
                        fontWeight: 500,
                        color: DARK,
                        letterSpacing: '0.05em',
                      }}
                    >
                      The Wedding Ceremony
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationPhase === 'drawing' ? 0.5 : 0 }}
                      transition={{ delay: 4.2, duration: 0.7 }}
                      className="mt-2 text-center"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '13px',
                        color: MUTED,
                        letterSpacing: '0.12em',
                      }}
                    >
                      Two souls, seven vows, one eternal bond
                    </motion.p>
                  </motion.div>

                  {/* ── Event Details ── */}
                  <AnimatePresence>
                    {animationPhase === 'details' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
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
                          transition={{ delay: 0.4, duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
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
                                <pattern id="lagan-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8B89D" strokeWidth="0.3" opacity="0.5" />
                                </pattern>
                              </defs>
                              <rect width="320" height="200" fill="url(#lagan-grid)" />

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
