const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = require('./webpack.base.config')

const config = Object.assign({}, base, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
})

config.output.filename = 'bundle.[contenthash].js'
config.output.chunkFilename = 'bundle.[contenthash].chunk.js'

config.module.rules.unshift({
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                // Options
              },
            ],
            require('tailwindcss'),
            require('cssnano')({
              preset: 'default',
            }),
            require('@fullhuman/postcss-purgecss')({
              content: ['./src/**/*.js'],
              defaultExtractor: (content) =>
                content.match(/[A-Za-z)-9-_:/]+/g) || [],
            }),
            require('autoprefixer'),
          ],
        },
        sourceMap: true,
      },
    },
  ],
})

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'styles.[contenthash].css',
  })
)

module.exports = config
