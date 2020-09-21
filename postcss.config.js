const tailwindcss = require("tailwindcss")("./src/tailwind.config.js")
const cssnano = require("cssnano")
const purgecss = require("@fullhuman/postcss-purgecss")
const autoprefixer = require("autoprefixer")

module.exports = {
  plugins: [
    autoprefixer,
    tailwindcss,
    cssnano({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
    process.env.NODE_ENV === "production" &&
      purgecss({
        content: ["./src/**/*.js", "./src/**/*.jsx", "./public/**/*.html"],
        css: ["./src/assets/tailwind.css"],
        // Include any special characters you're using in this regular expression
        defaultExtractor: (content) =>
          content.match(/[A-Za-z0-9-_:px/]+/g) || [],
      }),
  ],
}
