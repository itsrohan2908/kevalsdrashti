/**
 * Hero Component - Luxury Cinematic Wedding Design
 * Romantic, premium, and timeless aesthetic inspired by luxury wedding films
 */

import { useEffect, useState } from 'react'

// Default content
const defaultContent = {
  names: 'Keval & Drashti',
  subtitle: 'WE ARE GETTING MARRIED',
  date: '9 May 2026',
  location: 'The Grand Estate, Napa Valley',
}

export default function Hero({ content = {} }) {
  const heroContent = { ...defaultContent, ...content }
  const { names, subtitle, date } = heroContent
  
  const [name1, name2] = names.split('&').map(n => n.trim())
  const [isVisible, setIsVisible] = useState(false)

  // Subtle fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Full-Screen Couple Photo Background */}
      <div className="absolute inset-0 bg-black" aria-hidden="true">
        {/* Background Image - Cover entire screen */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content - Centered & Symmetrical */}
      <div 
        className={`relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        
        {/* 1. Small uppercase text at top */}
        <div className="mb-8 md:mb-12">
          <p 
            className="text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] font-light"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* 2. Couple Names - Large Cursive Luxury Font */}
        <div className="mb-10 md:mb-16">
          <h1
            id="hero-heading"
            className="leading-tight"
            style={{ 
              fontFamily: 'Great Vibes, cursive',
              color: '#FFF8F0',
            }}
          >
            <span 
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ 
                lineHeight: '1.2',
                letterSpacing: '0.02em'
              }}
            >
              {name1}
            </span>
            
            {/* Ampersand - slightly styled */}
            <span 
              className="block my-3 md:my-4 text-4xl sm:text-5xl md:text-6xl"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                color: '#E8B89D',
                letterSpacing: '0.05em'
              }}
            >
              &
            </span>
            
            <span 
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ 
                lineHeight: '1.2',
                letterSpacing: '0.02em'
              }}
            >
              {name2}
            </span>
          </h1>
        </div>

        {/* 3. Decorative Divider - Thin line with floral element */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
          <div 
            className="h-[1px] w-12 md:w-20"
            style={{ background: 'linear-gradient(to right, transparent, #E8B89D, transparent)' }}
          />
          <div className="flex items-center justify-center">
            {/* Diamond/Floral Icon */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              className="opacity-90"
            >
              <path 
                d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" 
                fill="#E8B89D"
              />
            </svg>
          </div>
          <div 
            className="h-[1px] w-12 md:w-20"
            style={{ background: 'linear-gradient(to left, transparent, #E8B89D, transparent)' }}
          />
        </div>

        {/* 4. Wedding Date - Elegant Serif */}
        <div>
          <p 
            className="text-2xl sm:text-3xl md:text-4xl font-normal"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#FFF8F0',
              letterSpacing: '0.02em'
            }}
          >
            {date}
          </p>
        </div>

      </div>

      {/* Subtle Scroll Indicator */}
      <div 
        className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-700 ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="animate-bounce"
            >
              <path 
                d="M12 5V19M12 19L6 13M12 19L18 13" 
                stroke="rgba(255, 255, 255, 0.5)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
