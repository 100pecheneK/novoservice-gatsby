module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
  variants: {
    extend: {
      width: ['first'],
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
