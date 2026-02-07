import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Guestbook Component
 * 
 * Features:
 * - Guest message submission with emoji picker
 * - Client-side moderation (approve/reject)
 * - In-memory storage (replace with backend in production)
 * - Character limit (500 chars)
 * - Rate limiting (1 message per 5 minutes per name)
 * - Admin toggle to manage pending messages
 * - Display approved messages only
 * - Timestamps
 * 
 * @param {Object} props
 * @param {boolean} props.showAdmin - Show admin controls (default: false)
 */

// In-memory storage (replace with backend API in production)
let messageStore = [
  {
    id: 1,
    name: 'Emily & James',
    message: "Wishing you both a lifetime of love and happiness! Can't wait to celebrate with you! 💕",
    emoji: '💕',
    timestamp: new Date('2026-01-15T14:30:00'),
    status: 'approved', // 'pending', 'approved', 'rejected'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    message: 'So excited for your special day! You two are perfect together. 🎉',
    emoji: '🎉',
    timestamp: new Date('2026-01-20T09:15:00'),
    status: 'approved',
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    message: 'Congratulations to the happy couple! Cheers to forever! 🥂',
    emoji: '🥂',
    timestamp: new Date('2026-01-22T16:45:00'),
    status: 'approved',
  },
]

let nextId = 4

// Emoji picker options
const emojiOptions = [
  '❤️', '💕', '💖', '💗', '💝', '💞',
  '🎉', '🥳', '🎊', '🎈', 
  '🥂', '🍾', '🌹', '💐', 
  '✨', '🌟', '💫', '⭐',
  '😊', '😍', '🥰', '😘',
  '👰', '🤵', '💍', '💒',
]

// Rate limiting tracker
const rateLimitTracker = new Map()

function checkRateLimit(name) {
  const now = Date.now()
  const lastSubmission = rateLimitTracker.get(name)
  
  if (lastSubmission && now - lastSubmission < 5 * 60 * 1000) { // 5 minutes
    const remainingTime = Math.ceil((5 * 60 * 1000 - (now - lastSubmission)) / 1000 / 60)
    return { allowed: false, remainingMinutes: remainingTime }
  }
  
  return { allowed: true }
}

function updateRateLimit(name) {
  rateLimitTracker.set(name, Date.now())
}

// XSS Prevention
function sanitizeInput(input) {
  const suspicious = /<script|javascript:|onerror=|onclick=/i
  return !suspicious.test(input)
}

// Message Form Component
function MessageForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    emoji: '❤️',
  })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const maxLength = 500

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleEmojiSelect = (emoji) => {
    setFormData(prev => ({ ...prev, emoji }))
    setShowEmojiPicker(false)
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    } else if (!sanitizeInput(formData.name)) {
      newErrors.name = 'Invalid characters detected'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.length > maxLength) {
      newErrors.message = `Message must be less than ${maxLength} characters`
    } else if (!sanitizeInput(formData.message)) {
      newErrors.message = 'Invalid characters detected'
    }

    // Rate limiting check
    const rateLimitCheck = checkRateLimit(formData.name.trim())
    if (!rateLimitCheck.allowed) {
      newErrors.rateLimit = `Please wait ${rateLimitCheck.remainingMinutes} minute(s) before submitting another message`
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newMessage = {
        id: nextId++,
        name: formData.name.trim(),
        message: formData.message.trim(),
        emoji: formData.emoji,
        timestamp: new Date(),
        status: 'pending', // Default to pending, requires admin approval
      }
      
      messageStore.push(newMessage)
      updateRateLimit(formData.name.trim())
      
      onSubmit(newMessage)
      
      // Reset form
      setFormData({ name: '', message: '', emoji: '❤️' })
      setErrors({})
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-surface border-2 border-border rounded-2xl p-6 md:p-8 max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label
            htmlFor="guestbook-name"
            className="block font-body font-semibold text-primary mb-2"
          >
            Your Name *
          </label>
          <input
            type="text"
            id="guestbook-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            className={`
              w-full px-4 py-3 rounded-lg border-2
              font-body text-primary bg-background
              focus:outline-none focus:ring-2 focus:ring-gold
              transition-colors duration-200
              ${errors.name ? 'border-red-400' : 'border-border'}
            `}
            placeholder="John & Jane Doe"
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Message Input with Emoji Picker */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="guestbook-message"
              className="font-body font-semibold text-primary"
            >
              Your Message *
            </label>
            <span className="text-sm text-secondary">
              {formData.message.length}/{maxLength}
            </span>
          </div>
          
          <div className="relative">
            <textarea
              id="guestbook-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={maxLength}
              rows={4}
              className={`
                w-full px-4 py-3 rounded-lg border-2
                font-body text-primary bg-background
                focus:outline-none focus:ring-2 focus:ring-gold
                transition-colors duration-200 resize-none
                ${errors.message ? 'border-red-400' : 'border-border'}
              `}
              placeholder="Share your well wishes for the happy couple..."
              required
              aria-required="true"
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="
                absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center
                text-2xl hover:scale-110 transition-transform duration-200
                focus:outline-none focus:ring-2 focus:ring-gold rounded-lg
              "
              aria-label="Pick an emoji"
            >
              {formData.emoji}
            </button>
          </div>
          
          {errors.message && (
            <p id="message-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.message}
            </p>
          )}

          {/* Emoji Picker Dropdown */}
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-2 p-3 bg-background border-2 border-border rounded-lg shadow-lg"
              >
                <p className="text-xs font-body font-semibold text-secondary mb-2">
                  Select an emoji:
                </p>
                <div className="grid grid-cols-8 gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className={`
                        w-10 h-10 text-xl flex items-center justify-center
                        rounded-lg hover:bg-gold/10 transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-gold
                        ${formData.emoji === emoji ? 'bg-gold/20 ring-2 ring-gold' : ''}
                      `}
                      aria-label={`Select ${emoji} emoji`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rate Limit Error */}
        {errors.rateLimit && (
          <div
            role="alert"
            className="p-4 bg-red-50 border-2 border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-700 font-body">
              {errors.rateLimit}
            </p>
          </div>
        )}

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              role="alert"
              className="p-4 bg-green-50 border-2 border-green-200 rounded-lg"
            >
              <p className="text-sm text-green-700 font-body font-semibold">
                ✓ Message submitted! It will appear after approval.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-6 py-3 bg-gold text-background
            font-body font-semibold rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
            ${isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gold/90 hover:shadow-lg'
            }
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Sign Guestbook'}
        </button>
      </form>
    </motion.div>
  )
}

// Individual Message Card
function MessageCard({ message, isAdmin, onApprove, onReject }) {
  const formattedDate = message.timestamp.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className={`
        bg-background border-2 rounded-xl p-6
        ${message.status === 'pending' ? 'border-yellow-300 bg-yellow-50' : 'border-border'}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Emoji Avatar */}
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-2xl">
            {message.emoji}
          </div>
          
          <div>
            <h3 className="font-body font-bold text-primary">
              {message.name}
            </h3>
            <p className="text-sm text-secondary">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && message.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(message.id)}
              className="
                px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-lg
                hover:bg-green-600 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
              aria-label={`Approve message from ${message.name}`}
            >
              ✓ Approve
            </button>
            <button
              onClick={() => onReject(message.id)}
              className="
                px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg
                hover:bg-red-600 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-red-500
              "
              aria-label={`Reject message from ${message.name}`}
            >
              ✕ Reject
            </button>
          </div>
        )}

        {/* Pending Badge */}
        {message.status === 'pending' && !isAdmin && (
          <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full">
            Pending
          </span>
        )}
      </div>

      {/* Message */}
      <p className="font-body text-primary leading-relaxed">
        {message.message}
      </p>
    </motion.div>
  )
}

// Admin Toggle Component
function AdminToggle({ isAdmin, onToggle }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <label htmlFor="admin-toggle" className="font-body text-sm text-secondary">
        Admin Mode
      </label>
      <button
        id="admin-toggle"
        onClick={onToggle}
        role="switch"
        aria-checked={isAdmin}
        className={`
          relative w-14 h-7 rounded-full transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
          ${isAdmin ? 'bg-gold' : 'bg-gray-300'}
        `}
      >
        <span
          className={`
            absolute top-1 left-1 w-5 h-5 bg-white rounded-full
            transition-transform duration-200
            ${isAdmin ? 'translate-x-7' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  )
}

// Main Guestbook Component
export default function Guestbook({ 
  title = 'Guestbook',
  subtitle = 'Leave a message for the happy couple',
  showAdmin = false,
}) {
  const [messages, setMessages] = useState(messageStore)
  const [isAdmin, setIsAdmin] = useState(showAdmin)

  useEffect(() => {
    // Re-sync with store when it changes
    setMessages([...messageStore])
  }, [messageStore.length])

  const handleNewMessage = (newMessage) => {
    setMessages([...messageStore])
  }

  const handleApprove = (id) => {
    const message = messageStore.find(m => m.id === id)
    if (message) {
      message.status = 'approved'
      setMessages([...messageStore])
    }
  }

  const handleReject = (id) => {
    const message = messageStore.find(m => m.id === id)
    if (message) {
      message.status = 'rejected'
      setMessages([...messageStore])
    }
  }

  // Filter messages based on admin mode
  const displayMessages = isAdmin 
    ? messages.filter(m => m.status !== 'rejected')
    : messages.filter(m => m.status === 'approved')

  const pendingCount = messages.filter(m => m.status === 'pending').length

  return (
    <section
      className="relative py-16 md:py-24 bg-surface"
      aria-labelledby="guestbook-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="guestbook-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            {title}
          </h2>
          <p className="font-body text-lg text-secondary">
            {subtitle}
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-gold to-blush rounded-full" />
          </div>
        </motion.div>

        {/* Admin Toggle (for demo purposes) */}
        <AdminToggle isAdmin={isAdmin} onToggle={() => setIsAdmin(!isAdmin)} />

        {/* Pending Count Badge (admin only) */}
        {isAdmin && pendingCount > 0 && (
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-2 bg-yellow-100 border-2 border-yellow-300 text-yellow-800 font-body font-semibold rounded-lg">
              {pendingCount} message{pendingCount !== 1 ? 's' : ''} pending approval
            </span>
          </div>
        )}

        {/* Message Form */}
        <MessageForm onSubmit={handleNewMessage} />

        {/* Messages Display */}
        <div className="mt-16">
          <h3 className="font-heading text-2xl font-bold text-primary text-center mb-8">
            Messages ({displayMessages.length})
          </h3>
          
          {displayMessages.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-secondary">
                No messages yet. Be the first to sign the guestbook!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {displayMessages
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((message) => (
                    <MessageCard
                      key={message.id}
                      message={message}
                      isAdmin={isAdmin}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * ============================================================================
 * ADMIN NOTES - PRODUCTION BACKEND MIGRATION
 * ============================================================================
 * 
 * CURRENT: In-memory storage with client-side moderation
 * PRODUCTION: Replace with secure backend API
 * 
 * Required Backend Endpoints:
 * - POST /api/guestbook - Submit message (rate limited, XSS sanitized)
 * - GET /api/guestbook - Fetch approved messages (public)
 * - GET /api/admin/guestbook/pending - Admin only
 * - PUT /api/admin/guestbook/:id/approve - Admin only
 * - PUT /api/admin/guestbook/:id/reject - Admin only
 * 
 * Security:
 * - JWT authentication for admin routes
 * - Server-side rate limiting (express-rate-limit)
 * - XSS prevention (DOMPurify or xss package)
 * - SQL injection prevention (parameterized queries)
 * - HTTPS only
 * 
 * Database Schema (PostgreSQL):
 * CREATE TABLE guestbook_messages (
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR(100) NOT NULL,
 *   message TEXT NOT NULL,
 *   emoji VARCHAR(10) DEFAULT '❤️',
 *   status VARCHAR(20) DEFAULT 'pending',
 *   ip_address INET,
 *   created_at TIMESTAMP DEFAULT NOW()
 * );
 * 
 * ============================================================================
 */
