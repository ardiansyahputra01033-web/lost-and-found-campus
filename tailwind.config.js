/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        campus: {
          50: '#eefbff',
          100: '#d6f5ff',
          200: '#b9eeff',
          300: '#8fe2ff',
          400: '#58cfef',
          500: '#29b3d8',
          600: '#1b8cb0',
          700: '#1b6e8d',
          800: '#1d5a75',
          900: '#1d4d63'
        }
      },
      boxShadow: {
        soft: '0 14px 40px rgba(13, 45, 71, 0.12)'
      }
    }
  },
  plugins: []
}
