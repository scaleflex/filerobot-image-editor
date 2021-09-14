const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require('../package');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "../examples/react/src/index.html"),
  filename: "./index.html"
});

module.exports = (env, options) => {
  return {
    entry: path.join(__dirname, "../examples/react/src/index.js"),
    output: {
      path: path.join(__dirname, "../examples/react/dist"),
      filename: "filerobot-image-editor.[chunkhash].js",
      chunkFilename: 'filerobot-image-editor.[name].[chunkhash].js',
      publicPath: `https://cdn.scaleflex.it/plugins/${pkg.name}/`
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
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            context: 'src',
            emitFile: false,
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
          loader: 'file-loader',
          options: {
            context: 'src',
            emitFile: false,
            name: '[path][name].[ext]',
            esModule: false
          }
        }
      ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
      extensions: [".js", ".jsx"]
    },
    devtool: options.mode === 'production' ? 'none' : "sourcemap",
    devServer: {
      port: 3003
    }
  }
};
