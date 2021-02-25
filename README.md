
# React+Dva+TS+Ant 项目架子

作者：david.deng
```

## 项目运行
```
# 安装依赖项
yarn

# 运行服务
npm run dev

# 生产打包
npm run pro

# 测试打包
npm run test

# eslint代码质量检查
yarn lint
```

## 目录结构描述
```
├── README.md                       // 说明文档
├── dist-pro                            // 生产包
├── dist-test                       // 测试包
├── node_modules                    // 依赖
├── config                         // webpack配置
├── public                          // 公共资源
│   ├── static                      // 静态资源
│   ├── favicon.ico                 // 网站图标
│   └── index.html                  // 主页
├─src                               // 主目录
│   ├── services                    // 接口
│   ├── assets                      // 静态资源
│   ├── namespaces                  // 模块命名空间
│   ├── package                     // 全局组件namespaces
│   ├── plugins                    // 插件
│   ├── datafactory                  // 所有数据源
│   ├── uilts                      // 全局工具函数
│   ├── mock                        // 前期开发的mock接口定义mockFactory.js文件不要动他，webpack会自己处理
│   ├── components                  // 公共组件
│   ├── routes                      // 路由配置
│   ├── theme                        // 样式
│   ├── models                       // 页面mvc 中的model层
│   ├── views                       // 页面
│   ├── App.tsx                     // 入口页面
├── .browserslistrc                 // 浏览器兼容配置
├── .editorconfig                   // 代码编写规格
├── .env.development                // 开发环境变量配置
├── .env.production                 // 线上环境变量配置
├── .env.test                       // 测试环境变量配置
├── .eslintrc.js                    // eslint 配置
├── .gitignore                      // git提交忽略文件
├── .npmrc                          // 
├── .vuerc                          // 
├── babel.config.js                 // ES6语法编译配置
├── package.json                    // 项目描述及依赖
├── postcss.config.js               // CSS处理配置
├── tsconfig.json                 // 路径映射文件
├── tsconfig.webpack.json           // webpack入口配置
├── yarn.lock                       // yarn依赖管理
└── tests                           // 测试用例
└── config-overrides                 // ant 按需加载
```

