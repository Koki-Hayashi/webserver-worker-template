const webpack = require('webpack');

const config = [];

config.push(require('./webpack.config.node.js'));
config.push(require('./webpack.config.spa.js'));
config.push(require('./webpack.config.spa_sass.js'));
config.push(require('./webpack.config.login.js'));
config.push(require('./webpack.config.login_sass.js'));

module.exports = config;
