import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

/**
 * Layout Component
 * 
 * Features:
 * - Sticky floating header with scroll-based show/hide
 * - Mobile-first responsive navigation
 * - Accessible skip-to-content link
 * - Framer Motion animations (respects prefers-reduced-motion)
 * - ARIA roles and landmarks
 */

const navLinks = [
  { name: 'Events', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Track scroll direction for header show/hide
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    
    // Header is scrolled when past 100px
    setIsScrolled(latest > 100)
    
    // Hide header when scrolling down, show when scrolling up
    if (latest > previous && latest > 200) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  })

  // Close mobile menu on route change
  useEffect(() => {
    const handleHashChange = () => setIsMobileMenuOpen(false)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link (for screen readers and keyboard users) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-background focus:rounded-lg focus:font-body"
      >
        Skip to content
      </a>

      {/* Header - Sticky with scroll behavior */}
      <motion.header
        initial={false}
        animate={{
          y: isHidden ? '-100%' : 0,
          backgroundColor: isScrolled 
            ? 'rgba(251, 246, 240, 0.95)' 
            : 'rgba(251, 246, 240, 0)',
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-shadow duration-300
          ${isScrolled ? 'shadow-md backdrop-blur-sm' : ''}
        `}
        role="banner"
      >
        <nav
          className={`
            max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
            transition-all duration-300
            ${isScrolled ? 'py-3' : 'py-6'}
          `}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Logo / Initials */}
            <motion.a
              href="#home"
              className="flex items-center space-x-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <span className="font-heading font-bold text-background text-lg">
                  K&amp;D
                </span>
              </div>
              <span className="font-heading text-xl font-semibold text-primary hidden sm:block">
                Keval &amp; Drashti
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    px-4 py-2 rounded-lg font-body font-medium text-primary
                    hover:bg-blush/20 hover:text-gold
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
                  "
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                md:hidden p-2 rounded-lg text-primary
                hover:bg-blush/20 transition-colors
                focus:outline-none focus:ring-2 focus:ring-gold
              "
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            initial={false}
            animate={{
              height: isMobileMenuOpen ? 'auto' : 0,
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    block px-4 py-3 rounded-lg font-body font-medium text-primary
                    hover:bg-blush/20 hover:text-gold
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-gold
                  "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        className="flex-1 pt-20"
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        role="contentinfo"
        className="bg-surface border-t border-border mt-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Brand */}
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-heading font-bold text-background text-sm">
                    S&amp;J
                  </span>
                </div>
                <span className="font-heading text-lg font-semibold text-primary">
                  Sarah &amp; James
                </span>
              </div>
              <p className="text-sm text-secondary font-body">
                Celebrating love and unity
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-primary font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-secondary hover:text-gold transition-colors font-body"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading text-primary font-semibold mb-4">
                Get in Touch
              </h3>
              <p className="text-sm text-secondary font-body">
                Questions? Reach out to us at<br />
                <a
                  href="mailto:hello@sarahandjames.com"
                  className="text-gold hover:underline"
                >
                  hello@sarahandjames.com
                </a>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-secondary font-body">
              &copy; {new Date().getFullYear()} Sarah &amp; James. Made with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/**
 * TAILWIND CLASS NOTES:
 * 
 * Spacing:
 * - Header: py-6 (normal) → py-3 (scrolled)
 * - Mobile menu: pt-4 pb-2
 * - Footer: py-12
 * 
 * Responsive Breakpoints:
 * - sm: 640px (small tablets)
 * - md: 768px (tablets, desktop nav appears)
 * - lg: 1024px (desktops)
 * 
 * Accessibility:
 * - sr-only: Screen reader only (skip link)
 * - focus:ring-2: Keyboard focus indicator
 * - aria-expanded, aria-label: Screen reader attributes
 * 
 * Performance:
 * - backdrop-blur-sm: Use sparingly (can impact performance)
 * - transition-all: Smooth property changes
 * - duration-300: Standard transition timing
 * 
 * Color Usage:
 * - bg-gold: Accent buttons/logo
 * - bg-blush/20: Hover states (20% opacity)
 * - text-primary: Main text color (#222028)
 * - text-secondary: Muted text (#6B6874)
 * 
 * Motion:
 * - Framer Motion respects prefers-reduced-motion automatically
 * - Use whileHover/whileTap for micro-interactions
 * - animate={{ y: ... }} for directional animations
 */
