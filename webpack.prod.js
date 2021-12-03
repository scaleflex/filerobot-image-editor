const path = require('path');
const { BannerPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('./package.json');

const now = new Date();
const banner = `
 ${pkg.name} v${pkg.version}
 ${pkg.repository.url}
 Copyright (c) 2019 ${pkg.author}
 Released under the ${pkg.license} license
 Date: ${now.toISOString()}
`;

module.exports = {
  entry: path.resolve(__dirname, 'packages/filerobot-image-editor/src'),
  mode: 'production',
  devtool: 'source-map',
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
        type: 'asset/inline', // if asset/resource it would be exported as files and less size in bundle
      },
    ],
  },
  resolve: {
    extensions: ['*', '.jsx', '.js'],
    modules: [
      path.resolve(__dirname, 'packages/react-filerobot-image-editor/src'),
      'node_modules',
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        // iF UN-COMMENTED BANNER'S PLUGIN OUTPUT WON'T APPLIED AND LICENSES OF OTHER LIBS WILL BE REMOVED
        // terserOptions: {
        //   format: {
        //     comments: false,
        //   },
        // },
      }),
    ],
  },
  plugins: [
    new BannerPlugin({ banner, entryOnly: true, raw: false }),
    new BundleAnalyzerPlugin(),
  ],
  output: {
    clean: true,
    filename: 'filerobot-image-editor.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'FilerobotImageEditor',
      type: 'umd',
      export: 'default',
    },
  },
};
