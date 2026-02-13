/**
 * Layout Component
 * 
 * Features:
 * - Accessible skip-to-content link
 * - ARIA roles and landmarks
 * - Footer with contact info
 * - Background music toggle
 */

import MusicToggle from './MusicToggle'

export default function Layout({ children }) {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link (for screen readers and keyboard users) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-background focus:rounded-lg focus:font-body"
      >
        Skip to content
      </a>

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        className="flex-1"
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        role="contentinfo"
        className="bg-gradient-to-b from-background to-surface/30 mt-auto"
      >
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-2xl text-secondary/60 italic tracking-wide" style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>
            Made with love
          </p>
        </div>
      </footer>

      {/* Music Toggle - Floating Button */}
      <MusicToggle />
    </div>
  )
}

/**
 * TAILWIND CLASS NOTES:
 * 
 * Spacing:
 * - Footer: py-12
 * 
 * Responsive Breakpoints:
 * - sm: 640px (small tablets)
 * - md: 768px (tablets)
 * - lg: 1024px (desktops)
 * 
 * Accessibility:
 * - sr-only: Screen reader only (skip link)
 * - focus:ring-2: Keyboard focus indicator
 * 
 * Color Usage:
 * - bg-gold: Accent buttons/logo (Burnt Orange #C65D1E)
 * - bg-blush/20: Hover states (Terracotta with 20% opacity)
 * - text-primary: Main text color (Deep Warm Brown #3E2A24)
 * - text-secondary: Muted text (Medium Brown #7A5B4F)
 */
