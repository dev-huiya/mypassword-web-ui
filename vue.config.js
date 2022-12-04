const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
})
