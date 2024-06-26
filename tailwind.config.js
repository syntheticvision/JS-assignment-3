module.exports = {
  content: [
    "./views/**/*.html",
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: ["fantasy"], // You can choose a theme from DaisyUI's theme list
  },
}
