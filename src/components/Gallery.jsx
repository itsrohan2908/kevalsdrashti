import { useState, useEffect, useRef, useCallback, useMemo, forwardRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'

/**
 * Gallery Component - Pinterest-Style Masonry Layout
 * 
 * Features:
 * - Pinterest-style masonry grid
 * - Romantic minimal aesthetic
 * - Soft animations and hover effects
 * - Lightbox with keyboard navigation
 * - Floating hearts/petals
 * - Fully responsive (4/3/2 columns)
 * - Lazy loading optimized
 */

// Sample media data with varying heights for masonry effect
const defaultMedia = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    srcset: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400 400w, https://images.unsplash.com/photo-1519741497674-611481863552?w=800 800w, https://images.unsplash.com/photo-1519741497674-611481863552?w=1200 1200w',
    alt: 'Couple walking on beach at sunset',
    caption: 'Our first vacation together',
    height: 'tall', // tall | medium | short
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    srcset: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400 400w, https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800 800w',
    alt: 'Wedding rings on flower petals',
    caption: 'The rings we chose together',
    height: 'medium',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    srcset: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400 400w, https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800 800w',
    alt: 'Bride and groom holding hands',
    caption: 'Forever starts now',
    height: 'short',
  },
  {
    id: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    srcset: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400 400w, https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800 800w',
    alt: 'Romantic moment',
    caption: 'Precious memories',
    height: 'tall',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    srcset: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400 400w, https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800 800w',
    alt: 'Beautiful flower bouquet',
    caption: 'Our chosen bouquet',
    height: 'medium',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800',
    srcset: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=400 400w, https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800 800w',
    alt: 'Couple laughing together',
    caption: 'Always making each other laugh',
    height: 'short',
  },
  {
    id: 7,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
    srcset: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400 400w, https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800 800w',
    alt: 'Romantic dinner setting',
    caption: 'Anniversary dinner',
    height: 'tall',
  },
  {
    id: 8,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800',
    srcset: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400 400w, https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800 800w',
    alt: 'Wedding venue exterior',
    caption: 'Where we\'ll say I do',
    height: 'medium',
  },
  {
    id: 9,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
    srcset: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400 400w, https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800 800w',
    alt: 'Romantic embrace',
    caption: 'Together forever',
    height: 'short',
  },
  {
    id: 10,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    srcset: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400 400w, https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800 800w',
    alt: 'Sunset love',
    caption: 'Golden hour magic',
    height: 'tall',
  },
  {
    id: 11,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    srcset: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400 400w, https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800 800w',
    alt: 'Sweet moments',
    caption: 'Every moment counts',
    height: 'medium',
  },
]

// Floating Hearts/Petals Background Animation
function FloatingElements() {
  const elements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 40 - 20],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{
            left: `${el.x}%`,
            bottom: -20,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path 
              fillRule="evenodd" 
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
              clipRule="evenodd" 
              fill="#F4C5B8" 
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// Premium petal & leaf colors - soft, calming palette
const petalColors = [
  { fill: '#F4C5B8', opacity: 0.95 }, // soft blush - increased opacity
  { fill: '#E8A4A8', opacity: 0.9 }, // deeper pink
  { fill: '#D4885A', opacity: 0.85 }, // warm gold
  { fill: '#C65D1E', opacity: 0.8 }, // terracotta
  { fill: '#B8956A', opacity: 0.85 }, // golden beige
]

// Petal/Leaf shapes - realistic and varied
const petalShapes = [
  // Rose petal
  (color) => (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path 
        d="M8 0C5 0 2 3 2 7C2 11 5 15 8 18C11 15 14 11 14 7C14 3 11 0 8 0Z" 
        fill={color.fill} 
        opacity={color.opacity}
      />
      <path 
        d="M8 2C6 2 4 4 4 7C4 10 6 13 8 15C10 13 12 10 12 7C12 4 10 2 8 2Z" 
        fill={color.fill} 
        opacity={color.opacity * 0.6}
      />
    </svg>
  ),
  // Small leaf
  (color) => (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path 
        d="M7 0C3 0 0 4 0 8C0 12 3 16 7 16C7 12 7 8 7 4C9 6 11 8 14 8C14 4 11 0 7 0Z" 
        fill={color.fill} 
        opacity={color.opacity}
      />
    </svg>
  ),
  // Cherry blossom petal
  (color) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <ellipse 
        cx="7.5" 
        cy="5" 
        rx="4" 
        ry="6" 
        fill={color.fill} 
        opacity={color.opacity}
      />
      <ellipse 
        cx="7.5" 
        cy="10" 
        rx="3" 
        ry="4" 
        fill={color.fill} 
        opacity={color.opacity * 0.7}
      />
    </svg>
  ),
]

// Single petal particle - natural floating animation
function SwipePetal({ x, y, color, delay, shapeIndex }) {
  // Memoize random values to prevent recalculation on re-renders
  const animationValues = useMemo(() => ({
    floatDistance: 100 + Math.random() * 150,
    driftX: Math.random() * 200 - 100,
    driftY: Math.random() * 60 - 30,
    initialRotate: Math.random() * 360,
    initialScale: 0.4 + Math.random() * 0.5,
    duration: 6 + Math.random() * 5,
    sway: Math.random() * 40 - 20,
  }), [])
  
  const finalRotate = useMemo(() => 
    animationValues.initialRotate + (Math.random() * 480 - 240)
  , [animationValues.initialRotate])
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: animationValues.initialScale, 
        rotate: animationValues.initialRotate,
        x: 0,
        y: 0,
      }}
      animate={{ 
        opacity: [0, 0.95, 0.85, 0.7, 0.5, 0.2, 0], 
        y: [0, animationValues.floatDistance * 0.3, animationValues.floatDistance * 0.6, animationValues.floatDistance],
        x: [0, animationValues.driftX * 0.3 + animationValues.sway, animationValues.driftX * 0.7 - animationValues.sway, animationValues.driftX],
        scale: [animationValues.initialScale, 0.95, 0.85, 0.7, 0.5, 0.3, 0.2],
        rotate: [
          animationValues.initialRotate, 
          animationValues.initialRotate + 90, 
          animationValues.initialRotate + 200,
          finalRotate
        ],
      }}
      transition={{ 
        duration: animationValues.duration, 
        delay, 
        ease: [0.12, 0.86, 0.38, 0.98],
        opacity: { times: [0, 0.15, 0.4, 0.6, 0.75, 0.9, 1], ease: [0.12, 0.86, 0.38, 0.98] },
        scale: { times: [0, 0.15, 0.4, 0.6, 0.75, 0.9, 1], ease: [0.12, 0.86, 0.38, 0.98] },
        y: { ease: [0.12, 0.86, 0.38, 0.98] },
        x: { ease: [0.12, 0.86, 0.38, 0.98] },
        rotate: { times: [0, 0.3, 0.7, 1], ease: [0.12, 0.86, 0.38, 0.98] }
      }}
      className="absolute pointer-events-none"
      style={{ left: x, top: y, zIndex: 9999 }}
    >
      {petalShapes[shapeIndex](color)}
    </motion.div>
  )
}

// Petal burst on swipe - abundant and alive
const PetalBurst = forwardRef(function PetalBurst({ originX, originY, direction }, ref) {
  // Generate petals once with useMemo
  const petals = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: originX + (Math.random() * 200 - 100),
      y: originY + (Math.random() * 160 - 80),
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      shapeIndex: Math.floor(Math.random() * petalShapes.length),
      delay: Math.random() * 0.4,
    }))
  , [originX, originY])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0, delay: 15 }}
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex: 9999 }}
    >
      {petals.map((p) => (
        <SwipePetal 
          key={p.id} 
          x={p.x} 
          y={p.y} 
          color={p.color} 
          delay={p.delay}
          shapeIndex={p.shapeIndex}
        />
      ))}
    </motion.div>
  )
})

// Progress dots component
function ProgressDots({ total, current, isInteracting }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isInteracting ? 1 : 0.4 }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50"
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: i === current ? 1 : 0.7,
            backgroundColor: i === current ? '#C65D1E' : '#D4C4B0',
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-full"
          style={{
            width: i === current ? 10 : 6,
            height: i === current ? 10 : 6,
            boxShadow: i === current ? '0 0 8px rgba(198, 93, 30, 0.4)' : 'none',
          }}
        />
      ))}
    </motion.div>
  )
}

// Haptic feedback helper
function triggerHaptic(style = 'light') {
  if (!navigator.vibrate) return
  if (style === 'light') navigator.vibrate(8)
  if (style === 'boundary') navigator.vibrate([12, 30, 12])
}

// Premium Swipeable Lightbox
function Lightbox({ media, currentIndex, onClose, onPrevious, onNext, onGoTo }) {
  const currentMedia = media[currentIndex]
  const containerRef = useRef(null)
  const [petalBursts, setPetalBursts] = useState([])
  const [isInteracting, setIsInteracting] = useState(true)
  const [direction, setDirection] = useState(0) // -1 left, 1 right
  const idleTimerRef = useRef(null)
  const isTransitioningRef = useRef(false)
  const dragX = useMotionValue(0)
  const dragRotate = useTransform(dragX, [-300, 0, 300], [-4, 0, 4])
  const dragOpacity = useTransform(dragX, [-300, 0, 300], [0.5, 1, 0.5])

  // Reset drag position when index changes
  useEffect(() => {
    dragX.set(0)
    isTransitioningRef.current = true
    const timer = setTimeout(() => {
      isTransitioningRef.current = false
    }, 500) // Match transition duration
    return () => clearTimeout(timer)
  }, [currentIndex, dragX])

  // Reset idle timer on interaction
  const resetIdleTimer = useCallback(() => {
    setIsInteracting(true)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => setIsInteracting(false), 3000)
  }, [])

  useEffect(() => {
    resetIdleTimer()
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current) }
  }, [currentIndex, resetIdleTimer])

  // Focus container for keyboard events
  useEffect(() => {
    if (containerRef.current) containerRef.current.focus()
  }, [currentIndex])

  // Spawn petal particles - from opposite side for natural reveal effect
  const spawnPetals = useCallback((dir) => {
    const id = Date.now()
    // Particles appear from opposite direction (where new image comes from)
    const originX = dir === 'left' 
      ? window.innerWidth * 0.75  // Swiping left → particles from right
      : window.innerWidth * 0.25  // Swiping right → particles from left
    const originY = window.innerHeight * 0.5
    setPetalBursts(prev => [...prev, { id, originX, originY, direction: dir }])
    // Cleanup after 15 seconds to ensure particles complete their full animation
    // even after the image transitions and new image appears
    setTimeout(() => {
      setPetalBursts(prev => prev.filter(b => b.id !== id))
    }, 15000)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    resetIdleTimer()
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') {
      setDirection(-1)
      onPrevious()
      spawnPetals('left')
      triggerHaptic('light')
    }
    if (e.key === 'ArrowRight') {
      setDirection(1)
      onNext()
      spawnPetals('right')
      triggerHaptic('light')
    }
  }, [onClose, onPrevious, onNext, resetIdleTimer, spawnPetals])

  // Handle drag end for swipe
  const handleDragEnd = useCallback((_, info) => {
    // Prevent multiple swipes during transition
    if (isTransitioningRef.current) {
      animate(dragX, 0, { duration: 0 })
      return
    }

    const swipeThreshold = 80
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (offset < -swipeThreshold || velocity < -300) {
      // Swiped left → next
      setDirection(1)
      onNext()
      spawnPetals('right')
      triggerHaptic('light')
      // Reset drag position
      animate(dragX, 0, { duration: 0 })
    } else if (offset > swipeThreshold || velocity > 300) {
      // Swiped right → previous
      setDirection(-1)
      onPrevious()
      spawnPetals('left')
      triggerHaptic('light')
      // Reset drag position
      animate(dragX, 0, { duration: 0 })
    } else {
      // Snap back if threshold not reached
      animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 })
    }
  }, [currentIndex, media.length, onNext, onPrevious, dragX, spawnPetals])

  // Slide variants for cinematic transitions
  const slideVariants = {
    enter: (dir) => ({
      x: dir >= 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
      rotate: dir >= 0 ? 3 : -3,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (dir) => ({
      x: dir >= 0 ? -300 : 300,
      opacity: 0,
      scale: 0.92,
      rotate: dir >= 0 ? -3 : 3,
    }),
  }

  return (
    <>
      {/* Petal burst animations - rendered outside main container for proper z-index */}
      <AnimatePresence mode="popLayout">
        {petalBursts.map((burst) => (
          <PetalBurst
            key={burst.id}
            originX={burst.originX}
            originY={burst.originY}
            direction={burst.direction}
          />
        ))}
      </AnimatePresence>

      <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      onMouseMove={resetIdleTimer}
      onTouchStart={resetIdleTimer}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      style={{ outline: 'none' }}
    >
      {/* Blurred background with current image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${currentMedia.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(60px) saturate(0.7)',
          transform: 'scale(1.2)',
        }}
      />
      
      {/* Cream overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(245, 230, 211, 0.88) 0%, rgba(245, 230, 211, 0.94) 100%)' 
        }} 
      />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isInteracting ? 1 : 0.3, scale: 1 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all z-50 backdrop-blur-sm"
        aria-label="Close lightbox"
      >
        <svg className="w-4 h-4" style={{ color: '#3E2A24' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Previous button */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isInteracting ? 1 : 0, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => {
            e.stopPropagation()
            setDirection(-1)
            onPrevious()
            spawnPetals('left')
            triggerHaptic('light')
            resetIdleTimer()
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 hover:bg-white shadow-md hover:shadow-lg transition-all z-50 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4" style={{ color: '#3E2A24' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      {/* Next button */}
      {currentIndex < media.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isInteracting ? 1 : 0, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => {
            e.stopPropagation()
            setDirection(1)
            onNext()
            spawnPetals('right')
            triggerHaptic('light')
            resetIdleTimer()
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 hover:bg-white shadow-md hover:shadow-lg transition-all z-50 backdrop-blur-sm"
          aria-label="Next image"
        >
          <svg className="w-4 h-4" style={{ color: '#3E2A24' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* Swipeable image area */}
      <div
        className="relative w-full max-w-5xl px-6 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 200, damping: 28, mass: 1 },
              opacity: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
              scale: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
              rotate: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
            }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => {
              resetIdleTimer()
            }}
            onDrag={(_, info) => {
              dragX.set(info.offset.x)
            }}
            onDragEnd={handleDragEnd}
            className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
            style={{
              rotate: dragRotate,
              opacity: dragOpacity,
              x: 0, // Ensure no x offset from previous drag
            }}
          >
            {/* Image with soft shadow */}
            <div className="relative pointer-events-none">
              <img
                src={currentMedia.src}
                srcSet={currentMedia.srcset}
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 75vw, 900px"
                alt={currentMedia.alt}
                className="max-h-[65vh] w-auto object-contain rounded-2xl"
                draggable={false}
                style={{
                  boxShadow: '0 20px 60px -12px rgba(62, 42, 36, 0.25), 0 8px 24px -8px rgba(62, 42, 36, 0.15)',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              />
            </div>

            {/* Caption */}
            {currentMedia.caption && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-8 text-center max-w-md"
              >
                <p 
                  className="text-lg mb-2"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    color: '#3E2A24',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}
                >
                  "{currentMedia.caption}"
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <ProgressDots total={media.length} current={currentIndex} isInteracting={isInteracting} />

      {/* Swipe hint on first open */}
      <motion.p
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs pointer-events-none"
        style={{
          fontFamily: "'Crimson Text', serif",
          color: '#5A4A3F',
          fontStyle: 'italic',
        }}
      >
        swipe or drag to explore
      </motion.p>
    </motion.div>
    </>
  )
}

// Pinterest-Style Gallery Item
function GalleryItem({ item, onClick, index }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      onClick={onClick}
      className="
        relative overflow-hidden rounded-2xl cursor-pointer group
        bg-blush/5 w-full
        hover:shadow-2xl transition-all duration-500
      "
      whileHover={{ y: -8, scale: 1.02 }}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.alt}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-cream/40 to-blush/20 animate-pulse" />
      )}

      {/* Image */}
      <img
        src={item.src}
        srcSet={item.srcset}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        alt={item.alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`
          w-full h-full object-cover
          transition-all duration-700 ease-out
          group-hover:scale-110
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Soft gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p 
            className="text-cream text-sm leading-relaxed"
            style={{
              fontFamily: "'Crimson Text', serif",
              fontWeight: 400,
            }}
          >
            {item.caption}
          </p>
        </div>
      </div>

      {/* Top corner heart indicator */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-4 h-4" style={{ color: '#C65D1E' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// Main Gallery Component - Pinterest Masonry Style
export default function Gallery({ media = defaultMedia, title = 'Our Moments' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }

  const goToPrevious = () => {
    setLightboxIndex((prev) => prev === 0 ? media.length - 1 : prev - 1)
  }

  const goToNext = () => {
    setLightboxIndex((prev) => prev === media.length - 1 ? 0 : prev + 1)
  }

  const goToIndex = (index) => {
    setLightboxIndex(Math.max(0, Math.min(media.length - 1, index)))
  }

  return (
    <section
      className="relative py-24 md:py-32 bg-gradient-to-b from-background via-cream/10 to-background overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* Floating Hearts Background */}
      <FloatingElements />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading - Elegant & Romantic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2
            id="gallery-heading"
            className="text-6xl md:text-7xl lg:text-8xl mb-6"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: '#3E2A24',
              lineHeight: 1.2,
              letterSpacing: '0.02em'
            }}
          >
            {title}
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-secondary/25" />
            <svg className="w-4 h-4" style={{ color: '#C65D1E' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-secondary/25" />
          </div>
          
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Crimson Text', serif",
              color: '#5A4A3F',
              fontWeight: 400,
              lineHeight: 1.8
            }}
          >
            A collection of our most precious memories, capturing the journey of our love story
          </p>
        </motion.div>

        {/* Pinterest-Style Masonry Grid */}
        <div
          className="
            columns-2 md:columns-3 lg:columns-4
            gap-4 md:gap-5 lg:gap-6
          "
          role="list"
        >
          {media.map((item, index) => (
            <div 
              key={item.id} 
              role="listitem" 
              className="break-inside-avoid mb-4 md:mb-5 lg:mb-6"
            >
              <GalleryItem
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {media.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p 
              className="text-lg"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6B5E50',
              }}
            >
              Our love story is being captured... Check back soon! 💕
            </p>
          </motion.div>
        )}

        {/* Decorative element at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-secondary/20" />
            <svg className="w-3 h-3" style={{ color: '#C65D1E' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="h-px w-12 bg-secondary/20" />
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            media={media}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onGoTo={goToIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/**
 * USAGE EXAMPLE:
 * 
 * import Gallery from './components/Gallery'
 * 
 * const weddingPhotos = [
 *   {
 *     id: 1,
 *     type: 'image',
 *     src: '/images/photo1-800.webp',
 *     srcset: '/images/photo1-400.webp 400w, /images/photo1-800.webp 800w',
 *     alt: 'Couple on beach',
 *     caption: 'Sunset in Malibu',
 *     height: 'tall', // 'short' | 'medium' | 'tall'
 *   },
 * ]
 * 
 * <Gallery media={weddingPhotos} title="Our Journey Together" />
 */
