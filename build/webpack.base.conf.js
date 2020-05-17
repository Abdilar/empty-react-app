const PATH = require('path');
const MULTI_HELPER = require('./multi-helper');

module.exports = {
  context: PATH.resolve(__dirname, '../'),
  entry: MULTI_HELPER.getEntry(),
  output: {
    filename: "[name].js",
    path: PATH.join(__dirname, '../public'),
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss'],
    alias: {
      '@': PATH.join(__dirname, '..', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: PATH.join(__dirname, '..', 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: MULTI_HELPER.generateTemplate(),
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: "all",
          test: /node_modules/,
          priority: 20
        },
        common: {
          name: 'common',
          chunks: "all",
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
};
