const path = require('path')

/** @type {import('webpack').Configuration[]} */
module.exports = [
  {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      clean: true,
      filename: 'ttsmarker-sdk.js',
      library: {
        type: 'commonjs'
      },
    },
    externals: ['axios'],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    },
    optimization: {
      minimize: false
    }
  }
]