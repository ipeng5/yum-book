/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      colors: {
        primary: {
          normal: '#f95b47',
          light: '#feefed',
          dark: '#ae4032',
        },
        gray: {
          normal: '#584E4A',
          light: '#F9F7F9',
        },
      },
    },
  },
  plugins: [],
};
