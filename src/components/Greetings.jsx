import { useEffect, useRef, useState } from 'react'

export default function Greetings() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-b from-white via-amber-50/30 to-white py-20 md:py-32 lg:py-40"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div 
          className={`text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Small Label */}
          <div className="mb-8 md:mb-10">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-amber-700 font-light">
              WITH LOVE
            </p>
          </div>

          {/* Main Heading */}
          <div className="mb-10 md:mb-14">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 text-amber-900"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              You Are Cordially Invited
            </h2>
            
            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
            </div>
          </div>

          {/* Invitation Message */}
          <div className="mb-12 md:mb-16">
            <p 
              className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-relaxed lg:leading-loose text-amber-950/80 px-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              With hearts full of joy, we invite you to celebrate the union of{' '}
              <span className="text-amber-700 font-medium">Keval</span> and{' '}
              <span className="text-amber-700 font-medium">Drashti</span>. 
              Your presence and blessings would mean the world to us as we begin 
              this beautiful new chapter together.
            </p>
          </div>

          {/* Family Signature */}
          <div>
            <p 
              className="text-sm md:text-base text-amber-800/60 font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              — The Families
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
