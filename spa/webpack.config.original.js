// http://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router
var path = require('path')
var webpack = require('webpack');
var _ = require('lodash')

var webpackConfigBase = require(path.join(__dirname, 'webpack.config.base.js'))

var webpackConfigOriginal = _.defaultsDeep({
    entry: {
      reacthotloading: [
        'webpack-dev-server/client?http://0.0.0.0:'+webpackConfigBase.__custom.wpDSPort, // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors,
        webpackConfigBase.__custom.entry.vendor,
        webpackConfigBase.__custom.entry.app
      ]
    },
    output: {
      filename: '[name].original.js',
      publicPath: 'http://localhost:' + webpackConfigBase.__custom.wpDSPort + '/static/'
    },
    devtool: 'eval'
  }, webpackConfigBase);

webpackConfigOriginal.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

module.exports = webpackConfigOriginal;
