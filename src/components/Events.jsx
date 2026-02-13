import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Events Component
 * 
 * Features:
 * - Display wedding events with time, venue, address, dress code
 * - Add to Calendar with .ics download and Google Calendar link
 * - Subtle heart confetti animation on button click
 * - Responsive card layout
 * 
 * @param {Object} props
 * @param {Array} props.events - Array of event objects
 */

// Event-specific background images
const eventBackgrounds = {
  'ganesh': 'https://m.media-amazon.com/images/I/71uvdGbQopL._AC_UF350,350_QL80_.jpg', // Ganesh statue with flowers
  'grah shanti': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThtNAywUbbIcFsffnwlx8K_aqQGOsjMhpSw&s', // Sacred ritual setup
  'mameru': 'https://cdn.shopify.com/s/files/1/2090/3151/files/bridal_box_new_image_1024x1024.jpg?v=1543841765', // Traditional Indian gifts
  'haldi': 'https://varniya.com/cdn/shop/articles/Trendy_Haldi_Ceremony_Decoration_Ideas_for_Function_at_Home_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x50_ad08cef9-b9f3-4e96-a673-4d3bd37d4097.png?v=1748863374', // Turmeric/yellow flowers
  'jamnavar': 'https://pub-95ccf2d427eb4955a7de1c41d3fa57dd.r2.dev/blog-g3fashion-com/2021/04/Wedding-CATERERS-in-surat-scaled.jpg', // Indian feast/food
  'rasgarba': 'https://i0.wp.com/wovensouls.org/wp-content/uploads/2013/08/800px-navratri_garba.jpg?fit=800%2C534&ssl=1&w=640', // Garba dancers/dandiya
  'lagan': 'https://img.freepik.com/premium-photo/traditional-havan-homan-ritual-indian-wedding_665346-151982.jpg?w=360', // Wedding mandap
}

// Default fallback image
const defaultBackground = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'

// Default events data organized by day
const defaultEvents = [
  {
    id: 1,
    name: 'Ganesh',
    date: '2026-10-14',
    startTime: '18:00',
    endTime: '21:00',
    venue: 'Vineyard Terrace Restaurant',
    address: '456 Wine Country Road, Napa Valley, CA 94558',
    dressCode: 'smart-casual',
    description: 'Kick off the celebration with an intimate dinner for close family and friends. Enjoy fine wine and delicious cuisine as we welcome our guests.',
  },
  {
    id: 2,
    name: 'Grah Shanti',
    date: '2026-10-14',
    startTime: '15:00',
    endTime: '16:00',
    venue: 'The Grand Estate Chapel',
    address: '123 Vineyard Lane, Napa Valley, CA 94558',
    dressCode: 'formal',
    description: 'Join us as we exchange our vows in an intimate ceremony surrounded by our loved ones in the beautiful chapel overlooking the vineyard.',
  },
  {
    id: 3,
    name: 'Mameru',
    date: '2026-10-14',
    startTime: '16:30',
    endTime: '17:30',
    venue: 'Terrace Garden',
    address: '123 Vineyard Lane, Napa Valley, CA 94558',
    dressCode: 'formal',
    description: 'Enjoy signature cocktails and gourmet hors d\'oeuvres on the terrace overlooking the stunning vineyard views.',
  },
  {
    id: 4,
    name: 'Haldi',
    date: '2026-10-14',
    startTime: '18:00',
    endTime: '20:00',
    venue: 'Grand Ballroom',
    address: '123 Vineyard Lane, Napa Valley, CA 94558',
    dressCode: 'formal',
    description: 'Celebrate with us over a five-course dinner featuring locally sourced ingredients and fine wines from Napa Valley.',
  },
  {
    id: 5,
    name: 'Jamnavar',
    date: '2026-10-14',
    startTime: '20:00',
    endTime: '23:30',
    venue: 'Grand Ballroom',
    address: '123 Vineyard Lane, Napa Valley, CA 94558',
    dressCode: 'formal',
    description: 'Dance the night away with live music, champagne toasts, and memories to last a lifetime. Late night snacks will be served.',
  },
  {
    id: 6,
    name: 'Rasgarba',
    date: '2026-10-14',
    startTime: '10:00',
    endTime: '12:30',
    venue: 'Garden Pavilion',
    address: '123 Vineyard Lane, Napa Valley, CA 94558',
    dressCode: 'casual',
    description: 'Join us for a relaxed farewell brunch in the garden. Share stories and laughs as we say goodbye to our wonderful guests.',
  },
  {
    id: 7,
    name: 'Lagan',
    date: '2026-10-15',
    startTime: '10:00',
    endTime: '12:30',
    venue: 'Garden Pavilion',
    address: '123 Vineyard Lane, Napa Valley, CA 94558',
    dressCode: 'casual',
    description: 'Join us for a relaxed farewell brunch in the garden. Share stories and laughs as we say goodbye to our wonderful guests.',
  },
]

// Dress code icons
const dressCodeIcons = {
  casual: '👕',
  'smart-casual': '👔',
  'cocktail': '🥂',
  formal: '🤵',
  'black-tie': '🎩',
}

/**
 * Generate ICS file content for calendar download
 * @param {Object} event - Event object
 * @returns {string} ICS file content
 */
function generateICS(event) {
  const formatDateTime = (date, time) => {
    const [year, month, day] = date.split('-')
    const [hours, minutes] = time.split(':')
    return `${year}${month}${day}T${hours}${minutes}00`
  }

  const startDateTime = formatDateTime(event.date, event.startTime)
  const endDateTime = formatDateTime(event.date, event.endTime)
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Site//Wedding Event//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${event.id}-${now}@wedding-site.com
DTSTAMP:${now}
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${event.name}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.venue}, ${event.address}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`

  return icsContent
}

/**
 * Generate Google Calendar URL
 * @param {Object} event - Event object
 * @returns {string} Google Calendar URL
 */
function generateGoogleCalendarURL(event) {
  const formatDateTime = (date, time) => {
    const [year, month, day] = date.split('-')
    const [hours, minutes] = time.split(':')
    return `${year}${month}${day}T${hours}${minutes}00`
  }

  const startDateTime = formatDateTime(event.date, event.startTime)
  const endDateTime = formatDateTime(event.date, event.endTime)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.name,
    dates: `${startDateTime}/${endDateTime}`,
    details: event.description,
    location: `${event.venue}, ${event.address}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Download ICS file
 * @param {Object} event - Event object
 */
function downloadICS(event) {
  const icsContent = generateICS(event)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${event.name.replace(/\s+/g, '-').toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

/**
 * Format time to human-readable format
 * @param {string} time - Time in HH:MM format
 * @returns {string} Human-readable time
 */
function formatTime(time) {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

/**
 * Format date to human-readable format
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {string} Human-readable date
 */
function formatDate(date) {
  const dateObj = new Date(date + 'T00:00:00')
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Heart confetti animation component
function HeartConfetti() {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.2,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: 0, opacity: 1, scale: 0 }}
          animate={{
            y: -60,
            opacity: 0,
            scale: 1,
            x: heart.x,
            rotate: heart.rotation,
          }}
          transition={{
            duration: 1.2,
            delay: heart.delay,
            ease: 'easeOut',
          }}
          className="absolute bottom-0 left-1/2 text-blush"
          style={{ fontSize: '1.2rem' }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  )
}

// Illustrated Map Component - Minimal & Aesthetic
function IllustratedMap({ venue, address }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-12"
    >
      <motion.a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative bg-cream/30 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-secondary/10 hover:border-secondary/20 hover:shadow-lg transition-all duration-500 overflow-hidden">
          {/* Floating petals animation */}
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-6 right-8 opacity-30"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C8 2 7 4 7 6C7 4 5 2 3 2C5 2 7 4 7 6C7 8 5 10 3 10C5 10 7 12 7 14C7 12 9 10 11 10C9 10 7 8 7 6Z" fill="#F4C5B8" />
            </svg>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-8 left-8 opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C8 2 7 4 7 6C7 4 5 2 3 2C5 2 7 4 7 6C7 8 5 10 3 10C5 10 7 12 7 14C7 12 9 10 11 10C9 10 7 8 7 6Z" fill="#C65D1E" opacity="0.4" />
            </svg>
          </motion.div>

          <svg 
            viewBox="0 0 400 200" 
            className="w-full h-auto"
            style={{ maxHeight: '160px' }}
          >
            {/* Soft background elements */}
            <circle cx="60" cy="60" r="40" fill="#F5E6D3" opacity="0.3" />
            <circle cx="340" cy="140" r="50" fill="#F4C5B8" opacity="0.2" />
            
            {/* Curved road path */}
            <path
              d="M 30 160 Q 100 140, 200 130 T 370 140"
              stroke="#D4C4B0"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Dashed center line */}
            <path
              d="M 30 160 Q 100 140, 200 130 T 370 140"
              stroke="#E8DCC8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 12"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Tree - Left */}
            <g transform="translate(80, 100)">
              <rect x="-3" y="10" width="6" height="20" rx="2" fill="#8B7355" />
              <ellipse cx="0" cy="5" rx="18" ry="22" fill="#A8967C" opacity="0.7" />
              <ellipse cx="-8" cy="8" rx="14" ry="18" fill="#9A8870" opacity="0.6" />
              <ellipse cx="8" cy="10" rx="12" ry="16" fill="#B0A090" opacity="0.5" />
            </g>

            {/* Tree - Right */}
            <g transform="translate(320, 90)">
              <rect x="-3" y="15" width="6" height="18" rx="2" fill="#8B7355" />
              <ellipse cx="0" cy="10" rx="16" ry="20" fill="#A8967C" opacity="0.7" />
              <ellipse cx="-6" cy="12" rx="12" ry="16" fill="#9A8870" opacity="0.6" />
              <ellipse cx="6" cy="14" rx="10" ry="14" fill="#B0A090" opacity="0.5" />
            </g>

            {/* Mandap / Venue Building */}
            <g transform="translate(200, 80)">
              {/* Base */}
              <rect x="-25" y="20" width="50" height="35" rx="4" fill="#F5E6D3" stroke="#C65D1E" strokeWidth="1.5" opacity="0.9" />
              
              {/* Roof */}
              <path d="M -30 20 L 0 5 L 30 20 Z" fill="#C65D1E" opacity="0.8" />
              <path d="M -28 20 L 0 7 L 28 20 Z" fill="#D4885A" opacity="0.6" />
              
              {/* Dome on top */}
              <ellipse cx="0" cy="5" rx="8" ry="6" fill="#C65D1E" opacity="0.7" />
              <circle cx="0" cy="2" r="3" fill="#F4C5B8" />
              
              {/* Door */}
              <rect x="-8" y="35" width="16" height="20" rx="8" fill="#C65D1E" opacity="0.4" />
              
              {/* Decorative elements */}
              <circle cx="-15" cy="30" r="2" fill="#F4C5B8" opacity="0.8" />
              <circle cx="15" cy="30" r="2" fill="#F4C5B8" opacity="0.8" />
            </g>

            {/* Flowers - scattered */}
            <g opacity="0.6">
              <circle cx="50" cy="145" r="3" fill="#F4C5B8" />
              <circle cx="54" cy="148" r="2.5" fill="#E8B4A8" />
              <circle cx="140" cy="125" r="2.5" fill="#F4C5B8" />
              <circle cx="260" cy="120" r="3" fill="#E8B4A8" />
              <circle cx="350" cy="135" r="2.5" fill="#F4C5B8" />
            </g>

            {/* Pulsing Location Pin - Heart shaped */}
            <g transform="translate(200, 120)">
              <g className="location-pin-pulse">
                {/* Heart pin shadow */}
                <ellipse cx="0" cy="22" rx="6" ry="2" fill="#3E2A24" opacity="0.15" />
                
                {/* Heart location pin */}
                <path
                  d="M 0 20 C -1 18, -2 16, -2 14 C -2 11, 0 9, 0 9 C 0 9, 2 11, 2 14 C 2 16, 1 18, 0 20 Z M -2 14 C -2 13, -1 11.5, 0 11 C 1 11.5, 2 13, 2 14 C 2 15, 1 16, 0 16 C -1 16, -2 15, -2 14 Z"
                  fill="#C65D1E"
                  stroke="#8B4513"
                  strokeWidth="0.5"
                />
                
                {/* Heart inner glow */}
                <ellipse cx="0" cy="13" rx="1.5" ry="1.5" fill="#F4C5B8" opacity="0.8" />
              </g>
            </g>

            {/* CSS Animation for pulsing pin */}
            <style>{`
              @keyframes pinPulse {
                0%, 100% { transform: scale(1) translateY(0); }
                50% { transform: scale(1.1) translateY(-3px); }
              }
              .location-pin-pulse {
                animation: pinPulse 2s ease-in-out infinite;
                transform-origin: center;
              }
            `}</style>

            {/* Venue name */}
            <text
              x="200"
              y="175"
              textAnchor="middle"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '14px',
                fontStyle: 'italic',
                fill: '#3E2A24',
                fontWeight: 600
              }}
            >
              {venue}
            </text>
          </svg>

          {/* Hover hint */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4" style={{ color: '#C65D1E' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span style={{ fontFamily: "'Crimson Text', serif", color: '#5A4A3F', fontWeight: 500 }}>
              Click to open directions
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
}

// Premium Full-Screen Event Detail Overlay
function EventDetailOverlay({ event, isOpen, onClose }) {
  if (!event) return null

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`
  
  // Get event-specific background image
  const backgroundImage = eventBackgrounds[event.name.toLowerCase()] || defaultBackground

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Image Layer - Fades in then blurs */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(0px)' }}
            animate={{ 
              opacity: 1,
              scale: 1,
              filter: 'blur(6px)',
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
              scale: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
              filter: { duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }
            }}
            className="fixed inset-0 z-50"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Blur overlay - appears after image */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ 
              opacity: 0.9,
              backdropFilter: 'blur(40px)',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(245, 230, 211, 1) 0%, rgba(240, 225, 210, 0.95) 60%, rgba(235, 220, 205, 0.9) 100%), radial-gradient(circle at 30% 40%, rgba(245, 230, 211, 0.85) 0%, rgba(230, 215, 200, 0.7) 40%), radial-gradient(circle at 70% 60%, rgba(240, 225, 210, 0.75) 0%, rgba(225, 210, 195, 0.6) 40%), radial-gradient(circle at 20% 30%, rgba(198, 93, 30, 0.75) 0%, rgba(180, 120, 80, 0.6) 50%), radial-gradient(circle at 80% 70%, rgba(107, 94, 80, 0.7) 0%, rgba(130, 110, 90, 0.55) 50%)'
            }}
          />

          {/* Brown Texture Overlay with uneven pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50"
            onClick={onClose}
            style={{
              background: `
                radial-gradient(ellipse at 15% 25%, rgba(245, 230, 211, 1) 0%, rgba(245, 230, 211, 0.95) 35%),
                radial-gradient(ellipse at 85% 15%, rgba(198, 93, 30, 0.3) 0%, rgba(200, 100, 40, 0.15) 40%),
                radial-gradient(ellipse at 70% 80%, rgba(107, 94, 80, 0.4) 0%, rgba(110, 100, 80, 0.2) 45%),
                radial-gradient(ellipse at 25% 75%, rgba(90, 74, 63, 0.35) 0%, rgba(100, 80, 70, 0.15) 38%),
                radial-gradient(ellipse at 50% 50%, rgba(245, 230, 211, 0.9) 0%, rgba(240, 225, 210, 0.5) 55%),
                radial-gradient(circle at 40% 60%, rgba(122, 107, 95, 0.3) 0%, rgba(130, 115, 100, 0.1) 42%),
                linear-gradient(135deg, rgba(245, 230, 211, 1) 0%, rgba(220, 180, 140, 0.9) 50%, rgba(200, 160, 130, 0.85) 100%)
              `,
              mixBlendMode: 'multiply',
              opacity: 1,
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12"
          >
            {/* Close Button - Minimal and easily findable */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="
                fixed top-6 right-6 md:top-8 md:right-8
                w-11 h-11 md:w-10 md:h-10
                flex items-center justify-center 
                rounded-full
                bg-gradient-to-br from-primary/8 to-primary/12
                hover:from-primary/15 hover:to-primary/20
                border border-primary/15
                backdrop-blur-sm
                transition-all duration-300
                z-[60]
                cursor-pointer
              "
              aria-label="Close event details"
              type="button"
            >
              <svg 
                className="w-4 h-4" 
                style={{ color: '#6B5E50' }} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <div className="pointer-events-none relative w-full h-full flex items-center justify-center">
              
              <div className="pointer-events-auto relative space-y-6 text-center max-w-2xl px-4">
                {/* Event Name */}
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-6xl md:text-7xl mb-2"
                  style={{ 
                    fontFamily: "'Great Vibes', cursive",
                    lineHeight: 1.2,
                    color: '#2A1D16',
                    letterSpacing: '0.02em'
                  }}
                >
                  {event.name}
                </motion.h2>

                {/* Decorative Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex items-center justify-center gap-3 py-2"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary/30" />
                  <svg className="w-4 h-4" style={{ color: '#C65D1E' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary/30" />
                </motion.div>

                {/* Date */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.7 }}
                  className="text-lg tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#4A3A2F',
                    fontWeight: 500
                  }}
                >
                  {formatDate(event.date)}
                </motion.p>

                {/* Time */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="text-2xl tracking-wider"
                  style={{ 
                    fontFamily: "'Crimson Text', serif",
                    fontStyle: 'italic',
                    color: '#C65D1E',
                    fontWeight: 400
                  }}
                >
                  {formatTime(event.startTime)} — {formatTime(event.endTime)}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="leading-relaxed max-w-xl mx-auto pt-4"
                  style={{ 
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '1.0625rem',
                    lineHeight: 1.85,
                    color: '#3A2D24',
                    fontWeight: 400
                  }}
                >
                  {event.description}
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  className="h-px w-24 bg-secondary/25 mx-auto my-8"
                />

                {/* Venue */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.7 }}
                  className="space-y-2"
                >
                  <p className="text-xl" 
                    style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      color: '#2A1D16',
                      fontWeight: 600
                    }}
                  >
                    {event.venue}
                  </p>
                  <p className="text-sm" style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: '#4A3A2F',
                    fontWeight: 400,
                    letterSpacing: '0.01em'
                  }}>
                    {event.address}
                  </p>
                </motion.div>

                {/* Map Preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="pt-4"
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group"
                  >
                    <div className="bg-cream/30 backdrop-blur-sm rounded-2xl p-4 hover:bg-cream/45 transition-all duration-300 border border-secondary/20">
                      <div className="flex items-center justify-center gap-2 transition-colors"
                        style={{ 
                          color: '#3A2D24'
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Open in Google Maps</span>
                        <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </motion.div>

                {/* Subtle close hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                  className="text-xs pt-6"
                  style={{ 
                    fontFamily: "'Crimson Text', serif",
                    fontStyle: 'italic',
                    color: '#5A4A3F',
                    opacity: 0.75
                  }}
                >
                  Click outside to close
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Event Row Component - Luxury Printed Invitation Style
function EventRow({ event, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      className="group py-6 border-b border-secondary/10 last:border-b-0 cursor-pointer transition-all duration-500 hover:pl-2"
    >
      <div className="flex items-center justify-between gap-6">
        {/* Time */}
        <div className="flex-shrink-0 min-w-[100px]">
          <p 
            className="text-base md:text-lg tracking-wide"
            style={{
              fontFamily: "'Crimson Text', serif",
              fontStyle: 'italic',
              color: '#C65D1E',
              fontWeight: 400
            }}
          >
            {formatTime(event.startTime)}
          </p>
        </div>

        {/* Event Name */}
        <div className="flex-1">
          <h3 
            className="text-2xl md:text-3xl transition-all duration-500 group-hover:text-gold"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: '#3E2A24',
              lineHeight: 1.3,
              letterSpacing: '0.01em'
            }}
          >
            {event.name}
          </h3>
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
          <svg className="w-5 h-5" style={{ color: '#C65D1E' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// Main Events Component with day-wise grouping
export default function Events({ events = defaultEvents, title = 'Celebrate With Us' }) {
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = event.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})

  // Sort dates
  const sortedDates = Object.keys(eventsByDate).sort()

  return (
    <section
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream/20 via-background to-cream/10"
      aria-labelledby="events-heading"
    >
      {/* Event Detail Overlay */}
      <EventDetailOverlay
        event={selectedEvent}
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2
            id="events-heading"
            className="text-5xl md:text-6xl lg:text-7xl mb-6"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: '#3E2A24',
              lineHeight: 1.2
            }}
          >
            {title}
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary/20" />
            <svg className="w-3 h-3" style={{ color: '#C65D1E' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary/20" />
          </div>
          
          <p 
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{
              fontFamily: "'Crimson Text', serif",
              color: '#5A4A3F',
              lineHeight: 1.8,
              fontWeight: 400
            }}
          >
            Join us for a celebration of love and unforgettable memories
          </p>
        </motion.div>

        {/* Day-wise Events */}
        <div className="space-y-20">
          {sortedDates.map((date, dayIndex) => {
            const dayEvents = eventsByDate[date]
            const dateObj = new Date(date + 'T00:00:00')
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
            const monthDay = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

            return (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: dayIndex * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Day Header */}
                <div className="mb-10">
                  <h3 
                    className="text-3xl md:text-4xl mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      color: '#3E2A24',
                      fontWeight: 600
                    }}
                  >
                    {dayName}
                  </h3>
                  <p
                    className="text-sm md:text-base tracking-wide"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: '#6B5E50',
                      fontWeight: 400
                    }}
                  >
                    {monthDay}
                  </p>
                </div>

                {/* Illustrated Map */}
                <IllustratedMap 
                  venue={dayEvents[0].venue}
                  address={dayEvents[0].address}
                />

                {/* Events for this day */}
                <div>
                  {dayEvents.map((event) => (
                    <EventRow
                      key={event.id}
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/**
 * USAGE EXAMPLE:
 * 
 * import Events from './components/Events'
 * 
 * const weddingEvents = [
 *   {
 *     id: 1,
 *     name: 'Ceremony',
 *     date: '2026-06-20',
 *     startTime: '14:00',
 *     endTime: '15:00',
 *     venue: 'Beach Chapel',
 *     address: '123 Ocean Drive, Malibu, CA',
 *     dressCode: 'formal',
 *     description: 'Beach ceremony...',
 *   },
 * ]
 * 
 * <Events events={weddingEvents} title="Wedding Day Schedule" />
 */
