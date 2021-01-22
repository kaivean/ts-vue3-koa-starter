# starter

## 环境要求
1. 建议node >= 12


## 技术栈

### client

* vue3
* typescript
* element-plus: 组件库element-ui vue3版
* axios

### server

* typescript
* [koa](http://koajs.com/)：后端框架
* [koa-session](https://github.com/koajs/session) koa的session模块，用的不是最新版5.x。而是4.x线上不支持async
* [koa-bodyparser](https://github.com/dlau/koa-body): 解析post请求的body内容模块
* [axios](https://www.npmjs.com/package/axios): axios请求库
* [lodash](https://lodash.com/): js基础库,浏览器和node通用
* [cron](https://www.npmjs.com/package/cron: 定时任务

除此之外，提供了目录结构规范



## 初始化

```bash
cd client
npm i --registry=https://registry.npm.taobao.org

cd server
npm i --registry=https://registry.npm.taobao.org
```

## 开发

Terminal
```bash
cd client
npm run dev
```

Another Terminal
```bash
cd server
npm run dev
```

## 构建

```bash
sh build.sh
```

## 启动构建产物

```bash
cd output
node index.js
```

或者 pm2启动
```
cd output
sh bin/node_control start
```

## DockerFile
提供了默认的DockerFile，可以快速构建镜像

```bash
cd server
npm run build
docker build -t ts-vue3-koa-starter -f Dockerfile
```


### 目录
```
/app                    主要代码
/app/components         通用工具函数
/app/controlers         路由入口
/app/cron               定时脚本
/app/middlewares        中间件
/config                 配置（主要关注路由设置）
/public                 上线后将前端资源放在这,新建文件夹，如：public/score/static/, 记住只能放置对外暴露的文件，不能放置项目的临时文件或仓库文件
/logs                   日志
/tmp                    项目的缓存文件，放置session等
```

##### app/components
公共逻辑放置在此， 不再支持akb用法，需要主动import

##### app/controllers
该目录用来放置http接口，会自动根据目录路径，匹配上对应的url的pathname，不过也可以做rewrite的操作，在config/router里配置

##### app/middlewares
用来放置koa的中间件，然后在config/middleware.js里配置

##### app/cron
定时任务
首先在config/cron.js里配置任务，任务名就是对于的app/cron下的文件，值就是定时配置，crontab格式，采用[node-cron](https://www.npmjs.com/package/cron)

##### config
配置目录，不再支持akb用法，需要主动import。当NODE_ENV=development时， 会加载config/env/development.js配置，与默认配置递归合并；当NODE_ENV=test时， 会加载config/env/test.js配置，与默认配置递归合并


## 旧akb项目迁移

1. 基础

```bash
npm i akb-ts --registry=https://registry.npm.taobao.org
npm i @types/fs-extra @types/node typescript ts-node --registry=https://registry.npm.taobao.org

cp ts-vue3-koa-starter/tsconfig.json 项目/tsconfig.json
cp ts-vue3-koa-starter/index.ts 项目/index.ts
rm 项目/index.js
```

一些自己引用的库，如果没有ts声明，自行安装


2. 本地开发启动命令

以下命令加入package.json的scripts.watch

```json
{
    "scripts": {
        "dev": "NODE_ENV=development TS_NODE_PROJECT=./tsconfig.json nodemon -w server -w app -w config -w index.ts -w types -e ts --exec 'ts-node-script' --files index.ts ",
        "build": "tsc --project ."
    }
}
```

启动
```
npm run dev
```

3. eslint

```bash
npm i  --registry=https://registry.npm.taobao.org @babel/core @babel/eslint-parser @babel/eslint-plugin @ecomfe/eslint-config eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

eslintrc.json
```json
extends: [
    '@ecomfe/eslint-config',
    '@ecomfe/eslint-config/baidu/default',
    '@ecomfe/eslint-config/typescript'
],
```

4. 修改 config/logger.js

```
dailyRotatePattern: 'YYYY-MM-DD',
```


5. 不在支持的配置有

