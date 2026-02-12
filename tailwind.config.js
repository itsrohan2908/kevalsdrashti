/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      /* === Color System === */
      colors: {
        // Primary palette - Warm Indian-Inspired Wedding Theme
        background: '#F5E6D3',      // Creamy Beige - Main background
        primary: '#3E2A24',          // Deep Warm Brown - Text
        blush: '#C97A56',           // Terracotta - Secondary accent
        gold: '#C65D1E',            // Burnt Orange - Primary accent
        
        // Semantic colors
        surface: '#EED9C4',          // Soft Beige - Cards, elevated surfaces
        secondary: '#7A5B4F',        // Medium Brown - Secondary text
        border: '#E8B89D',          // Soft Highlight - Borders, dividers
        highlight: '#E8B89D',       // Soft Highlight/Glow - Special effects
        
        // Legacy mappings (for backwards compatibility)
        accent: '#C97A56',
        foreground: '#3E2A24',
        muted: '#7A5B4F',
      },
      
      /* === Typography === */
      fontFamily: {
        // Heading font: Pacifico (romantic, minimal)
        // Usage: className="font-heading" or style={{ fontFamily: 'Pacifico, cursive' }}
        heading: ['Pacifico', 'cursive'],
        
        // Body font: Inter (clean, modern sans-serif)
        // Usage: className="font-body"
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        
        // Default sans (alias to body)
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        
        // Serif: Cormorant Garamond (elegant serif for quotes/accents)
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      
      /* === Spacing === */
      spacing: {
        '18': '4.5rem',   // 72px - Premium breathing room
        '22': '5.5rem',   // 88px - Extra spacing
        '30': '7.5rem',   // 120px - Hero sections
        '88': '22rem',    // 352px - Large layouts
        '128': '32rem',   // 512px - Max widths
      },
      
      /* === Border Radius - Soft, Minimal Corners === */
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      
      /* === Border Radius - Soft, Minimal Corners === */
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      
      /* === Animations === */
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

/* === Usage Examples ===

1. Typography:
   <h1 className="font-heading text-5xl font-bold text-primary">
     Sarah & James
   </h1>
   <p className="font-body text-lg text-secondary">
     Join us on our special day
   </p>

2. Colors:
   <div className="bg-background">
     <button className="bg-gold text-background hover:bg-gold/90">
       RSVP
     </button>
     <div className="bg-blush/20 border border-blush">
       Accent card
     </div>
   </div>

3. Spacing:
   <section className="py-24 px-8">
     <div className="space-y-12">
       Content with consistent spacing
     </div>
   </section>

*/
