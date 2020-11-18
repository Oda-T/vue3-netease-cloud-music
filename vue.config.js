'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',

  productionSourceMap: process.env.NODE_ENV === 'development',

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

    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 内联runtime js文件到html
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          mdui: {
            name: 'chunk-mdui',
            test: /[\\/]node_modules[\\/]_?mdui(.*)/,
            priority: 20
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  }
}
