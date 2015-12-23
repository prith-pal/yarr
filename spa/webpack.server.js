// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config.original');

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true,
//   stats: {
//     colors: true
//   },
//   noInfo: true
// }).listen(3000, 'localhost', function (err, result) {
//   if (err) {
//     console.log(err);
//   }

//   console.log('Listening at localhost:3000');
// });

// From http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.original.js');
// var path = require('path');
// var fs = require('fs');
// var mainPath = path.resolve(__dirname, '..', 'app', 'main.js');

// First we fire up Webpack an pass in the configuration we
// created
var bundleStart = null;
var compiler = Webpack(webpackConfig);

// We give notice in the terminal when it starts bundling and
// set the time it started
compiler.plugin('compile', function() {
  console.log('Bundling...');
  bundleStart = Date.now();
});

// We also give notice when it is done compiling, including the
// time it took. Nice to have
compiler.plugin('done', function() {
  console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms');
});

var webpackDevServer = new WebpackDevServer(compiler, {

  // We need to tell Webpack to serve our bundled application
  // from the build path. When proxying:
  // http://localhost:3000/build -> http://localhost:8080/build
  publicPath: webpackConfig.output.publicPath,

  // Configure hot replacement
  hot: true,

  // The rest is terminal configurations
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  }
});

// We fire up the development server and give notice in the terminal
// that we are starting the initial bundle
webpackDevServer.listen(webpackConfig.__custom.wpDSPort, 'localhost', function () {
  console.log('Bundling project, please wait...');
});
