/**
 * Hero Component - Premium, Elegant & Timeless
 */

// Default content
const defaultContent = {
  names: 'Keval & Drashti',
  subtitle: "We're getting married!",
  date: 'October 15, 2026',
  location: 'The Grand Estate, Napa Valley',
  initials: 'K&D',
  cta: {
    primary: { text: 'RSVP Now', href: '#rsvp' },
    secondary: { text: 'Our Story', href: '#story' },
  },
}

// Elegant Divider
function ElegantDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/50" />
      <span className="text-gold/60 text-sm">✦</span>
      <span className="text-blush/60 text-xs">♥</span>
      <span className="text-gold/60 text-sm">✦</span>
      <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  )
}

// Save the Date Badge
function SaveTheDateBadge({ date }) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-gold/10 via-blush/10 to-gold/10 rounded-full border border-gold/20 backdrop-blur-sm hover:border-gold/30 transition-colors duration-300">
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-background text-[10px] md:text-xs text-gold/80 uppercase tracking-widest font-medium font-sans">
          Save the Date
        </span>
        <span className="font-heading text-xl md:text-2xl lg:text-3xl text-gold font-semibold" style={{ fontFamily: 'var(--font-script)' }}>
          {date}
        </span>
        {/* Decorative corners */}
        <span className="absolute top-0 left-2 text-gold/30 text-xs">✧</span>
        <span className="absolute top-0 right-2 text-gold/30 text-xs">✧</span>
        <span className="absolute bottom-0 left-2 text-gold/30 text-xs">✧</span>
        <span className="absolute bottom-0 right-2 text-gold/30 text-xs">✧</span>
      </div>
    </div>
  )
}

export default function Hero({ content = {} }) {
  const heroContent = { ...defaultContent, ...content }
  const { names, subtitle, date, location, cta } = heroContent
  
  const [name1, name2] = names.split('&').map(n => n.trim())

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blush/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
        <div>
          {/* Subtitle */}
          <div className="mb-6">
            <p className="font-serif text-lg md:text-xl text-secondary tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
              <span className="mr-2">💍</span>
              {subtitle}
              <span className="ml-2">💍</span>
            </p>
          </div>

          {/* Main Heading - Couple Names with Heart */}
          <h1
            id="hero-heading"
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            <div className="relative inline-flex items-center justify-center gap-2 md:gap-4">
              <span>{name1}</span>
              <span className="relative mx-1 md:mx-3">
                <span className="text-3xl md:text-5xl lg:text-6xl text-blush inline-block">♥</span>
              </span>
              <span>{name2}</span>
            </div>
          </h1>

          {/* Divider */}
          <ElegantDivider />

          {/* Save the Date Badge */}
          <div className="mb-6">
            <SaveTheDateBadge date={date} />
          </div>

          {/* Location */}
          <div className="mb-10">
            <p className="font-body text-base md:text-lg text-secondary inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blush/5 border border-blush/10 hover:border-blush/20 transition-colors duration-300">
              <span>📍</span>
              <span>{location}</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Primary CTA - RSVP */}
            <a
              href={cta.primary.href}
              className="
                relative overflow-hidden
                inline-flex items-center justify-center
                px-8 py-4 min-w-[200px]
                bg-gradient-to-r from-gold to-gold/90 text-background
                font-body font-semibold text-base tracking-wide
                rounded-full shadow-lg shadow-gold/25
                hover:shadow-xl hover:shadow-gold/35 hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background
                transition-all duration-300
                group
              "
            >
              <span className="relative flex items-center gap-2">
                <span>💌</span>
                {cta.primary.text}
              </span>
            </a>

            {/* Secondary CTA - Our Story */}
            <a
              href={cta.secondary.href}
              className="
                relative
                inline-flex items-center justify-center
                px-8 py-4 min-w-[200px]
                bg-transparent text-primary
                border-2 border-blush/40
                font-body font-semibold text-base tracking-wide
                rounded-full
                hover:border-blush hover:bg-blush/5 hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-blush focus:ring-offset-2 focus:ring-offset-background
                transition-all duration-300
                group
              "
            >
              <span className="flex items-center gap-2">
                <span>✨</span>
                {cta.secondary.text}
                <span>✨</span>
              </span>
            </a>
          </div>

          {/* Footer message */}
          <p className="mt-12 text-sm text-secondary/60 font-body">
            <span className="inline-flex items-center gap-1">
              Made with <span className="text-blush">♥</span> for our special day
            </span>
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs text-secondary/50 font-body tracking-widest uppercase">
          scroll
        </span>
        <div className="w-6 h-10 border-2 border-blush/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-gold to-blush rounded-full" />
        </div>
      </div>
    </section>
  )
}

/**
 * USAGE EXAMPLE:
 * 
 * import Hero from './components/Hero'
 * 
 * const heroContent = {
 *   names: 'Emily & Michael',
 *   subtitle: 'Together forever',
 *   date: 'June 20, 2026',
 *   location: 'Château de Versailles, France',
 *   initials: 'E&M',
 *   cta: {
 *     primary: { text: 'RSVP', href: '#rsvp' },
 *     secondary: { text: 'Our Story', href: '#story' },
 *   },
 * }
 * 
 * <Hero content={heroContent} />
 */
