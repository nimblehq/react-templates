/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
const path = require('path');
const pkg = require('../../package.json');
const webpackConfig = require('./webpackConfig');

module.exports = {
  title: `${pkg.name} v${pkg.version}`,
  sections: [
    {
      name: 'Components',
      components: path.resolve(__dirname, '../..', 'src/components/**/[A-Z]*.js')
    }
  ],
  webpackConfig
};
