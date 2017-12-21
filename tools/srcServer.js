// This file configures the development web server
// which supports hot reloading and synchronized testing.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../config/webpack.config.dev';

const bundler = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'src',
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }
      }),
      webpackHotMiddleware(bundler)
    ]
  },
  files: [
    'src/*.html'
  ]
});
