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
        // Primary palette - wedding theme
        background: '#FBF6F0',      // Cream
        primary: '#222028',          // Near-black text
        blush: '#F4D7D3',           // Accent blush pink
        gold: '#C9A85B',            // Accent gold
        
        // Semantic colors
        surface: '#FFFFFF',          // Cards, elevated surfaces
        secondary: '#6B6874',        // Secondary text
        border: '#E8DFD6',          // Borders, dividers
        
        // Legacy mappings (for backwards compatibility)
        accent: '#F4D7D3',
        foreground: '#222028',
        muted: '#6B6874',
      },
      
      /* === Typography === */
      fontFamily: {
        // Heading font: Playfair Display (serif, elegant)
        // Usage: className="font-heading"
        heading: ['Playfair Display', 'Georgia', 'serif'],
        
        // Body font: Inter (sans-serif, readable)
        // Usage: className="font-body"
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        
        // Default sans (alias to body)
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        
        // Default serif (alias to heading)
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      
      /* === Spacing === */
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
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
