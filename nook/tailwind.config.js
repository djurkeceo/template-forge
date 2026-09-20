/** @type {import('tailwindcss').Config} */
export default {
  // No dark mode in Nook: the OS has one fixed identity (deep spruce desk,
  // paper windows). Buyers recolor it via the Hues app + these tokens.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ——— Nook identity: spruce desk + paper cards + ink outlines ———
        spruce: {
          DEFAULT: '#0F2A26',
          deep: '#0A1F1C',
          pine: '#173B34',
        },
        paper: {
          DEFAULT: '#F5F0E2',
          dim: '#EAE3D0',
        },
        ink: '#1E2723',
        marigold: {
          DEFAULT: '#E8A93D',
          soft: '#F7E3B8',
        },
        lagoon: {
          DEFAULT: '#2E8B7A',
          tint: '#CBE4DC',
        },
        cord: '#D8D2BE',
      },
      fontFamily: {
        // Expressive grotesque for window titles + dock labels.
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', '"Cascadia Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        // Paper-card chrome: crisp ink edge + hard offset press.
        card: '0 0 0 2px #1E2723, 6px 6px 0 0 rgba(10, 31, 28, 0.9)',
        'card-soft': '0 0 0 2px rgba(30, 39, 35, 0.35)',
        icon: '0 0 0 2px #1E2723, 3px 3px 0 0 rgba(10, 31, 28, 0.9)',
        dock: '0 0 0 2px #1E2723, 0 12px 32px rgba(0, 0, 0, 0.45)',
      },
      borderRadius: {
        card: '0.9rem',
        tile: '1rem',
      },
    },
  },
  plugins: [],
};
