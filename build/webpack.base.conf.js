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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName:'[local]--[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ],
        test: /\.module.s?css$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader','css-loader', 'sass-loader'],
        test: /\.s?css$/,
        exclude: /\.module.s?css$/
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: PATH.posix.join('asset/images'),
          name: '[name].[hash:5].[ext]',
        },
        exclude: /node_modules/
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          outputPath: PATH.posix.join('asset/media'),
          name: '[name].[hash:5].[ext]',
        }
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
