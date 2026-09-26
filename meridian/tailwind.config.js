/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ——— Meridian: warm paper + ink neutrals, one crimson accent ———
        paper: '#F7F6F3',
        ink: {
          DEFAULT: '#1B1E22',
          soft: '#3E434A',
          faint: '#6E7278',
        },
        line: '#E6E2D6',
        ember: {
          DEFAULT: '#BE123C',
          deep: '#881337',
          tint: '#F8E3E8',
        },
        night: {
          DEFAULT: '#14171B',
          raised: '#1D2127',
          line: '#2A2F36',
        },
      },
      fontFamily: {
        // Inter runs the interface; Plex Mono sets the figures.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // shadcn-style single radius token family.
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      boxShadow: {
        // Two-level elevation system — nothing ad hoc.
        // Level 1: resting cards. Level 2: raised (hover, popovers, drawer).
        level1: '0 0 0 1px #E6E2D6, 0 1px 2px rgba(27, 30, 34, 0.05)',
        level2: '0 0 0 1px #E6E2D6, 0 12px 32px -12px rgba(27, 30, 34, 0.22)',
        'level1-dark': '0 0 0 1px #2A2F36, 0 1px 2px rgba(0, 0, 0, 0.4)',
        'level2-dark': '0 0 0 1px #2A2F36, 0 16px 40px -12px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
