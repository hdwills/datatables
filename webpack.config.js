var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cache: true,
  devtool: '#source-map',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Datatables Demo',
    template: './src/datatables/index.html'
  })],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 1344,
    open: true
  }
}