/**
 * @fileoverview NextJS Config
 */

//Imports
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withTranspileModules = require('next-transpile-modules');

//Export
module.exports = withPlugins([
  withImages(),
  withTranspileModules([
    'react-syntax-highlighter'
  ])
]);