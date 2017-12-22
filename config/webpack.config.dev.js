import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import sharedConfig from './webpack.config';
import I18n from './i18n/client';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: false
};

export default merge(sharedConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, '..', 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'I18n': I18n
    }),
    // Create HTML file that includes references to bundled CSS and JS.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src/index.ejs'),
      favicon: path.resolve(__dirname, '..', 'src/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ]
});
