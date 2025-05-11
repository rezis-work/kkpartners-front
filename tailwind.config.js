/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '380px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {},
    plugins: [require('tailwindcss-animate')],
  },
}
