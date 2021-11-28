const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'public/init.js'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(woff2)$/,
        exclude: /node_modules/,
        type: 'asset',
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['*', '.jsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: './index.html',
    }),
  ],
  devServer: {
    port: 1111,
    open: true,
    hot: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
};
