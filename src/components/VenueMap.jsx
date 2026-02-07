import { motion } from 'framer-motion'

/**
 * VenueMap Component
 * 
 * Features:
 * - Embedded Google Maps iframe
 * - Illustrative SVG mini-map with heart pin
 * - "Open in Google Maps" link
 * - "Get Directions" button
 * - Accessible and responsive
 * 
 * @param {Object} props
 * @param {Object} props.venue - Venue information
 */

// Default venue data
const defaultVenue = {
  name: 'The Grand Estate',
  address: '123 Vineyard Lane, Napa Valley, CA 94558',
  coordinates: {
    lat: 38.2975,
    lng: -122.2869,
  },
  // Google Maps embed URL
  // Generate at: https://www.google.com/maps
  // Click "Share" → "Embed a map" → Copy iframe src
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555710394!2d-122.50764019726562!3d38.29196084863698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085976736097a2f%3A0xbe4f488fbad00f9!2sNapa%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  // Google Maps link (opens in new tab)
  mapsUrl: 'https://www.google.com/maps/place/Napa,+CA',
  // Directions URL (prompts for starting location)
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Napa,CA',
}

// Illustrative SVG Mini-Map Component
function MiniMap({ venue }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      role="img"
      aria-label={`Illustrated map showing ${venue.name}`}
    >
      {/* Background */}
      <rect width="200" height="200" fill="#FBF6F0" />
      
      {/* Decorative map elements - roads */}
      <g stroke="#E8DFD6" strokeWidth="3" fill="none">
        <path d="M0 100 L200 100" /> {/* Horizontal road */}
        <path d="M100 0 L100 200" /> {/* Vertical road */}
        <path d="M0 60 Q50 50, 100 60 T200 60" /> {/* Curved road */}
        <path d="M40 0 L40 200" /> {/* Side road */}
        <path d="M160 0 L160 200" /> {/* Side road */}
      </g>
      
      {/* Decorative elements - trees/landmarks */}
      <g fill="#C9A85B" opacity="0.3">
        <circle cx="30" cy="30" r="8" />
        <circle cx="170" cy="30" r="8" />
        <circle cx="30" cy="170" r="8" />
        <circle cx="170" cy="170" r="8" />
      </g>
      
      {/* Decorative blocks - buildings */}
      <g fill="#F4D7D3" opacity="0.4">
        <rect x="50" y="110" width="30" height="20" rx="2" />
        <rect x="120" y="70" width="25" height="25" rx="2" />
        <rect x="65" y="150" width="20" height="30" rx="2" />
        <rect x="140" y="120" width="35" height="25" rx="2" />
      </g>
      
      {/* Center venue marker with pulsing animation */}
      <g className="animate-pulse-slow">
        {/* Outer glow */}
        <circle cx="100" cy="100" r="20" fill="#C9A85B" opacity="0.2" />
        <circle cx="100" cy="100" r="15" fill="#C9A85B" opacity="0.3" />
        
        {/* Heart pin */}
        <g transform="translate(100, 100)">
          {/* Heart shape */}
          <path
            d="M0 -8 C-3 -12, -8 -12, -10 -8 C-12 -4, -12 0, 0 8 C12 0, 12 -4, 10 -8 C8 -12, 3 -12, 0 -8 Z"
            fill="#C9A85B"
            stroke="#FBF6F0"
            strokeWidth="1"
          />
          {/* White dot in center */}
          <circle cx="0" cy="-2" r="2" fill="#FBF6F0" />
        </g>
      </g>
      
      {/* Label */}
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fill="#222028"
        fontSize="10"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
      >
        Venue
      </text>
    </svg>
  )
}

// Main VenueMap Component
export default function VenueMap({ venue = defaultVenue, title = 'Venue Location' }) {
  return (
    <section
      className="relative py-16 md:py-24 bg-surface"
      aria-labelledby="venue-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="venue-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            {title}
          </h2>
          <p className="font-body text-lg text-secondary">
            Join us at this beautiful location
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-gold rounded-full" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Venue Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Venue Details Card */}
            <div className="bg-background border-2 border-border rounded-2xl p-6 md:p-8">
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                {venue.name}
              </h3>
              
              {/* Address */}
              <div className="flex items-start gap-3 mb-6">
                <svg
                  className="w-6 h-6 text-gold mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="font-body text-secondary">
                  <p className="text-primary font-semibold mb-1">Address</p>
                  <address className="not-italic">{venue.address}</address>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Get Directions Button */}
                <a
                  href={venue.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full px-6 py-3 bg-gold text-background
                    font-body font-semibold rounded-lg
                    hover:bg-gold/90 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
                    flex items-center justify-center gap-2
                  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Get Directions
                </a>

                {/* Open in Google Maps Link */}
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full px-6 py-3 bg-transparent border-2 border-primary/30
                    text-primary font-body font-semibold rounded-lg
                    hover:border-gold hover:text-gold hover:bg-gold/5
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
                    flex items-center justify-center gap-2
                  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Illustrative Mini Map */}
            <div className="bg-background border-2 border-border rounded-2xl p-4 overflow-hidden">
              <p className="font-body text-sm text-secondary text-center mb-3">
                Illustrated Map
              </p>
              <div className="aspect-square w-full">
                <MiniMap venue={venue} />
              </div>
            </div>
          </motion.div>

          {/* Embedded Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative bg-background border-2 border-border rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] lg:min-h-[600px]">
              {/* Map iframe */}
              <iframe
                src={venue.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing location of ${venue.name}`}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}

/**
 * ============================================================================
 * HOW TO GET GOOGLE MAPS EMBED URL
 * ============================================================================
 * 
 * 1. Go to https://www.google.com/maps
 * 2. Search for your venue address
 * 3. Click the "Share" button
 * 4. Click "Embed a map" tab
 * 5. Choose size (Small, Medium, Large, or Custom)
 * 6. Click "COPY HTML"
 * 7. Extract the 'src' URL from the iframe
 * 
 * Example iframe from Google:
 * <iframe 
 *   src="https://www.google.com/maps/embed?pb=!1m18!1m12!..."
 *   width="600" 
 *   height="450" 
 *   style="border:0;" 
 *   allowfullscreen="" 
 *   loading="lazy">
 * </iframe>
 * 
 * Copy just the src URL (everything inside the quotes)
 * 
 * ============================================================================
 * ALTERNATIVE: Google Maps Platform API Key
 * ============================================================================
 * 
 * For more customization, use Google Maps JavaScript API:
 * 
 * 1. Get API key: https://console.cloud.google.com/
 * 2. Enable Maps JavaScript API
 * 3. Use @react-google-maps/api package
 * 
 * Example:
 * import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
 * 
 * <LoadScript googleMapsApiKey="YOUR_API_KEY">
 *   <GoogleMap
 *     center={{ lat: 38.2975, lng: -122.2869 }}
 *     zoom={15}
 *   >
 *     <Marker position={{ lat: 38.2975, lng: -122.2869 }} />
 *   </GoogleMap>
 * </LoadScript>
 * 
 * ============================================================================
 * ALTERNATIVE PROVIDERS
 * ============================================================================
 * 
 * 1. Mapbox: https://www.mapbox.com/
 *    - More customization
 *    - Better styling options
 *    - Usage-based pricing
 * 
 * 2. Leaflet: https://leafletjs.com/
 *    - Open source
 *    - Lightweight
 *    - Free with OpenStreetMap
 * 
 * 3. Apple Maps: https://developer.apple.com/maps/
 *    - Great for iOS users
 *    - Requires Apple Developer account
 * 
 * ============================================================================
 * USAGE EXAMPLE
 * ============================================================================
 * 
 * import VenueMap from './components/VenueMap'
 * 
 * const weddingVenue = {
 *   name: 'Château de Versailles',
 *   address: 'Place d\'Armes, 78000 Versailles, France',
 *   coordinates: {
 *     lat: 48.8049,
 *     lng: 2.1204,
 *   },
 *   embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!...',
 *   mapsUrl: 'https://maps.google.com/?q=Chateau+de+Versailles',
 *   directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chateau+de+Versailles',
 * }
 * 
 * <VenueMap venue={weddingVenue} title="Wedding Venue" />
 * 
 * ============================================================================
 * ACCESSIBILITY NOTES
 * ============================================================================
 * 
 * ✅ Iframe has descriptive title attribute
 * ✅ SVG has role="img" and aria-label
 * ✅ Links have clear text ("Get Directions" not just "Click here")
 * ✅ Links open in new tab with rel="noopener noreferrer"
 * ✅ Buttons have focus states
 * ✅ Address uses semantic <address> element
 * 
 * ============================================================================
 */
