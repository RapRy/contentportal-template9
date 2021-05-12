module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      darkRed: "rgba(106, 4, 15, 0.9)",
      lightRed: "rgba(220, 47, 2, 0.9)",
      orange: "#F48C06",
      yellow: "#FFC700",
      black: "#283618",
      gray: {
        '1': "#D4CECE",
        '2': "#878787"
      },
      white: "#fff"
    },
    boxShadow: {
      navShadow: "0px 0px 20px rgba(0, 0, 0, 0.35)",
      contentShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"]
    },
    extend: {
      gridTemplateColumns: {
        '1frAuto': '1fr auto'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
