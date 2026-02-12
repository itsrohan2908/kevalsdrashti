/**
 * Layout Component
 * 
 * Features:
 * - Accessible skip-to-content link
 * - ARIA roles and landmarks
 * - Footer with contact info
 */

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
                <li>
                  <a
                    href="#events"
                    className="text-sm text-secondary hover:text-gold transition-colors font-body"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="text-sm text-secondary hover:text-gold transition-colors font-body"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-sm text-secondary hover:text-gold transition-colors font-body"
                  >
                    Contact
                  </a>
                </li>
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
