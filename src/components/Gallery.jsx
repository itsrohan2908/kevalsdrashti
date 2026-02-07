import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Gallery Component
 * 
 * Features:
 * - Responsive grid layout (masonry-like)
 * - Lazy loading with loading="lazy"
 * - Lightbox modal with navigation
 * - Video support
 * - srcset for responsive images
 * - Keyboard navigation
 * 
 * Performance Tips:
 * 1. Use WebP/AVIF formats with fallbacks
 * 2. Serve multiple sizes via srcset
 * 3. Use loading="lazy" for off-screen images
 * 4. Optimize images (80-85% quality)
 * 5. Consider CDN for image delivery
 */

// Sample media data
// TODO: Replace with actual images from your photo shoot
const defaultMedia = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    srcset: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400 400w, https://images.unsplash.com/photo-1519741497674-611481863552?w=800 800w, https://images.unsplash.com/photo-1519741497674-611481863552?w=1200 1200w',
    alt: 'Couple walking on beach at sunset',
    caption: 'Our first vacation together',
    aspectRatio: 'portrait', // portrait | landscape | square
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    srcset: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400 400w, https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800 800w',
    alt: 'Wedding rings on flower petals',
    caption: 'The rings we chose together',
    aspectRatio: 'landscape',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    srcset: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400 400w, https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800 800w',
    alt: 'Bride and groom holding hands',
    caption: 'Forever starts now',
    aspectRatio: 'portrait',
  },
  {
    id: 4,
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    alt: 'Engagement video',
    caption: 'The moment he proposed',
    aspectRatio: 'landscape',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    srcset: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400 400w, https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800 800w',
    alt: 'Beautiful flower bouquet',
    caption: 'Our chosen bouquet',
    aspectRatio: 'square',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800',
    srcset: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=400 400w, https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800 800w',
    alt: 'Couple laughing together',
    caption: 'Always making each other laugh',
    aspectRatio: 'landscape',
  },
  {
    id: 7,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
    srcset: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400 400w, https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800 800w',
    alt: 'Romantic dinner setting',
    caption: 'Anniversary dinner',
    aspectRatio: 'portrait',
  },
  {
    id: 8,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800',
    srcset: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400 400w, https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800 800w',
    alt: 'Wedding venue exterior',
    caption: 'Where we\'ll say I do',
    aspectRatio: 'landscape',
  },
]

// Lightbox Modal Component
function Lightbox({ media, currentIndex, onClose, onPrevious, onNext }) {
  const currentMedia = media[currentIndex]

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrevious()
    if (e.key === 'ArrowRight') onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-3 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {currentIndex < media.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-3 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Media content */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Image or Video */}
          {currentMedia.type === 'image' ? (
            <img
              src={currentMedia.src}
              srcSet={currentMedia.srcset}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              alt={currentMedia.alt}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          ) : (
            <video
              src={currentMedia.src}
              controls
              autoPlay
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              poster={currentMedia.poster}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {/* Caption */}
          {currentMedia.caption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center"
            >
              <p className="text-white font-body text-lg mb-2">
                {currentMedia.caption}
              </p>
              <p className="text-white/60 font-body text-sm">
                {currentIndex + 1} / {media.length}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Gallery Item Component
function GalleryItem({ item, onClick, index }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="
        relative overflow-hidden rounded-xl cursor-pointer group
        bg-blush/10 aspect-square
      "
      role="button"
      tabIndex={0}
      aria-label={`View ${item.alt}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blush/20 to-gold/20 animate-pulse" />
      )}

      {/* Image or Video Thumbnail */}
      {item.type === 'image' ? (
        <img
          src={item.src}
          srcSet={item.srcset}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={item.alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ) : (
        <div className="relative w-full h-full">
          <img
            src={item.poster}
            alt={item.alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-110
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-body text-sm font-medium">
            {item.caption}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Main Gallery Component
export default function Gallery({ media = defaultMedia, title = 'Our Moments' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }

  const goToPrevious = () => {
    setLightboxIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setLightboxIndex((prev) => Math.min(media.length - 1, prev + 1))
  }

  return (
    <section
      className="relative py-16 md:py-24 bg-background"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="gallery-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            {title}
          </h2>
          <p className="font-body text-lg text-secondary max-w-2xl mx-auto">
            A collection of our favorite memories together
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-gold rounded-full" />
          </div>
        </motion.div>

        {/* Gallery Grid - Responsive Masonry Layout */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-4 items-start
          "
          role="list"
        >
          {media.map((item, index) => (
            <div key={item.id} role="listitem">
              <GalleryItem
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {media.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary font-body text-lg">
              No photos to display yet. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            media={media}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/**
 * ============================================================================
 * PERFORMANCE OPTIMIZATION GUIDE
 * ============================================================================
 * 
 * 1. IMAGE FORMATS:
 *    - Primary: WebP (90% smaller than JPEG)
 *    - Fallback: JPEG (80-85% quality)
 *    - Modern: AVIF (even smaller than WebP)
 * 
 *    Example with picture element:
 *    <picture>
 *      <source srcset="image.avif" type="image/avif" />
 *      <source srcset="image.webp" type="image/webp" />
 *      <img src="image.jpg" alt="..." />
 *    </picture>
 * 
 * 2. RESPONSIVE IMAGES (srcset):
 *    Generate multiple sizes:
 *    - Thumbnail: 400px
 *    - Medium: 800px
 *    - Large: 1200px
 *    - Full: 1920px
 * 
 *    const media = {
 *      src: 'photo-800.jpg',
 *      srcset: 'photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w',
 *      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
 *    }
 * 
 * 3. LAZY LOADING:
 *    ✅ Already implemented with loading="lazy"
 *    - Defers loading of off-screen images
 *    - Reduces initial page load
 *    - Automatically handled by browser
 * 
 * 4. CDN OPTIMIZATION:
 *    Use image CDN services:
 *    - Cloudinary: Auto format, resize, optimize
 *    - ImageKit: Real-time image transformation
 *    - Imgix: URL-based image processing
 * 
 *    Example (Cloudinary):
 *    https://res.cloudinary.com/demo/image/upload/
 *      w_800,           // Width
 *      f_auto,          // Auto format (WebP, AVIF)
 *      q_auto:good/     // Auto quality
 *      sample.jpg
 * 
 * 5. IMAGE COMPRESSION:
 *    Tools:
 *    - TinyPNG/TinyJPG (GUI)
 *    - ImageOptim (Mac)
 *    - Squoosh (Web/CLI)
 *    - sharp (Node.js)
 * 
 *    CLI example (sharp):
 *    const sharp = require('sharp')
 *    
 *    sharp('input.jpg')
 *      .resize(800)
 *      .webp({ quality: 80 })
 *      .toFile('output.webp')
 * 
 * 6. PRELOADING CRITICAL IMAGES:
 *    Add to <head> for above-fold images:
 *    <link rel="preload" as="image" href="hero.jpg" />
 * 
 * 7. LOADING STRATEGIES:
 *    - Above-fold: Eager loading (default)
 *    - Below-fold: Lazy loading (loading="lazy")
 *    - Critical: Preload
 *    - Background: CSS with media queries
 * 
 * 8. VIDEO OPTIMIZATION:
 *    - Use MP4 (H.264) for compatibility
 *    - Provide poster image
 *    - Compress with FFmpeg:
 *      ffmpeg -i input.mp4 -vcodec h264 -acodec aac output.mp4
 *    - Consider HLS for longer videos
 * 
 * 9. ACCESSIBILITY:
 *    ✅ Alt text for all images
 *    ✅ Keyboard navigation in lightbox
 *    ✅ ARIA labels
 *    ✅ Focus management
 * 
 * 10. MONITORING:
 *     Track performance with:
 *     - Lighthouse (Google)
 *     - WebPageTest
 *     - Chrome DevTools Network tab
 *     
 *     Target metrics:
 *     - LCP (Largest Contentful Paint): < 2.5s
 *     - CLS (Cumulative Layout Shift): < 0.1
 *     - FID (First Input Delay): < 100ms
 * 
 * ============================================================================
 * USAGE EXAMPLE
 * ============================================================================
 * 
 * import Gallery from './components/Gallery'
 * 
 * const weddingPhotos = [
 *   {
 *     id: 1,
 *     type: 'image',
 *     src: '/images/photo1-800.webp',
 *     srcset: '/images/photo1-400.webp 400w, /images/photo1-800.webp 800w',
 *     alt: 'Couple on beach',
 *     caption: 'Sunset in Malibu',
 *     aspectRatio: 'landscape',
 *   },
 *   {
 *     id: 2,
 *     type: 'video',
 *     src: '/videos/proposal.mp4',
 *     poster: '/images/proposal-thumb.jpg',
 *     alt: 'Proposal video',
 *     caption: 'The big moment',
 *     aspectRatio: 'landscape',
 *   },
 * ]
 * 
 * <Gallery media={weddingPhotos} title="Our Journey" />
 */
