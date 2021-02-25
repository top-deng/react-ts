const path = require('path')
const fs = require('fs-extra')
//最外层作用域下的配置
const config = require('./config')
const { resolve, assetsPath } = require('./webpack-uilts.js')
const plugins = require('./webpack-plugins')
const optimization = require('./webpack-optimization')
//在tsconfig.json配置完成后，使用TsConfigPathsPlugin插件来读取相关配置文件到webpack.config.js中
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//全局变量对象
const webpackConst = require('./webpack-const')
//清空打包文件夹
if (webpackConst.APP_ENV !== 'dev') {
  fs.emptyDirSync(path.join(__dirname, `../dist_${webpackConst.APP_ENV}`))
}

// 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。
const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.join(__dirname, './../','.cache-loader')
  }
}

// css 部分
const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: [require('bourbon').includePaths, path.join(__dirname, './../','src/styles')]
    }
  }
}

//less 部分
const lessLoader = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,
    // less 重置的less变量
    modifyVars: {
      '@primary-color': '#009588',
      '@link-color': '#009588',
      '@pagination-item-size': '30px',
      '@layout-sider-background': '#343642',
      '@menu-dark-bg': '#343642',
      '@menu-item-active-bg': 'rgba(0,140,137,0.10)',
      '@menu-dark-item-active-bg': '#1a1c24',
      '@table-row-hover-bg': '#eeeeee',
      '@input-placeholder-color': '#999999',
      '@input-height-base': '38px'
    }
  }
}

//注入全局less变量
const resources={
  loader: 'style-resources-loader',
  options: {
    patterns: path.resolve(__dirname, '../src/theme/less/color.less')
  }
}


const baseLoaders = isLoad => [
  //根据环境判定是否把css提取出来
  config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: 'cache-loader',
    options: {
      cacheDirectory: path.join(__dirname, './../', '.cache-loader')
    }
  },
  // https://segmentfault.com/a/1190000021291298?utm_source=tag-newest
  {
    loader: 'css-loader',
    options: {
      modules: isLoad?{
        mode: 'local',
        localIdentName: '[local]--[hash:base64:8]'
      }: false
    }
  },
  'postcss-loader'
]



const svgLoader = {
  loader: 'svg-sprite-loader',
  options: {
    symbolId: 'icon-[name]' //symbolId和use使用的名称对应      <use xlinkHref={"#icon-" + iconClass} />
  }
}


// node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2
// https://webpack.docschina.org/guides/build-performance/#sass
const threadLoader = workerParallelJobs => {
  const options = { workerParallelJobs }
  if (webpackConst.APP_ENV === 'dev') {
    Object.assign(options, { poolTimeout: Infinity })
  }
  // 线程加载器
  return { loader: 'thread-loader', options }
}


const getUrlloader=(assetsPrefix) => {
  return {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath(`${assetsPrefix}/[name].[hash:7].[ext]`)
    }
  }
}


console.log('webpackConst.IS_DEV',webpackConst.IS_DEV)
module.exports={
  //入口文件
  entry: {
    // # 将 react、lodash等模块作为入口编译成动态链接库
    vendor: ['react', 'react-dom', 'react-router-dom','react-router-redux', 'lodash'],
    app: path.join(__dirname,'../src/App.tsx')
  },
  //出口路径
  output: {
    path: config.assetsRoot,
    filename: webpackConst.APP_ENV === 'dev' ? '[name].js' : path.posix.join(config.assetsSubDirectory,'js/[name].[chunkhash].js'),
    chunkFilename: webpackConst.APP_ENV === 'dev' ? '[name].js' : path.posix.join(config.assetsSubDirectory,'js/[name].[id].[chunkhash].js'),
    publicPath: config.assetsPublicPath,
    pathinfo: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      //在tsconfig.json配置完成后，使用TsConfigPathsPlugin插件来读取相关配置文件到webpack.config.js中
      new TsconfigPathsPlugin({
        configFile: resolve('tsconfig.webpack.json'),
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      })
    ],
    //独立打包输出文件
    alias: {
    }
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router-dom': 'ReactRouterDom',
    // 'react-router-redux': 'ReactRouterRedux',
  },
  //警告 webpack 的性能提示
  performance: {
    hints: false
  },
  //各州load
  module: {
    rules: [
      //css load部分
      {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: baseLoaders(false)
      },
      // {
      //     test: /\.scss$/,
      //     include: [resolve('src')],
      //     use: [...baseLoaders(true), sassLoader]
      // },
      {
        test: /\.less$/,
        use: [
          ...baseLoaders(false),
          lessLoader,
          resources
        ]
      },
      //js load部分
      {
        test: /\.(j|t)sx?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        use: [
          cacheLoader,
          threadLoader(),
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  // https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json#L32
                  { targets: { browsers: ['chrome >= 47'] }, useBuiltIns: 'usage', corejs: 3 }
                ],
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
              plugins: [
                ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          }
        ]
      },
      //文件部分
      {
        // test: /\.(png|jpe?g|gif)(\?.*)?$/,
        test: /\.(png|jpg)$/,
        use: [getUrlloader('img')]
      },
      {
        test: /\.(woff2?|eot|ttf|svg|otf)(\?.*)?$/,
        exclude: path.resolve(__dirname, '../src/assets/icons'),
        use: [getUrlloader('fonts')]
      },
      {
        test: /\.svg$/,
        // loader: "svg-sprite-loader",
        loader: [cacheLoader,svgLoader],
        include: path.resolve(__dirname, '../src/assets/icons'), //只处理指定svg的文件(所有使用的svg文件放到该文件夹下)
      },
      // {
      //     test: /\.svg$/,
      //     loader: [cacheLoader, threadLoader(), 'svg-sprite-loader'],
      //     include: [resolve('src')]
      // }
    ]
  },
  plugins,
  // webpack4的模块拆分
  optimization,
  //常规错误信息输出等级https://www.webpackjs.com/configuration/stats/
  stats: 'minimal',  //只在发生错误或有新的编译时输出
  devtool: config.sourceMap,
  devServer: webpackConst.IS_DEV?{
    port: config.devPort,
    hot: true,
    disableHostCheck: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://monitor.ops.test.mob.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }:{}
}


