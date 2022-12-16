/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
          medium: '#fa7c6c',
          light: '#feefed',
          dark: '#c74939',
        },
        gray: {
          light: '#F5F5F5',
          normal: '#584E4A',
        },
      },
    },
  },
  plugins: [],
};
