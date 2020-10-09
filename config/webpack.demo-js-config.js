const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var _ = require('lodash');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "../examples/js/src/index.html"),
  filename: "./index.html"
});

module.exports = (env, options) => {
  return {
    entry: path.join(__dirname, "../examples/js/src/index.js"),
    output: {
      path: path.join(__dirname, "../examples/js/dist"),
      filename: "filerobot-image-editor.main.[chunkhash].js",
      chunkFilename: "filerobot-image-editor.[name].[chunkhash].js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ["babel-loader"],
          exclude: /(node_modules|bower_components)\/(?!pretty-bytes\/).*/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    devtool: options.mode === 'development' ? "sourcemap" : "none",
    devServer: {
      port: 3003
    }
  };
}