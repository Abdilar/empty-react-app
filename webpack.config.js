const PATH = require('path');
const PUBLIC_PATH = PATH.join(__dirname, 'public');

module.exports = {
  entry: ["babel-polyfill", "./src/app.js"],
  output: {
    path: PUBLIC_PATH,
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.s?css$/
      }
    ]
  },
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: true,
    port: 8000,
    historyApiFallback: true
  },
  devtool: "cheap-module-eval-source-map"
};
