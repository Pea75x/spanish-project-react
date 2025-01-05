/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  safelist: [
    'md:h-[calc(100vh - 320px)]'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
