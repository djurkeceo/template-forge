/** @type {import('tailwindcss').Config} */
export default {
  // Class-based dark mode so buyers can toggle it from the demo switcher.
  // The `dark` class is applied to <html> by `useDarkMode`.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ——— Cadence palette (sage-paper + deep marine + verdant + marigold) ———
        paper: '#EFF2EB',
        line: '#D8E0D6',
        fog: '#5C6B7A',
        ink: {
          DEFAULT: '#102542',
          deep: '#0B1B31',
          surface: '#172F52',
        },
        verdant: {
          DEFAULT: '#0E7C5A',
          deep: '#0A5C44',
          tint: '#D9EBE2',
        },
        marigold: {
          DEFAULT: '#E8B44A',
          soft: '#F7E3B0',
        },
      },
      fontFamily: {
        // Display face for headlines: geometric, timetable-like, suits a booking tool.
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // UI face for body: neutral and highly legible at small sizes.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Deliberately varied elevations — not the same soft grey blur everywhere.
        lift: '0 1px 0 rgba(16, 37, 66, 0.06), 0 12px 32px -12px rgba(16, 37, 66, 0.25)',
        card: '0 0 0 1px #D8E0D6, 0 18px 40px -24px rgba(16, 37, 66, 0.35)',
        stamp: '4px 4px 0 0 #102542',
      },
      borderRadius: {
        // Mix of radii per component keeps the template from looking stamped out.
        panel: '1.25rem',
        ticket: '0.6rem',
      },
    },
  },
  plugins: [],
};
