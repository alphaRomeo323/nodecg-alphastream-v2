/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 25px 20px rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        'inner-lg': 'inset 0 10px 20px -3px rgb(0 0 0 / 0.05)',
      }
    }
  },
  plugins: [],
}
