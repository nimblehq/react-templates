/**
 * Base webpack configs.
 *
 * Configs defined here can be overridden in env specific config files.
 * */

import path, { join } from 'path';
import { sync } from 'glob';

const LOADERS_DIR = path.resolve(__dirname, '..', 'config', 'webpackLoaders');

export default {
  resolve: {
    // Create aliases to import modules more easily.
    //    Eg: import AppContainer from 'Containers/app';
    alias: {
      Actions: path.resolve(__dirname, '..', 'src', 'actions/'),
      Adapters: path.resolve(__dirname, '..', 'src', 'adapters/'),
      Components: path.resolve(__dirname, '..', 'src', 'components/'),
      Constants: path.resolve(__dirname, '..', 'src', 'constants/'),
      Containers: path.resolve(__dirname, '..', 'src', 'containers/'),
      Helpers: path.resolve(__dirname, '..', 'src', 'helpers/'),
      Lib: path.resolve(__dirname, '..', 'src', 'lib/'),
      Reducers: path.resolve(__dirname, '..', 'src', 'reducers/'),
      Screens: path.resolve(__dirname, '..', 'src', 'screens/'),
      Services: path.resolve(__dirname, '..', 'src', 'services/')
    },
    // Automatically resolve these extensions
    extensions: ['*', '.js', '.jsx', '.json'],
    // Filename to be used while resolving directories
    mainFiles: ['index'],
    // Specify what directories should be searched when resolving modules.
    // `src` takes precedence over `node_modules`
    modules: [
      'src',
      'node_modules'
    ]
  },
  // Compile for usage in a browser-like environment
  target: 'web',
  module: {
    // Recursively add loaders from `LOADERS_DIR`
    rules: sync(join(LOADERS_DIR, '*.js')).map(loader => require(loader))
  }
};
