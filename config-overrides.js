const { override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    // css:true,
  }),
  // 因为是自定义webpack 所以需要用html-webpack-plugin来替换此方案
  //   addLessLoader({
  //    javascriptEnabled: true,
  //    modifyVars: {
  //     '@primary-color':'#3d8988',
  //     },
  //  }),
)
