/* eslint-disable import/no-commonjs */

const path = require('path');
const escape = require('escape-string-regexp');
const blacklist = require('metro-bundler/src/blacklist');

module.exports = {
  extraNodeModules: {
    react: path.resolve(__dirname, 'node_modules/react'),
    lodash: path.resolve(__dirname, 'node_modules/lodash'),
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    'react-native-modalbox': path.resolve(
      __dirname,
      '..',
      'node_modules/react-native-modalbox',
    ),
  },
  getBlacklistRE() {
    return blacklist([
      new RegExp(`^${escape(path.resolve(__dirname, '..', 'node_modules', 'react-native'))}\\/.*$`),
      new RegExp(`^${escape(path.resolve(__dirname, '..', 'node_modules', 'react'))}\\/.*$`),
    ]);
  },
};
