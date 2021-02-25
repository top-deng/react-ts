// 全局变量定于
//整体发布环境状态
const IS_DEV = process.env.NODE_ENV !== 'production'
// app自定义状态
const APP_ENV = process.env.APP_ENV || 'pro'
//cdn地址
const CDN = process.env.CDN || ''
//包含文件
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']
module.exports = {
  IS_DEV,
  APP_ENV,
  CDN,
  FILE_EXTENSIONS
}
