// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = {
  runtimeCompiler: true,
  chainWebpack(config) {
    config
      .plugin('context')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/]);
  },
};
