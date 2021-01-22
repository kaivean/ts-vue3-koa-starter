# dataservice

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve

or npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### vue-cli初始化后

通过vue-cli初始化，选项:

* ts
* vue3
* vue-class风格组件
* vue-router
* vuex
* sass
* eslint
* 单测：jest

初始化后:

* 导入 element-plus
* 导入 axios
* 导入 lodash
* 导入 moment
* 与server端打通本地开发
* 书写部分示例
* 更改eslint为百度内一系列插件：https://github.com/ecomfe/eslint-config
* 缩进改成4 spaces
* fix problems  `npm lint`

> 在vscode的vetur插件，默认会加载vscode打开的项目根目录tsconfig.json，不会加载子目录的tsconfig.json，如果不会直接加载该client目录，则可能部分提示错误，见 [FAQ](https://vuejs.github.io/vetur/guide/FAQ.html#vetur-can-t-find-tsconfig-json-jsconfig-json-in-xxxx-xxxxxx)


### 库

* vue3的element-ui ： https://element-plus.gitee.io/#/zh-CN/component/quickstart
* vue组件的类风格写法：https://class-component.vuejs.org/guide/class-component.html#other-options
