/** @type {import('tailwindcss').Config} */
export default {
  // Class-based dark mode; the Sun/Moon button in Navbar toggles `.dark`.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ——— Fernway palette: deep forest + mist + fern + sunbeam ———
        forest: {
          DEFAULT: '#14342B',
          deep: '#0C231C',
          ink: '#1E2420',
        },
        mist: '#E9F1EA',
        fern: {
          DEFAULT: '#2E7D4F',
          deep: '#1F5C39',
          tint: '#D6E8D9',
        },
        sunbeam: {
          DEFAULT: '#E5A83B',
          soft: '#F7E7C3',
        },
        bark: '#4A3B2E',
        stone: '#D8E2D8',
      },
      fontFamily: {
        // Leafy but engineered: rounded geometric display for a plant store.
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Product-tile artwork: six graded botanical backdrops so placeholder
      // photography feels art-directed. Classes: bg-tile-1 … bg-tile-6.
      backgroundImage: {
        'tile-1': 'radial-gradient(120% 100% at 20% 0%, #3E8E5C 0%, #1F5C39 55%, #14342B 100%)',
        'tile-2': 'radial-gradient(120% 100% at 80% 10%, #7FB069 0%, #2E7D4F 55%, #14342B 100%)',
        'tile-3': 'linear-gradient(160deg, #E5A83B 0%, #B4762A 45%, #4A3B2E 100%)',
        'tile-4': 'radial-gradient(110% 110% at 50% 100%, #2E7D4F 0%, #14342B 60%, #0C231C 100%)',
        'tile-5': 'linear-gradient(150deg, #9DBEA9 0%, #5E8F71 50%, #1F5C39 100%)',
        'tile-6': 'radial-gradient(120% 120% at 80% 90%, #E5A83B 0%, #8A5A24 50%, #1E2420 100%)',
      },
      boxShadow: {
        // Shelf styling: crisp offset edge, not the generic soft grey blur.
        shelf: '0 0 0 1px #D8E2D8, 0 16px 32px -20px rgba(20, 52, 43, 0.45)',
        tag: '3px 3px 0 0 #14342B',
      },
      borderRadius: {
        shelf: '1.1rem',
        pod: '0.65rem',
      },
    },
  },
  plugins: [],
};
