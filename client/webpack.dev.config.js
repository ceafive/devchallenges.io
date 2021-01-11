const base = require('./webpack.base.config')

const config = Object.assign({}, base, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
})

config.module.rules.unshift({
  test: /\.css$/,
  use: [
    'style-loader',
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
          ],
        },
        sourceMap: true,
      },
    },
  ],
})

module.exports = config
