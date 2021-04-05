module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
