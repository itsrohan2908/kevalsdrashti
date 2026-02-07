/**
 * API Service
 * 
 * This file simulates a backend API for development purposes.
 * In production, replace these functions with actual API calls to your backend.
 * 
 * PRODUCTION SETUP:
 * 1. Set up a backend server (Node.js/Express, Python/Flask, etc.)
 * 2. Create database tables for RSVP data
 * 3. Implement rate limiting middleware
 * 4. Add authentication if needed
 * 5. Replace these mock functions with fetch/axios calls
 */

// In-memory storage (simulates database)
// TODO: Replace with actual database (PostgreSQL, MongoDB, etc.)
let rsvpStore = []
let nextId = 1

// Rate limiting tracker (per IP - simplified for demo)
// TODO: Implement proper rate limiting on backend (e.g., express-rate-limit)
const rateLimitStore = new Map()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3

/**
 * Sanitize input to prevent XSS attacks
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  // Remove HTML tags and script content
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} Is valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Check rate limit
 * @param {string} identifier - User identifier (IP address in production)
 * @returns {boolean} Is within rate limit
 */
function checkRateLimit(identifier = 'default') {
  const now = Date.now()
  const userRequests = rateLimitStore.get(identifier) || []
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  )
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  recentRequests.push(now)
  rateLimitStore.set(identifier, recentRequests)
  return true
}

/**
 * Submit RSVP
 * @param {Object} data - RSVP form data
 * @returns {Promise<Object>} API response
 * 
 * PRODUCTION REPLACEMENT:
 * 
 * export async function submitRsvp(data) {
 *   try {
 *     const response = await fetch('/api/rsvp', {
 *       method: 'POST',
 *       headers: {
 *         'Content-Type': 'application/json',
 *       },
 *       body: JSON.stringify(data),
 *     })
 *     
 *     if (!response.ok) {
 *       const error = await response.json()
 *       return { ok: false, error: error.message }
 *     }
 *     
 *     const result = await response.json()
 *     return { ok: true, id: result.id }
 *   } catch (error) {
 *     console.error('API Error:', error)
 *     return { ok: false, error: 'Network error' }
 *   }
 * }
 */
export async function submitRsvp(data) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  // Check rate limit
  if (!checkRateLimit('user-ip')) {
    return {
      ok: false,
      error: 'Too many requests. Please try again in a minute.',
    }
  }
  
  // Validate required fields
  if (!data.name || !data.email || !data.attending) {
    return {
      ok: false,
      error: 'Missing required fields',
    }
  }
  
  // Sanitize inputs
  const sanitizedData = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    attending: data.attending === 'yes' ? 'yes' : 'no',
    mealChoice: sanitizeInput(data.mealChoice),
    plusOneName: sanitizeInput(data.plusOneName),
    dietaryRestrictions: sanitizeInput(data.dietaryRestrictions),
  }
  
  // Validate email
  if (!isValidEmail(sanitizedData.email)) {
    return {
      ok: false,
      error: 'Invalid email address',
    }
  }
  
  // Validate conditional fields
  if (sanitizedData.attending === 'yes' && !sanitizedData.mealChoice) {
    return {
      ok: false,
      error: 'Meal choice is required for attending guests',
    }
  }
  
  // Save to in-memory store (simulates database insert)
  // TODO: Replace with actual database operation
  // Example with PostgreSQL:
  // const result = await db.query(
  //   'INSERT INTO rsvps (name, email, attending, meal_choice, plus_one_name, dietary_restrictions, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id',
  //   [sanitizedData.name, sanitizedData.email, sanitizedData.attending, sanitizedData.mealChoice, sanitizedData.plusOneName, sanitizedData.dietaryRestrictions]
  // )
  // const id = result.rows[0].id
  
  const id = `RSVP-${nextId++}`
  const rsvp = {
    id,
    ...sanitizedData,
    createdAt: new Date().toISOString(),
  }
  
  rsvpStore.push(rsvp)
  
  // Log for debugging (remove in production)
  console.log('RSVP submitted:', rsvp)
  console.log('Total RSVPs:', rsvpStore.length)
  
  return {
    ok: true,
    id,
  }
}

/**
 * Get all RSVPs (admin function)
 * @returns {Array} All RSVPs
 * 
 * TODO: Add authentication/authorization
 * TODO: Add pagination for large datasets
 */
export function getAllRsvps() {
  return rsvpStore
}

/**
 * Get RSVP statistics
 * @returns {Object} RSVP stats
 */
export function getRsvpStats() {
  const attending = rsvpStore.filter((r) => r.attending === 'yes').length
  const notAttending = rsvpStore.filter((r) => r.attending === 'no').length
  const totalGuests = rsvpStore.reduce((acc, r) => {
    return acc + (r.attending === 'yes' ? 1 : 0) + (r.plusOneName ? 1 : 0)
  }, 0)
  
  return {
    total: rsvpStore.length,
    attending,
    notAttending,
    totalGuests,
  }
}

/**
 * BACKEND IMPLEMENTATION EXAMPLE (Node.js/Express):
 * 
 * // server.js or routes/rsvp.js
 * const express = require('express')
 * const rateLimit = require('express-rate-limit')
 * const { body, validationResult } = require('express-validator')
 * const db = require('./db') // Your database connection
 * 
 * const router = express.Router()
 * 
 * // Rate limiting middleware
 * const limiter = rateLimit({
 *   windowMs: 15 * 60 * 1000, // 15 minutes
 *   max: 5, // Limit each IP to 5 requests per windowMs
 *   message: 'Too many RSVP submissions, please try again later',
 * })
 * 
 * // Validation middleware
 * const validateRsvp = [
 *   body('name').trim().isLength({ min: 2 }).escape(),
 *   body('email').isEmail().normalizeEmail(),
 *   body('attending').isIn(['yes', 'no']),
 *   body('mealChoice').optional().trim().escape(),
 *   body('plusOneName').optional().trim().escape(),
 *   body('dietaryRestrictions').optional().trim().escape(),
 * ]
 * 
 * // POST /api/rsvp
 * router.post('/api/rsvp', limiter, validateRsvp, async (req, res) => {
 *   // Check validation errors
 *   const errors = validationResult(req)
 *   if (!errors.isEmpty()) {
 *     return res.status(400).json({ 
 *       ok: false, 
 *       error: 'Validation failed',
 *       details: errors.array() 
 *     })
 *   }
 * 
 *   try {
 *     const { name, email, attending, mealChoice, plusOneName, dietaryRestrictions } = req.body
 *     
 *     // Insert into database
 *     const result = await db.query(
 *       `INSERT INTO rsvps (name, email, attending, meal_choice, plus_one_name, dietary_restrictions, created_at) 
 *        VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
 *        RETURNING id`,
 *       [name, email, attending, mealChoice, plusOneName, dietaryRestrictions]
 *     )
 *     
 *     const id = result.rows[0].id
 *     
 *     // Optional: Send confirmation email
 *     // await sendConfirmationEmail(email, name, id)
 *     
 *     res.json({ ok: true, id })
 *   } catch (error) {
 *     console.error('Database error:', error)
 *     res.status(500).json({ 
 *       ok: false, 
 *       error: 'Failed to save RSVP. Please try again.' 
 *     })
 *   }
 * })
 * 
 * module.exports = router
 * 
 * 
 * DATABASE SCHEMA (PostgreSQL):
 * 
 * CREATE TABLE rsvps (
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   email VARCHAR(255) NOT NULL,
 *   attending VARCHAR(3) NOT NULL CHECK (attending IN ('yes', 'no')),
 *   meal_choice VARCHAR(50),
 *   plus_one_name VARCHAR(255),
 *   dietary_restrictions TEXT,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * CREATE INDEX idx_rsvps_email ON rsvps(email);
 * CREATE INDEX idx_rsvps_created_at ON rsvps(created_at);
 */
