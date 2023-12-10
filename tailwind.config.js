/* eslint-disable */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:'class',
  theme: {
    extend: {
      width: {
        49: "196px",
      },
      height: {
        29: "116px",
      },
      fontFamily: {
        graphik: ["Graphik", "sans-serif"],
      },
      colors: {
        primary: {
          200: "#C3DDFD",
          500: "#3674f2",
          600: "#1C64F2",
        },
        gray: {
          500: "#6B7280",
        },
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
