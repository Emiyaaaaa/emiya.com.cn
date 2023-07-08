/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  // darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'color-main': 'hsl(var(--color-main) / <alpha-value>)',
        'color-main-dark': 'hsl(var(--color-main-dark) / <alpha-value>)',
        'color-bg': 'rgb(var(--color-bg) / <alpha-value>)',
        'color-font': 'rgb(var(--color-font) / <alpha-value>)',
        'color-tag': 'rgb(var(--color-tag) / <alpha-value>)',
        'color-font-80': 'rgb(var(--color-font) / 0.8)',
      },
      inset: {
        '1/10': '10%',
        '1/20': '5%',
      },
      height: {
        '9/10': '90%',
      },
      backdropOpacity: {
        5: '0.05',
      },
      before: {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '0',
      },
      backgroundImage: {
        'img-color-tag': 'linear-gradient(90deg, rgb(var(--color-tag)) 0%, rgb(var(--color-tag)) 100%)',
      },
      animation: {
        'pulse-light': 'pulse-light 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-light': {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 0.5 },
        },
      },
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
