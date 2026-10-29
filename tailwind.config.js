/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Manrope"', 'sans-serif'],
        mono: ['"DM Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#121815',
          secondary: '#18211c',
          card: '#1d2721',
          border: '#303b34',
        },
        accent: {
          lime: '#21d96b',
          cyan: '#76e69a',
          purple: '#9b5de5',
        },
        text: {
          primary: '#f1f2eb',
          secondary: '#b3beb5',
          muted: '#a0aaa1',
        },
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}
