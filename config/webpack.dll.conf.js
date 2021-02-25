const webpack = require('webpack')
const path = require('path')
const fs = require('fs-extra')
// 删除目录
fs.emptyDirSync(path.join(__dirname, '../public/dll'))

module.exports = {
  entry: {
    // # 将 react、lodash等模块作为入口编译成动态链接库
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    // # 指定生成文件所在目录文件夹，
    // # 将它们存放在了 src 文件夹下
    path: path.join(__dirname, '..', 'public'),
    // # 指定文件名
    library: '_dll_[name]',
    // # 存放动态链接库的全局变量名称，例如对应 lodash 来说就是 lodash_dll_lib
    // # 这个名称需要与 DllPlugin 插件中的 name 属性值对应起来
    filename: 'dll/_dll_[name][hash].js'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      // # 和output.library中一致，值就是输出的manifest.json中的 name值
      path: path.join(__dirname, '../public/dll', '[name].manifest.json')
    })
  ]
}
