/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: ['./script/index.ts'],
  output: {
    path: path.join(__dirname, 'script'),
    filename: 'bundle.js'
  },
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  devtool: 'source-map',
}