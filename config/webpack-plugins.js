const webpack = require('webpack')
const path = require('path')
const {assetsPath,getFileName} = require('./webpack-uilts.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin')
const copyWebpackPlugin= require('copy-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const HtmlWebpackTagsPlugin  = require('html-webpack-tags-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
//全局外层配置信息
const config = require('./config')
const dllFileHashName=getFileName(config.dllRoot)
if(!dllFileHashName) {
  console.error('文件路径错误')
}
console.log(`dll/${dllFileHashName}`)
//全局配置json常量
const env =config.webpackenvs
//绑定到全局配置域上
const oriEnv = env[process.env.APP_ENV]||{}
Object.assign(oriEnv, {
  APP_ENV: process.env.APP_ENV
})
const defineEnv = {}
for (let key in oriEnv) {
  defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}

//根据环境输出不同资源路径和hash
const devPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'public/index.html',
    inject: true
  }),
  //  必须要放到HtmlWebpackPlugin 后面
  new HtmlWebpackTagsPlugin({
    append: false,
    tags: [{
      path: `dll/${dllFileHashName}`,
    }],
  }
  ),
  new CaseSensitivePathsPlugin(),
]

const prodPlugins = [
  new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  new HtmlWebpackPlugin({
    filename: config.index,
    template: 'public/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  }),
  // 必须要放到HtmlWebpackPlugin 后面
  new HtmlWebpackTagsPlugin({
    append: false,
    tags: [{
      path: `dll/${dllFileHashName}`,
    }],
  }
  ),
  new MiniCssExtractPlugin({
    filename: assetsPath('css/[name].[contenthash].css'),
    chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
  }),
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.html$|\.css/, //压缩文件后缀
    threshold: 1024, //超过多大的开启压缩 单位字节
    deleteOriginalAssets: false //是否删除原始文件
  }),
  new TerserPlugin({
    terserOptions: {
      ecma: undefined,
      warnings: false,
      parse: {},
      compress: {
        drop_console: true,
        drop_debugger: false,
        pure_funcs: ['console.log', 'console.table', 'console.info','console.error'] // 移除console
      }
    }
  }),
]

//打包资源分析
if (config.bundleAnalyzerReport) {
  const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
  prodPlugins.push(new BundleAnalyzerPlugin())
}


module.exports = [
  // Moment包文件处理
  new MomentLocalesPlugin({
    localesToKeep: ['es-us', 'zh-cn']
  }),
  // 注入全局变量
  new webpack.DefinePlugin(defineEnv),
  //是否为css 生成对应的提示文件
  new TypedCssModulesPlugin({
    globPattern: 'src/!(styles)/**/*.scss'
  }),
  new webpack.DllReferencePlugin({
    // 描述 lodash 动态链接库的文件内容
    manifest: require('../public/dll/vendor.manifest.json')
  }),
  // 集中拷贝静态资源管理器
  new copyWebpackPlugin([{
    //定义要拷贝的源目录，必填项
    from: config.staticRoot,
    to: path.join(config.assetsRoot)
  }]),
  new ServiceWorkerWebpackPlugin({
    entry: config.swRoot,
  }),
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.html$|\.css/, //压缩文件后缀
    threshold: 1024, //超过多大的开启压缩 单位字节
    deleteOriginalAssets: false //是否删除原始文件
  })
].concat(process.env.NODE_ENV === 'development' ? devPlugins : prodPlugins)
