module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark-lighten": "#2a2a2a",
        dark: "#222222",
        "dark-darken": "#1a1a1a",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
