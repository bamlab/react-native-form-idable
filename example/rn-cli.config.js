/* eslint-disable import/no-commonjs */

const path = require('path');
const escape = require('escape-string-regexp');
const blacklist = require('metro-bundler/src/blacklist');

module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '..')];
  },
  getProvidesModuleNodeModules() {
    return [
      'react-native',
      'react',
      'prop-types',
      'date-fns',
      'react-native-root-siblings',
      'lodash',
      'node-polyglot',
      'validator',
      'react-native-root-toast',
      'react-native-modalbox',
    ];
  },
  getBlacklistRE() {
    return blacklist([
      new RegExp(`^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`),
    ]);
  },
};
