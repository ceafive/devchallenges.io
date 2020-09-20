module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./**/*.js", "./**/*.jsx"],
    extractor: (content) => content.match(/[\w-/:px]+(?<!:)/g) || [],
  },
  theme: {
    extend: {
      colors: {
        borderPrimary: "#BDBDBD",
        textPrimary: "#4F4F4F",
        textSecondary: "#3DB46D",
        colorBorder: "#EB5757",
        dropBack: "rgba(0, 0, 0, 0.25);",
      },
      fontFamily: {
        body: ["Noto Sans", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "12px": "12px",
        "24px": "24px",
      },
      width: {
        "620px": "620px",
      },
      height: {
        "367px": "367px",
      },
      boxShadow: {
        shadow1: "0px 1px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  variants: {},
  plugins: [],
}
