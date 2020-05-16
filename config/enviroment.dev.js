const merge = require('webpack-merge');
const prodEnvironment = require('./enviroment.prod');

module.exports = merge(prodEnvironment, {
  NODE_ENV: "'development'"
});
