const colors = require("tailwindcss/colors")

const pimaryColor = colors.gray

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
          100: pimaryColor[100],
          200: pimaryColor[200],
          300: pimaryColor[300],
          400: pimaryColor[400],
          500: pimaryColor[500],
          600: pimaryColor[600],
          700: pimaryColor[700],
          800: pimaryColor[800],
          900: pimaryColor[900],
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
  plugins: [require("@tailwindcss/forms")],
}
