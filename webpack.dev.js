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
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['*', '.jsx', '.js'],
    modules: [
      path.resolve(__dirname, 'packages/react-filerobot-image-editor/src'),
      'node_modules',
    ],
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
    // 'only' is better for having HOT but there is some issue currently with webpack 5 and hot of dev server with react so we are using hot: true for refreshing alsos
    hot: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
};
