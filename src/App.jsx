import { useEffect } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Events from './components/Events'
import Gallery from './components/Gallery'

// Hero content configuration
const heroContent = {
  names: 'Keval & Drashti',
  subtitle: "We're getting married!",
  date: 'October 15, 2026',
  location: 'The Grand Estate, Napa Valley',
  initials: 'K&D',
  cta: {
    primary: { text: 'View Events', href: '#events' },
    secondary: { text: 'View Gallery', href: '#gallery' },
  },
}

function App() {
  useEffect(() => {
    // Detect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion')
    }
  }, [])

  return (
    <Layout>
      {/* Hero Section */}
      <Hero content={heroContent} />

      <section id="events" className="bg-background">
        <Events title="Event Schedule" />
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="bg-surface">
        <Countdown 
          targetDate="2026-10-15T16:00:00" 
          title="Counting Down To Our Big Day"
        />
      </section>

      <section id="gallery" className="bg-background">
        <Gallery title="Our Moments" />
      </section>

      
    </Layout>
  )
}

export default App
