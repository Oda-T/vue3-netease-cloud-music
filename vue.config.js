'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',

  productionSourceMap: false,

  devServer: {
    port: 7863,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  chainWebpack(config) {
    // 替换svg loader
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/assets'))
      .end()
      .use('svg-sprite-loader') // 启用 svg-sprite-loader
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
      .end()
      .use('svgo-loader') // 压缩 svg
      .loader('svgo-loader')
      .options({
        plugins: [{ removeTitle: true }, { convertColors: { shorthex: false } }, { convertPathData: false }]
      })
  }
}
