const path = require('path')
const fs = require('fs')
const config = require('./config')
exports.assetsPath = function(_path) {
  return path.posix.join(config.assetsSubDirectory, _path)
}
exports.resolve = function(dir) {
  return path.join(__dirname, './../', dir)
}
exports.getFileName = function(dir) {
  let fileName=''
  fs.readdirSync(dir).forEach(function(ele,index) {
    let info = fs.statSync(dir+'/'+ele)
    if(!info.isDirectory()) {
      if(ele.indexOf(config.dllFileName)!=-1) {
        fileName=ele
      }
    }
  })
  return fileName
}

