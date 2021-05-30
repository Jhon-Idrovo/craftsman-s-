const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      base: colors.white,
      "txt-base": colors.black,
      primary: colors.blue[100],
      "txt-primary": colors.black,
      secondary: colors.blue[200],
      "txt-secondary": colors.green[200],
      white: colors.white,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
