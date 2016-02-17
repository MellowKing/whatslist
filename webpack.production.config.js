var join = require('path').join;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var OfflinePlugin = require('offline-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [join(__dirname, 'entry.js')],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
    new HtmlWebpackPlugin({ template: join(__dirname, 'src/index.ejs') }),
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new OfflinePlugin({
      // All options are optional
      caches: 'all',
      scope: '/',
      updateStrategy: 'all',
      version: 'v1.04',
      ServiceWorker: {
        output: 'sw.js',
      },
      AppCache: {
        directory: 'appcache/',
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel',
      },
      { test: /\.less$/,
        loaders: ['style', 'css', 'less'],
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
    ],
  },
};
