const BASE_URL = process.env.NODE_ENV === 'production' ? '/static' : '/'
module.exports = {
  publicPath: BASE_URL,
  outputDir: undefined,
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  filenameHashing: false,
  configureWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js']
    // 拆包
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 300000,
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `chunk.${packageName.replace('@', '')}`
            },
            priority: 10
          }
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    if (process.env.NODE_ENV === 'production') {
      // js 文件
      config
        .mode('production')
        .output
        .filename('assets/js/[name].js?v=[hash]')
        .chunkFilename('assets/js/[name].js?v=[hash]')
        .end()
      // css 文件 重命名
      config.plugin('extract-css').tap(args => {
        args[0].filename = 'assets/css/[name].css?v=[hash]'
        args[0].chunkFilename = 'assets/css/[name].css?v=[hash]'
        return args
      })
      // css 文件 压缩
      config.plugin('optimize-css-assets').use(require('optimize-css-assets-webpack-plugin'), [{
        assetNameRegExp: /\.css(.*)/i,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      }])
      config.module
        .rule('element-ui')
        .test(/element-ui.src.*?js$/)
        .use('babel')
          .loader('babel-loader')
          .end()
    }
  }
}
