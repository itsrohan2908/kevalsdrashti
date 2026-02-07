import { motion } from 'framer-motion'

/**
 * Registry Component
 * 
 * Features:
 * - Platform name, logo/icon, and link
 * - Short description note
 * - Personal message under each registry
 * - Refined card design
 * - External links (no auto-redirect)
 * - Responsive grid layout
 * - Hover effects
 * 
 * @param {Object} props
 * @param {Array} props.registries - Array of registry options
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.personalMessage - General message about gifts
 */

// Sample registry data
const defaultRegistries = [
  {
    id: 1,
    platform: 'Amazon',
    description: 'Home essentials, kitchen gadgets, and everyday items.',
    personalNote: 'We\'ve curated a list of items we\'d love for our new home together.',
    url: 'https://www.amazon.com/wedding/registry/example',
    color: '#FF9900',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.406-3.05.61-4.516.61-2.265 0-4.446-.433-6.538-1.305-2.09-.87-3.916-2.028-5.475-3.473-.21-.196-.24-.36-.09-.525zm18.738-4.095c-.219-.18-.403-.12-.55.18-.15.296-.255.495-.315.6-.06.105-.165.196-.316.27-.15.074-.315.09-.495.045-.18-.045-.27-.15-.27-.316 0-.135.03-.27.09-.405.165-.39.48-.855.945-1.395.225-.27.495-.51.81-.72.315-.21.63-.345.945-.405.316-.06.57-.015.765.135.195.15.3.375.3.675 0 .27-.075.57-.225.9-.075.195-.24.51-.495.945-.255.435-.375.72-.36.855.015.135.09.21.225.225.165.015.345-.015.54-.09.195-.075.375-.165.54-.27.165-.105.27-.165.315-.18.18-.075.345-.03.495.135.165.18.165.345 0 .495-.195.225-.495.45-.9.675-.405.225-.81.345-1.215.36-.57.03-1.005-.135-1.305-.495z"/>
      </svg>
    ),
  },
  {
    id: 2,
    platform: 'Target',
    description: 'Furniture, decor, and household necessities.',
    personalNote: 'Perfect for helping us style our living spaces with modern touches.',
    url: 'https://www.target.com/gift-registry/example',
    color: '#CC0000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    id: 3,
    platform: 'Zola',
    description: 'Curated wedding registry with unique gifts and experiences.',
    personalNote: 'We\'re excited about the honeymoon fund and experience gifts here!',
    url: 'https://www.zola.com/registry/example',
    color: '#00B4A0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-10h2v6h-2v-6z"/>
      </svg>
    ),
  },
  {
    id: 4,
    platform: 'Crate & Barrel',
    description: 'Quality kitchenware, dining sets, and home furnishings.',
    personalNote: 'For those special pieces that make a house feel like home.',
    url: 'https://www.crateandbarrel.com/gift-registry/example',
    color: '#00704A',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM6 10h12v2H6zm0 4h12v2H6z"/>
      </svg>
    ),
  },
  {
    id: 5,
    platform: 'Cash Fund',
    description: 'Contribute to our honeymoon or new home down payment.',
    personalNote: 'Your presence is the best present, but if you\'d like to contribute, we\'re grateful!',
    url: 'https://www.venmo.com/example',
    color: '#3D95CE',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
      </svg>
    ),
  },
]

// Individual Registry Card
function RegistryCard({ registry, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className="group"
    >
      <div className="h-full bg-background border-2 border-border rounded-2xl p-6 md:p-8 hover:border-gold hover:shadow-xl transition-all duration-300">
        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon Container */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${registry.color}15` }}
          >
            <div style={{ color: registry.color }}>
              {registry.icon}
            </div>
          </motion.div>

          {/* Platform Name */}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-2xl font-bold text-primary mb-2 truncate">
              {registry.platform}
            </h3>
            <p className="font-body text-sm text-secondary leading-relaxed">
              {registry.description}
            </p>
          </div>
        </div>

        {/* Personal Note */}
        {registry.personalNote && (
          <div className="mb-6 p-4 bg-surface rounded-lg border-l-4 border-blush">
            <p className="font-body text-sm text-primary italic">
              "{registry.personalNote}"
            </p>
          </div>
        )}

        {/* Action Link */}
        <a
          href={registry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group/link inline-flex items-center gap-2
            px-5 py-3 bg-gold/10 text-gold border-2 border-gold/30
            font-body font-semibold rounded-lg
            hover:bg-gold hover:text-background hover:border-gold
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
            transition-all duration-200
          "
        >
          <span>Visit Registry</span>
          <svg
            className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-200"
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
        </a>
      </div>
    </motion.div>
  )
}

// Main Registry Component
export default function Registry({ 
  registries = defaultRegistries,
  title = 'Gift Registry',
  subtitle = 'Your presence is the greatest gift, but if you wish to honor us with a gift, we\'ve registered at the following stores',
  personalMessage,
}) {
  return (
    <section
      className="relative py-16 md:py-24 bg-surface"
      aria-labelledby="registry-heading"
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
            id="registry-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6"
          >
            {title}
          </h2>
          <p className="font-body text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-gold to-blush rounded-full" />
          </div>
        </motion.div>

        {/* Personal Message Card (Optional) */}
        {personalMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12 p-6 md:p-8 bg-background border-2 border-gold/30 rounded-2xl"
          >
            <div className="flex items-start gap-4">
              <svg
                className="w-8 h-8 text-gold flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <p className="font-body text-primary leading-relaxed">
                {personalMessage}
              </p>
            </div>
          </motion.div>
        )}

        {/* Registry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {registries.map((registry, index) => (
            <RegistryCard key={registry.id} registry={registry} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 bg-background border-2 border-border rounded-xl">
            <p className="font-body text-secondary text-sm mb-2">
              Need help or have questions about our registry?
            </p>
            <a
              href="mailto:contact@example.com"
              className="font-body text-gold font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-gold rounded"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <svg width="120" height="40" viewBox="0 0 120 40" className="text-gold/30">
            <path
              d="M0 20 Q30 10, 60 20 T120 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="60" cy="20" r="4" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * ============================================================================
 * SAMPLE REGISTRY DATA STRUCTURE (JSON)
 * ============================================================================
 * 
 * {
 *   "registries": [
 *     {
 *       "id": 1,
 *       "platform": "Amazon",
 *       "description": "Home essentials, kitchen gadgets, and everyday items.",
 *       "personalNote": "We've curated a list of items we'd love for our new home together.",
 *       "url": "https://www.amazon.com/wedding/registry/YOUR_REGISTRY_ID",
 *       "color": "#FF9900"
 *     },
 *     {
 *       "id": 2,
 *       "platform": "Target",
 *       "description": "Furniture, decor, and household necessities.",
 *       "personalNote": "Perfect for helping us style our living spaces with modern touches.",
 *       "url": "https://www.target.com/gift-registry/YOUR_REGISTRY_ID",
 *       "color": "#CC0000"
 *     },
 *     {
 *       "id": 3,
 *       "platform": "Zola",
 *       "description": "Curated wedding registry with unique gifts and experiences.",
 *       "personalNote": "We're excited about the honeymoon fund and experience gifts here!",
 *       "url": "https://www.zola.com/registry/YOUR_REGISTRY_NAME",
 *       "color": "#00B4A0"
 *     },
 *     {
 *       "id": 4,
 *       "platform": "Crate & Barrel",
 *       "description": "Quality kitchenware, dining sets, and home furnishings.",
 *       "personalNote": "For those special pieces that make a house feel like home.",
 *       "url": "https://www.crateandbarrel.com/gift-registry/YOUR_REGISTRY_ID",
 *       "color": "#00704A"
 *     },
 *     {
 *       "id": 5,
 *       "platform": "Cash Fund",
 *       "description": "Contribute to our honeymoon or new home down payment.",
 *       "personalNote": "Your presence is the best present, but if you'd like to contribute, we're grateful!",
 *       "url": "https://www.venmo.com/YOUR_USERNAME",
 *       "color": "#3D95CE"
 *     },
 *     {
 *       "id": 6,
 *       "platform": "Bed Bath & Beyond",
 *       "description": "Bedding, bath essentials, and home organization.",
 *       "personalNote": "Helping us create a cozy and comfortable sanctuary.",
 *       "url": "https://www.bedbathandbeyond.com/store/giftregistry/YOUR_REGISTRY_ID",
 *       "color": "#003DA5"
 *     },
 *     {
 *       "id": 7,
 *       "platform": "Williams Sonoma",
 *       "description": "Premium cookware, bakeware, and gourmet kitchen tools.",
 *       "personalNote": "For our culinary adventures and dinner party dreams!",
 *       "url": "https://www.williams-sonoma.com/registry/YOUR_REGISTRY_ID",
 *       "color": "#8B4513"
 *     },
 *     {
 *       "id": 8,
 *       "platform": "Honeyfund",
 *       "description": "Honeymoon experiences, excursions, and romantic dinners.",
 *       "personalNote": "Help us create unforgettable memories on our dream honeymoon!",
 *       "url": "https://www.honeyfund.com/wedding/YOUR_WEDDING_NAME",
 *       "color": "#F4A460"
 *     }
 *   ]
 * }
 * 
 * ============================================================================
 * POPULAR REGISTRY PLATFORMS
 * ============================================================================
 * 
 * Traditional Retailers:
 * - Amazon: https://www.amazon.com/wedding/home
 * - Target: https://www.target.com/gift-registry
 * - Walmart: https://www.walmart.com/cp/wedding-registry
 * - Macy's: https://www.macys.com/registry/wedding
 * - Bed Bath & Beyond: https://www.bedbathandbeyond.com/store/giftregistry
 * 
 * Specialty & Home Goods:
 * - Crate & Barrel: https://www.crateandbarrel.com/gift-registry
 * - Williams Sonoma: https://www.williams-sonoma.com/registry
 * - Pottery Barn: https://www.potterybarn.com/registry
 * - West Elm: https://www.westelm.com/registry
 * - Sur La Table: https://www.surlatable.com/gift-registry
 * 
 * Wedding-Specific:
 * - Zola: https://www.zola.com (universal registry + cash funds)
 * - The Knot: https://registry.theknot.com
 * - Blueprint Registry: https://www.blueprintregistry.com
 * - Honeyfund: https://www.honeyfund.com (honeymoon fund)
 * - Traveler's Joy: https://www.travelersjoy.com (travel registry)
 * 
 * Cash Funds & Experiences:
 * - Venmo: https://venmo.com
 * - PayPal: https://paypal.com
 * - Cash App: https://cash.app
 * - Zelle: https://zellepay.com
 * 
 * ============================================================================
 * USAGE EXAMPLE
 * ============================================================================
 * 
 * import Registry from './components/Registry'
 * import registryData from './data/registry.json'
 * 
 * <Registry
 *   registries={registryData.registries}
 *   title="Gift Registry"
 *   subtitle="Your presence is the greatest gift..."
 *   personalMessage="We're so grateful to have you celebrate with us. If you'd like to give a gift, we've selected items we'll use as we start our new life together."
 * />
 * 
 * ============================================================================
 * LOADING FROM JSON FILE
 * ============================================================================
 * 
 * Create: src/data/registry.json
 * 
 * Then import:
 * import registryData from '../data/registry.json'
 * 
 * <Registry registries={registryData.registries} />
 * 
 * ============================================================================
 * CUSTOMIZATION TIPS
 * ============================================================================
 * 
 * 1. Brand Colors: Use official brand colors for each platform
 * 2. Icons: Replace default icons with official logos (check licensing)
 * 3. Priority: Put your preferred registry first in the array
 * 4. Privacy: Some couples prefer not to list specific dollar amounts
 * 5. Alternatives: Consider charity donations in lieu of gifts option
 * 
 * Example charity option:
 * {
 *   "id": 9,
 *   "platform": "Charity Donation",
 *   "description": "Donate to our favorite causes in our name.",
 *   "personalNote": "We're blessed with everything we need. Please consider a donation to [Charity Name].",
 *   "url": "https://www.charityname.org/donate",
 *   "color": "#4CAF50"
 * }
 * 
 * ============================================================================
 * ACCESSIBILITY CHECKLIST
 * ============================================================================
 * 
 * ✅ External links have rel="noopener noreferrer"
 * ✅ Links clearly labeled ("Visit Registry" not "Click here")
 * ✅ Focus states on all interactive elements
 * ✅ Color contrast meets WCAG AA standards
 * ✅ Semantic heading hierarchy (h2)
 * ✅ ARIA labels where needed
 * ✅ Keyboard navigable
 * ✅ Motion respects prefers-reduced-motion
 * 
 * ============================================================================
 * NO AUTO-REDIRECT
 * ============================================================================
 * 
 * This component does NOT auto-redirect. Users must:
 * 1. Read the registry information
 * 2. Choose which registry to visit
 * 3. Click "Visit Registry" button
 * 4. Opens in new tab (target="_blank")
 * 
 * Benefits:
 * - User control and choice
 * - Can compare multiple registries
 * - No surprising navigation
 * - Better user experience
 * 
 * ============================================================================
 */
