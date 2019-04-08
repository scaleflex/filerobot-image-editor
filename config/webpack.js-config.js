const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const webpack = require('webpack');
const pkg = require('../package');

const now = new Date();
const banner = `
 ${pkg.name} v${pkg.version}
 ${pkg.repository.url}

 Copyright (c) 2019 ${pkg.author}
 Released under the ${pkg.license} license

 Date: ${now.toISOString()}
`;


const reactLoadablePlugin =  new ReactLoadablePlugin({
  filename: '../build/react-loadable.json'
});

module.exports = {
  entry: path.join(__dirname, "../projects/js/index.js"),
  output: {
    path: path.join(__dirname, "../build"),
    filename: `main.min.js`,
    chunkFilename: `[name].min.js`,
    jsonpFunction: 'webpackJsonp' + Date.now(),
    publicPath: `https://scaleflex.airstore.io/filerobot/image-editor/${pkg.version}/`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /(node_modules|bower_components)\/(?!pretty-bytes\/).*/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    reactLoadablePlugin,
    new webpack.BannerPlugin(banner)
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devtool: "sourcemap",
  devServer: {
    port: 3001
  }
};