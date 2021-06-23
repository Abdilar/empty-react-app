const APP_VERSION = require('./package.json').version;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const rules = webpackConfig.module.rules.filter(rule => !rule.oneOf);
      const oneOf = changeMediaNameing(webpackConfig);
      rules.push({oneOf});
      changeCSSNameing(webpackConfig)


      return {
        ...webpackConfig,
        output: {
          ...webpackConfig.output,
          filename: `static/js/[name].${APP_VERSION}.chunk.js`,
          chunkFilename: `static/js/[name].${APP_VERSION}.chunk.js`
        },
        module: {
          ...webpackConfig.module,
          rules
        }
      };
    }
  },
}

function changeCSSNameing(webpackConfig) {
  const cssPlugin = webpackConfig.plugins.find(({options = {}}) => options.filename && options.filename.includes("static/css/"));
  const plugins = webpackConfig.plugins.filter(({options = {}}) => !(options.filename && options.filename.includes("static/css/")));
  if (cssPlugin) {
    cssPlugin.options.filename = `static/css/[name].${APP_VERSION}.css`;
    cssPlugin.options.chunkFilename = `static/css/[name].${APP_VERSION}.chunk.css`;
    plugins.push(cssPlugin);
  }
}

function changeMediaNameing(webpackConfig) {
  const rules = webpackConfig.module.rules.filter(rule => !!rule.oneOf);

  return rules.length ?
    rules[0].oneOf.map(item => {
      return item.loader && item.loader.includes('file-loader') ?
        {...item, options: {...item.options, name: `static/media/[name].${APP_VERSION}.[ext]`}} :
        item;
    }) :
    [];
}
