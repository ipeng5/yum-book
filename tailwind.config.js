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
          normal: '#868686',
          light: '#F5F5F5',
          normal: '#584E4A',
        },
        gold: {
          normal: '#F0DCB2',
          light: '#F8E7C4',
        },
      },
    },
  },
  plugins: [],
};
