/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        safety: {
          red: '#ef4444',
          orange: '#f59e0b',
          green: '#10b981',
          blue: '#3b82f6',
          purple: '#8b5cf6',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      fontFamily: {
        'safety': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'safety': '0 4px 14px 0 rgba(236, 72, 153, 0.15)',
        'safety-lg': '0 10px 25px 0 rgba(236, 72, 153, 0.2)',
      }
    },
  },
  plugins: [],
}
