/**
 * @file webpack.config.js
 * Exports webpack configuration.
 */

const loaders = [
  {
    test: /\.(js)$/i,
    exclude: /node_modules/,
    loaders: ['babel-loader'],
  },
];

module.exports = () => ({
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'aframe-dialog-component.js',
    publicPath: '',
  },
  module: {
    loaders,
  },
});
