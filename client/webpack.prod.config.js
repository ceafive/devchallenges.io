const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 9000,
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
}
