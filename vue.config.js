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

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 替换svg loader
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/assets/svg'))
    //   .end()
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/assets/svg'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()
  }
}
