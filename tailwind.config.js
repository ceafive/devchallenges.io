module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        body: ["Raleway", "sans-serif"]
      },
      fontSize: {
        "7rem": "7rem",
        "8rem": "8rem",
        "10rem": "10rem",
        "6vw": "6vw",
        "8vw": "8vw"
      },
      colors: {
        primary: "#1E213A",
        secondary: "#100E1D",
        accent: "#3C47E9",
        textPrimary: "#A09FB1",
        textSecondary: "#E7E7EB",
        buttonPrimary: "#6E707A"
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.25)"
      },
      minHeight: {
        "1/2": "50%"
      }
    }
  },
  variants: {},
  plugins: []
};
