import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GaneshOverlay from './GaneshOverlay'
import GrahShantiOverlay from './GrahShantiOverlay'
import MameruOverlay from './MameruOverlay'
import HaldiOverlay from './HaldiOverlay'
import JamanvarOverlay from './JamanvarOverlay'
import GarbaOverlay from './GarbaOverlay'
import LaganOverlay from './LaganOverlay'

/**
 * Events Component - Premium Minimal Design
 */

// Event themes - subtle, elegant colors per event
const eventThemes = {
  'ganesh': {
    accent: '#C9956B',
    light: '#FDF8F4',
  },
  'Grah Shanti': {
    accent: '#C76B7E',
    light: '#FDF4F6',
  },
  'Mameru': {
    accent: '#8B7BC9',
    light: '#F8F6FD',
  },
  'Haldi': {
    accent: '#C9A85B',
    light: '#FDFAEF',
  },
  'Jamnavar': {
    accent: '#C97B9E',
    light: '#FDF4F8',
  },
  'Rasgarba': {
    accent: '#6BAE9C',
    light: '#F4FBFA',
  },
  'Lagan': {
    accent: '#6BAE9C',
    light: '#F4FBFA',
  },
}

const defaultTheme = {
  accent: '#C9A85B',
  light: '#FDF6E9',
}

// Default events data organized by day
const defaultEvents = [
  {
    id: 1,
    name: 'ganesh',
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
    date: '2026-10-15',
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
    date: '2026-10-15',
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
    date: '2026-10-15',
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
    date: '2026-10-15',
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
    date: '2026-10-16',
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
    date: '2026-10-16',
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

// Premium Minimal Event Overlay
function EventOverlay({ event, isOpen, onClose }) {
  const theme = eventThemes[event?.name] || defaultTheme

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

  if (!event) return null

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Overlay */}
          <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-6 md:pt-10 px-4 pointer-events-none overflow-y-auto max-h-screen pb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              className="relative w-full max-w-md pointer-events-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-secondary/60 hover:text-primary transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-5"
                >
                  <h3 className="font-heading text-2xl font-semibold text-primary mb-1">
                    {event.name}
                  </h3>
                  <p className="font-body text-sm text-secondary">
                    {formatDate(event.date)}
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="font-body text-secondary/90 text-[15px] leading-relaxed mb-6"
                >
                  {event.description}
                </motion.p>

                {/* Time & Location */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl p-4 mb-5"
                  style={{ backgroundColor: theme.light }}
                >
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-black/5">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${theme.accent}15` }}
                    >
                      <svg className="w-[18px] h-[18px]" style={{ color: theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading text-base font-medium text-primary">
                        {formatTime(event.startTime)} — {formatTime(event.endTime)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${theme.accent}15` }}
                    >
                      <svg className="w-[18px] h-[18px]" style={{ color: theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 -mt-0.5">
                      <p className="font-heading text-base font-medium text-primary">{event.venue}</p>
                      <p className="font-body text-sm text-secondary/70">{event.address}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Map link */}
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/60 hover:border-border hover:bg-surface/50 transition-all mb-5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                      </svg>
                    </div>
                    <span className="font-body text-sm text-primary">View on Google Maps</span>
                  </div>
                  <svg className="w-4 h-4 text-secondary/40 group-hover:text-secondary transition-colors group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </motion.a>

                {/* Dress code */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-2 py-3 border-t border-border/40"
                >
                  <span className="font-body text-sm text-secondary">
                    Attire: <span className="font-medium text-primary capitalize">{event.dressCode}</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Minimal Event Card
// Minimal Event Card
function EventCard({ event, onClick }) {
  const theme = eventThemes[event.name] || defaultTheme

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group bg-white border border-border/60 rounded-xl p-5 hover:shadow-lg hover:border-border transition-all duration-200 cursor-pointer relative"
    >
      {/* Subtle click indicator for Ganesh event */}
      {event.name.toLowerCase() === 'ganesh' && (
        <motion.div
          className="absolute top-3 right-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-[10px] tracking-widest uppercase group-hover:opacity-80 transition-opacity"
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              color: '#C9A85B',
              letterSpacing: '0.12em',
            }}
          >
            View
          </span>
        </motion.div>
      )}

      <div className="flex items-center gap-4">
        {/* Time indicator */}
        <div 
          className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
          style={{ backgroundColor: theme.light }}
        >
          <span className="font-heading text-lg font-semibold" style={{ color: theme.accent }}>
            {formatTime(event.startTime).split(':')[0]}
          </span>
          <span className="font-body text-[10px] uppercase tracking-wide text-secondary/60">
            {formatTime(event.startTime).split(' ')[1]}
          </span>
        </div>

        {/* Event info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-gold transition-colors truncate">
            {event.name}
          </h3>
          <p className="font-body text-sm text-secondary/70 truncate">
            {event.venue}
          </p>
        </div>

        {/* Arrow */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-surface group-hover:bg-border/30 transition-colors flex-shrink-0">
          <svg className="w-4 h-4 text-secondary/50 group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </motion.article>
  )
}

// Main Events Component with day-wise grouping
export default function Events({ events = defaultEvents, title = 'Event Schedule' }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [ganeshEvent, setGaneshEvent] = useState(null)
  const [grahShantiEvent, setGrahShantiEvent] = useState(null)
  const [mameruEvent, setMameruEvent] = useState(null)
  const [haldiEvent, setHaldiEvent] = useState(null)
  const [jamanvarEvent, setJamanvarEvent] = useState(null)
  const [garbaEvent, setGarbaEvent] = useState(null)
  const [laganEvent, setLaganEvent] = useState(null)

  // Close overlay handler
  const handleClose = useCallback(() => setSelectedEvent(null), [])
  const handleGaneshClose = useCallback(() => setGaneshEvent(null), [])
  const handleGrahShantiClose = useCallback(() => setGrahShantiEvent(null), [])
  const handleMameruClose = useCallback(() => setMameruEvent(null), [])
  const handleHaldiClose = useCallback(() => setHaldiEvent(null), [])
  const handleJamanvarClose = useCallback(() => setJamanvarEvent(null), [])
  const handleGarbaClose = useCallback(() => setGarbaEvent(null), [])
  const handleLaganClose = useCallback(() => setLaganEvent(null), [])

  // Route click to the appropriate overlay
  const handleEventClick = useCallback((event) => {
    if (event.name.toLowerCase() === 'ganesh') {
      setGaneshEvent(event)
    } else if (event.name.toLowerCase() === 'grah shanti') {
      setGrahShantiEvent(event)
    } else if (event.name.toLowerCase() === 'mameru') {
      setMameruEvent(event)
    } else if (event.name.toLowerCase() === 'haldi') {
      setHaldiEvent(event)
    } else if (event.name.toLowerCase() === 'jamnavar') {
      setJamanvarEvent(event)
    } else if (event.name.toLowerCase() === 'rasgarba') {
      setGarbaEvent(event)
    } else if (event.name.toLowerCase() === 'lagan') {
      setLaganEvent(event)
    } else {
      setSelectedEvent(event)
    }
  }, [])

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
      className="relative py-16 md:py-24 bg-background"
      aria-labelledby="events-heading"
    >
      {/* Event Detail Overlay */}
      <EventOverlay
        event={selectedEvent}
        isOpen={selectedEvent !== null}
        onClose={handleClose}
      />

      {/* Ganesh Premium Animated Overlay */}
      <GaneshOverlay
        event={ganeshEvent}
        isOpen={ganeshEvent !== null}
        onClose={handleGaneshClose}
      />

      {/* Grah Shanti Premium Animated Overlay */}
      <GrahShantiOverlay
        event={grahShantiEvent}
        isOpen={grahShantiEvent !== null}
        onClose={handleGrahShantiClose}
      />

      {/* Mameru Premium Animated Overlay */}
      <MameruOverlay
        event={mameruEvent}
        isOpen={mameruEvent !== null}
        onClose={handleMameruClose}
      />

      {/* Haldi Premium Animated Overlay */}
      <HaldiOverlay
        event={haldiEvent}
        isOpen={haldiEvent !== null}
        onClose={handleHaldiClose}
      />

      {/* Jamanvar Premium Animated Overlay */}
      <JamanvarOverlay
        event={jamanvarEvent}
        isOpen={jamanvarEvent !== null}
        onClose={handleJamanvarClose}
      />

      {/* Garba Premium Animated Overlay */}
      <GarbaOverlay
        event={garbaEvent}
        isOpen={garbaEvent !== null}
        onClose={handleGarbaClose}
      />

      {/* Lagan Premium Animated Overlay */}
      <LaganOverlay
        event={laganEvent}
        isOpen={laganEvent !== null}
        onClose={handleLaganClose}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            id="events-heading"
            className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-3"
          >
            {title}
          </h2>
          <p className="font-body text-secondary/80">
            A weekend of celebration and love
          </p>
        </motion.div>

        {/* Day-wise Events */}
        <div className="space-y-10">
          {sortedDates.map((date, dayIndex) => {
            const dayEvents = eventsByDate[date]
            const dateObj = new Date(date + 'T00:00:00')
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
            const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

            return (
              <motion.div
                key={date}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: dayIndex * 0.05 }}
              >
                {/* Day Header - Minimal */}
                <div className="flex items-center gap-3 mb-4 px-1">
                  <span className="font-heading text-lg font-semibold text-primary">
                    {dayName}
                  </span>
                  <span className="font-body text-sm text-secondary/60">
                    {monthDay}
                  </span>
                </div>

                {/* Events for this day */}
                <div className="space-y-2">
                  {dayEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventClick(event)}
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
