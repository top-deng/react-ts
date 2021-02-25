const config = require('./config')
// 代码压缩插件
const TerserPlugin = require('terser-webpack-plugin')
// css 压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports =
    process.env.APP_ENV === 'dev'? {}:
      {
        runtimeChunk: {
          name: 'manifest'
        },
        // chunks的含义是拆分模块的范围，它有三个值async、initial和all。
        // async表示只从异步加载得模块（动态加载import()）里面进行拆分
        // initial表示只从入口模块进行拆分
        // all表示以上两者都包括
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          cacheGroups: {
            default: false,
            runtime: {
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/
            },
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/](lodash|moment|immutable)[\\/]/,
              chunks: 'all',
              priority: 10
            }
          }
        },
        minimizer: [
        // js代码压缩插件  去除日志输出啥的
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: Boolean(config.sourceMap)
          }),
          // css 压缩
          new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
              reduceIdents: false,
              autoprefixer: false
            }
          })
        ]
      }
