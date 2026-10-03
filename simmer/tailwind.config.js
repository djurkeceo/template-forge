/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ——— Simmer: char + cream kitchen warmth, paprika lead ———
        char: {
          DEFAULT: '#23201B',
          deep: '#171410',
        },
        cream: {
          DEFAULT: '#F6F1E7',
          deep: '#EDE4D2',
        },
        paprika: {
          DEFAULT: '#C8502A',
          deep: '#9E3B1D',
          tint: '#F6DCCF',
        },
        basil: {
          DEFAULT: '#4E7A45',
          deep: '#37572F',
          tint: '#DCE8D4',
        },
        butter: '#E9B44C',
        crust: '#E0D5BE',
      },
      fontFamily: {
        // Outfit's soft geometry reads friendly-app, not corporate-site.
        display: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 0 1px #E0D5BE, 0 20px 44px -24px rgba(35, 32, 27, 0.35)',
        phone: '0 0 0 10px #171410, 0 0 0 12px #E0D5BE, 0 40px 80px -32px rgba(23, 20, 16, 0.55)',
      },
      borderRadius: {
        card: '1.25rem',
      },
    },
  },
  plugins: [],
};
