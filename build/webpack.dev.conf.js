const PATH = require('path');
const MERGE = require('webpack-merge');
const WEBPACK = require('webpack');
const PORT_FINDER = require('portfinder');
const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = MERGE(baseWebpackConfig, {
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: false,
    clientLogLevel: 'warn',
    historyApiFallback: {
      rewrites: [
        { from: /panel\/.*/, to: PATH.posix.join('/', '/panel/index.html') },
        { from: /web\/.*/, to: PATH.posix.join('/', '/web/index.html') }
      ],
    },
    hot: true,
    compress: true,
    host: 'localhost',
    port: 8000,
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '/',
    quiet: false,
  },
  plugins: [
    new WebpackSynchronizableShellPlugin({
      onBuildStart:{
        scripts: ['echo "Webpack Start"'],
        blocking: true,
        parallel: false
      },
      onBuildEnd:{
        scripts: ['echo "Webpack End"'],
        blocking: false,
        parallel: true
      }
    }),
    new WEBPACK.DefinePlugin({
      'process.env': require('../config/enviroment.dev')
    }),
    // new BundleAnalyzerPlugin()
  ]
});

module.exports = new Promise((resolve, reject) => {
  PORT_FINDER.basePort = 8000;
  PORT_FINDER.getPort((error, port) => {
    if (error) {
      reject(error);
    } else {
      devWebpackConfig.devServer.port = port;
      resolve(devWebpackConfig);
    }
  });
});
