/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          normal: '#f95b47',
          medium: '#fa7c6c',
          light: '#feefed',
          dark: '#f84c37',
        },
        gray: {
          light: '#F5F5F5',
          normal: '#584E4A',
        },
      },
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [],
};
