const colors = require("tailwindcss/colors")

const pimaryColor = colors.trueGray

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          lighter: pimaryColor[500],
          light: pimaryColor[600],
          DEFAULT: pimaryColor[700],
          dark: pimaryColor[800],
          darker: pimaryColor[900],
        },
        success: {
          DEFAULT: colors.green[500],
        },
        error: {
          DEFAULT: colors.red[600],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
