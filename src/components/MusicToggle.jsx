import { useState, useEffect, useRef } from 'react'

/**
 * MusicToggle Component
 * 
 * An elegant, minimal music control that feels like a gentle personal touch.
 * Features:
 * - Smooth volume fade in/out
 * - Remembers user preference (localStorage)
 * - Gentle pulse animation when playing
 * - Premium aesthetic matching wedding theme
 */

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const audioRef = useRef(null)
  const fadeIntervalRef = useRef(null)

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0 // Start silent for smooth fade
      audioRef.current.preload = 'auto' // Preload for faster playback
    }

    // Cleanup on unmount
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }
  }, [])

  // Smooth fade-in function
  const playWithFade = async () => {
    if (!audioRef.current) return

    try {
      await audioRef.current.play()
      setIsPlaying(true)
      localStorage.setItem('weddingMusicEnabled', 'true')

      // Fade in over 1 second for quick start
      let volume = 0
      const targetVolume = 0.4 // Subtle background volume
      const fadeStep = targetVolume / 20 // 20 steps over 1 second

      fadeIntervalRef.current = setInterval(() => {
        if (volume < targetVolume) {
          volume += fadeStep
          if (audioRef.current) {
            audioRef.current.volume = Math.min(volume, targetVolume)
          }
        } else {
          clearInterval(fadeIntervalRef.current)
        }
      }, 50)
    } catch (error) {
      // Browser blocked autoplay - this is expected and fine
      console.log('Music playback requires user interaction')
      setIsPlaying(false)
    }
  }

  // Smooth fade-out function
  const pauseWithFade = () => {
    if (!audioRef.current) return

    localStorage.setItem('weddingMusicEnabled', 'false')

    // Fade out over 1.5 seconds
    let volume = audioRef.current.volume
    const fadeStep = volume / 30

    fadeIntervalRef.current = setInterval(() => {
      if (volume > 0) {
        volume -= fadeStep
        audioRef.current.volume = Math.max(volume, 0)
      } else {
        audioRef.current.pause()
        setIsPlaying(false)
        clearInterval(fadeIntervalRef.current)
      }
    }, 50)
  }

  // Toggle music
  const handleToggle = () => {
    if (isPlaying) {
      pauseWithFade()
    } else {
      playWithFade()
    }
  }

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        aria-label="Background wedding music"
      >
        <source src="/music/wedding-music.mp3" type="audio/mpeg" />
        <source src="/music/wedding-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Music Toggle Button */}
      <button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="music-toggle-button"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        aria-pressed={isPlaying}
      >
        {/* Soft Glow Effect */}
        <div className={`music-toggle-glow ${isPlaying ? 'active' : ''}`} />

        {/* Icon Container */}
        <div className="music-toggle-icon-container">
          {isPlaying ? (
            // Music Note Icon (Animated when playing)
            <svg
              className="music-toggle-icon music-playing"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18V5L21 3V16M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18ZM21 16C21 17.6569 19.6569 19 18 19C16.3431 19 15 17.6569 15 16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16ZM9 10L21 8"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated sound waves */}
              <circle className="music-wave" cx="7" cy="8" r="0.8" fill="currentColor">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <circle className="music-wave" cx="10" cy="6" r="0.8" fill="currentColor">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.5s"
                />
              </circle>
              <circle className="music-wave" cx="13" cy="5" r="0.8" fill="currentColor">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
            </svg>
          ) : (
            // Muted Music Icon
            <svg
              className="music-toggle-icon music-paused"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18V5L21 3V16M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18ZM21 16C21 17.6569 19.6569 19 18 19C16.3431 19 15 17.6569 15 16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16ZM9 10L21 8"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
              {/* Muted slash */}
              <line
                x1="2"
                y1="2"
                x2="22"
                y2="22"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          )}
        </div>

        {/* Optional subtle label */}
        <span className={`music-toggle-label ${isHovered || isPlaying ? 'visible' : ''}`}>
          {isPlaying ? 'Music' : 'Music'}
        </span>
      </button>

      {/* Styles */}
      <style>{`
        .music-toggle-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 50;
          
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          background: rgba(245, 230, 211, 0.95); /* Creamy beige with transparency */
          backdrop-filter: blur(8px);
          
          border: 1.5px solid #E8B89D; /* Soft highlight border */
          border-radius: 9999px; /* Fully rounded */
          
          padding: 0.75rem 1rem;
          
          box-shadow: 0 4px 16px rgba(62, 42, 36, 0.12),
                      0 2px 8px rgba(201, 122, 86, 0.08);
          
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          
          /* Prevent text selection */
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .music-toggle-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(62, 42, 36, 0.16),
                      0 4px 12px rgba(201, 122, 86, 0.12);
          border-color: #C97A56; /* Terracotta on hover */
        }

        .music-toggle-button:active {
          transform: translateY(0);
          transition: all 0.15s ease;
        }

        /* Soft glow effect */
        .music-toggle-glow {
          position: absolute;
          inset: -12px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(201, 122, 86, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }

        .music-toggle-glow.active {
          opacity: 1;
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        /* Icon styling */
        .music-toggle-icon-container {
          position: relative;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .music-toggle-icon {
          width: 100%;
          height: 100%;
          color: #C65D1E; /* Burnt orange/gold */
          transition: all 0.3s ease;
        }

        .music-toggle-icon.music-playing {
          animation: subtle-bounce 2s ease-in-out infinite;
        }

        @keyframes subtle-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .music-toggle-icon.music-paused {
          opacity: 0.6;
        }

        .music-toggle-button:hover .music-toggle-icon {
          color: #C97A56; /* Terracotta on hover */
          transform: scale(1.1);
        }

        /* Label styling */
        .music-toggle-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.813rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: #7A5B4F; /* Medium brown */
          
          opacity: 0;
          max-width: 0;
          overflow: hidden;
          white-space: nowrap;
          
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .music-toggle-label.visible {
          opacity: 1;
          max-width: 4rem;
          margin-left: 0.25rem;
        }

        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .music-toggle-button {
            bottom: 1.25rem;
            right: 1.25rem;
            padding: 0.625rem 0.875rem;
          }

          .music-toggle-icon-container {
            width: 1.25rem;
            height: 1.25rem;
          }

          /* Hide label on mobile for cleaner look */
          .music-toggle-label {
            display: none;
          }
        }

        /* Accessibility: Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .music-toggle-button,
          .music-toggle-icon,
          .music-toggle-glow,
          .music-toggle-label {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Touch feedback for mobile */
        @media (hover: none) and (pointer: coarse) {
          .music-toggle-button:active {
            transform: scale(0.95);
            opacity: 0.9;
          }
        }
      `}</style>
    </>
  )
}
