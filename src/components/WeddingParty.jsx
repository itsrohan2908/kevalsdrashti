import { motion } from 'framer-motion'

/**
 * WeddingParty Component
 * 
 * Features:
 * - Circular portrait grid
 * - Role labels (Maid of Honor, Best Man, etc.)
 * - One-line personal note
 * - Hover effects with scale
 * - Responsive grid (1→2→3→4 columns)
 * - Social media links (optional)
 * 
 * @param {Object} props
 * @param {Array} props.members - Array of party members
 * @param {string} props.title - Section title
 */

// Default wedding party data
const defaultMembers = [
  {
    id: 1,
    name: 'Emily Chen',
    role: 'Maid of Honor',
    note: 'Best friend since college, adventure partner.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    social: {
      instagram: 'https://instagram.com/emilychen',
    },
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Best Man',
    note: 'Brother from another mother since high school.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    social: {
      instagram: 'https://instagram.com/mrodriguez',
    },
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Bridesmaid',
    note: 'Childhood friend, always there through thick and thin.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    social: {},
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Groomsman',
    note: 'College roommate, comedy relief extraordinaire.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    social: {},
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    role: 'Bridesmaid',
    note: 'Work bestie turned real-life bestie.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    social: {
      instagram: 'https://instagram.com/jmart',
    },
  },
  {
    id: 6,
    name: 'James Thompson',
    role: 'Groomsman',
    note: 'Adventure buddy, always up for a challenge.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    social: {},
  },
  {
    id: 7,
    name: 'Olivia Brown',
    role: 'Bridesmaid',
    note: 'Cousin and confidante, family means everything.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    social: {},
  },
  {
    id: 8,
    name: 'Ryan Lee',
    role: 'Groomsman',
    note: 'Sports teammate, competitive spirit, loyal friend.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop',
    social: {},
  },
]

// Individual Party Member Card
function PartyMember({ member, index }) {
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
      className="flex flex-col items-center text-center group"
    >
      {/* Portrait Container */}
      <div className="relative mb-4">
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-blush/30 transform group-hover:scale-110 transition-transform duration-300" />
        
        {/* Portrait Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-background shadow-lg"
        >
          <img
            src={member.image}
            alt={`${member.name}, ${member.role}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Social Links (if available) */}
        {member.social?.instagram && (
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="
              absolute bottom-2 right-2 w-10 h-10 bg-background border-2 border-gold
              rounded-full flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              hover:bg-gold hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold
            "
            aria-label={`Follow ${member.name} on Instagram`}
          >
            <svg className="w-5 h-5 text-gold group-hover:text-background" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        )}
      </div>

      {/* Member Info */}
      <div className="space-y-2 max-w-xs">
        {/* Name */}
        <h3 className="font-heading text-2xl font-bold text-primary">
          {member.name}
        </h3>
        
        {/* Role */}
        <div className="inline-block px-4 py-1 bg-gold/10 border border-gold/30 rounded-full">
          <p className="font-body text-sm font-semibold text-gold uppercase tracking-wide">
            {member.role}
          </p>
        </div>
        
        {/* Note */}
        <p className="font-body text-secondary italic leading-relaxed">
          "{member.note}"
        </p>
      </div>
    </motion.div>
  )
}

// Main WeddingParty Component
export default function WeddingParty({ 
  members = defaultMembers, 
  title = 'Our Wedding Party',
  subtitle = 'The amazing people standing by our side'
}) {
  return (
    <section
      className="relative py-16 md:py-24 bg-background"
      aria-labelledby="party-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="party-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            {title}
          </h2>
          <p className="font-body text-lg text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-gold to-blush rounded-full" />
          </div>
        </motion.div>

        {/* Party Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16">
          {members.map((member, index) => (
            <PartyMember key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex justify-center"
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
 * USAGE EXAMPLE
 * ============================================================================
 * 
 * import WeddingParty from './components/WeddingParty'
 * 
 * const weddingParty = [
 *   {
 *     id: 1,
 *     name: 'Jane Doe',
 *     role: 'Maid of Honor',
 *     note: 'My sister and best friend forever.',
 *     image: '/images/party/jane.jpg',
 *     social: {
 *       instagram: 'https://instagram.com/janedoe',
 *     },
 *   },
 *   // ... more members
 * ]
 * 
 * <WeddingParty 
 *   members={weddingParty}
 *   title="Our Wedding Party"
 *   subtitle="The special people celebrating with us"
 * />
 * 
 * ============================================================================
 */
