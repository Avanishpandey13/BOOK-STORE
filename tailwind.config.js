/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "createimg": "url('./createimg.avif')"
      }
    },
  },
  plugins: [],
}

