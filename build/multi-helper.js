const GLOB = require('glob');
const PATH = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getEntry = () => {
  const entries = {};
  const files = GLOB.sync("src/**/app.js");
  files.map(file => {
    const key = file.match(/src\/(\w+)/)[1];
    entries[key] = ['babel-polyfill', PATH.join(__dirname, '..', file)];
  });
  return entries;
};

const generateTemplate = () => {
  const templateList = [];
  const files = GLOB.sync("src/**/index.html").map(file => {
    let item = {};
    item.filename = file.slice(4);
    item.template = file;
    item.chunk = file.match(/src\/(\w+)/)[1];
    return item;
  });

  files.map(file => {
    const templateConfig = {
      filename: file.filename,
      template: file.template,
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
        chunksSortMode: 'dependency'
      },
      chunks: [file.chunk],
      // favicon: 'favicon.ico'
    };
    templateList.push(new HtmlWebpackPlugin(templateConfig));
  });

  // templateList.push(
  //     new SplitChunksPlugin({
  //       name: 'commons',
  //     })
  // );

  return templateList;
};

module.exports = {
  getEntry,
  generateTemplate
};
