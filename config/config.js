// 最终只需要改的配置文件
const path=require("path");
const fs = require('fs')
//自定义发布状态  webpack状态
const {APP_ENV,IS_DEV,CDN} = require('./webpack-const');
//资源文件相对路径前缀
const STATICDOMAIN = APP_ENV === 'pro' ? '.' : '';
const colors = require('colors');
const defaultModel= `const MainServer=new Map(); export default MainServer;`;
console.log(colors.rainbow(`当前环境:${process.env.NODE_ENV}`));
/**
 * mock接口复制
 * @param {*} fileUrl
 * @param {*} copyFileUrl
 * @param {*} defaultModel
 */
const checkRunFromSetMockData=(fileUrl,copyFileUrl,defaultModel)=>{
  let data = copyFileUrl?fs.readFileSync(copyFileUrl):defaultModel;
  fs.access(fileUrl, fs.constants.F_OK, (err) => {
    if(err){
      console.log(colors.rainbow(`请检查:${fileUrl} 文件是否存在*****`));
    }else{
      console.log(colors.rainbow("开始写文件"));
      fs.writeFile(fileUrl,data,"utf8",error => {
        if (error){
         console.log(colors.rainbow("写入文件失败,原因是:" + error.message));
         return;
        }else{
          console.log(colors.rainbow(`当前环境:${process.env.NODE_ENV} mock数据删除成功`));
          console.log(colors.rainbow(`环境一切正常`));
          console.log(colors.rainbow(`等待打包中。。。。`));
        }
      });
    }
  });
}
/**
 * 触发监听文件
 */
const mainWebPack=function(){
  console.log(colors.rainbow("🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴 🐴"));
  console.log(colors.rainbow("🐴 🐴 🐴 🐴         请注意下面彩虹屁!!!!!       🐴 🐴 🐴 🐴 🐴 🐴"));
  console.log(process.env.NODE_ENV)
  let fileUrl=path.join(__filename,"../../src/mock/mockFactory.ts");
  let copyFileUrl=path.join(__filename,"../../src/mock/MainServer.ts");
  if(process.env.NODE_ENV!='production'){
    console.log(colors.rainbow(`开始监听文件变化************`));
    checkRunFromSetMockData(fileUrl,copyFileUrl);
    fs.watch(copyFileUrl, {}, (eventType, filename) => {
      console.log(colors.rainbow(`文件${filename}变动************`));
      checkRunFromSetMockData(fileUrl,copyFileUrl);
    });
  }else{
    console.log(colors.rainbow(`开始清空mock数据文件************`));
    checkRunFromSetMockData(fileUrl,null,defaultModel);
    console.log(colors.rainbow(`清空mock成功************`));
  }
}

mainWebPack();

//全局配置
module.exports={
    devPort: 9090,
    jarvisPort: 3006,
    index: path.resolve(__dirname, `./../dist_${APP_ENV=='analyz'?'dev':APP_ENV}/index.html`),
    assetsRoot: path.resolve(__dirname, `./../dist_${APP_ENV=='analyz'?'dev':APP_ENV}`),
    staticRoot:path.resolve(__dirname, `./../public`),
    dllRoot:path.resolve(__dirname, `./../public/dll/`),
    dllFileName:"_dll_vendor",
    assetsPublicPath: IS_DEV ? '/' : `${STATICDOMAIN}/`,
    assetsSubDirectory: '',
    pagePattern: new RegExp(CDN),
    assetsPattern:  new RegExp(`${CDN.replace(/\//g, '\\/')}\\/static`),
    sourceMap: IS_DEV ?"source-map": false,
    extractCss: !IS_DEV,
    bundleAnalyzerReport:false,
    swRoot:path.join(__dirname, '../src/sw/sw.js'),
    webpackenvs:{}
}


