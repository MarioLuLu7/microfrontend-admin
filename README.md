# microfrontend-admin

微前端中后台应用 demo, microfrontend-admin (single-spa, systemjs, vue, iview)

# Function

实现功能

1. 只有一个主项目，多个子项目，可以因需求加载不同的子项目
2. 项之间可独立部署
3. 子项目技术栈可以不同（当前子项目只有 Vue，会持续更新）
4. 子项目之间切换不会刷新
5. 主项目有自己的 tab 和 menu 系统，子项目只需要提供相关数据即可
6. 页面切换时不会刷新页面，当 tab 关闭再打开时，才会刷新当前页面

# How to use

## Install and Run

```
cd base-app/
yarn install
yarn serve

cd app1/
yarn install
yarn serve

cd app2/
yarn install
yarn serve
```

open `http://localhost:8080/`

## Add Model

添加模块：
打开添加模块页面 ![按钮](https://raw.githubusercontent.com/MarioLuLu7/microfrontend-admin/master/readmeImg/img1.png)

添加模块

```
模块名称： '模块1',
入口名称： 'singleApp1',
加载地址: 'http://localhost:8077/app.js',
默认路由: '/app1'

```

![添加参数](https://raw.githubusercontent.com/MarioLuLu7/microfrontend-admin/master/readmeImg/img2.png)

![添加参数](https://raw.githubusercontent.com/MarioLuLu7/microfrontend-admin/master/readmeImg/img3.png)

完成后就可以使用啦

## Config

配置文件

每个子 app 下都有一个 src/config 文件夹，其中的 config.js 是该模块的配置文件

```
module.exports = {
  name: 'singleApp1', // 模块入口名
  host: 'localhost',
  port: '8077',
  baseRouter: '/app1' // 基础路由，区分是否为该模块的唯一标识
}
```

## Menu

设置模块菜单

`src/config/menu.js`

```
import {
  baseRouter
} from './config'

const menus = [{
    title: '主页',
    path: '',
    groupName: '主页'
  },
  {
    title: '关于',
    path: '/about',
    groupName: '主页'
  },
  {
    title: '用户1231',
    path: '/user/213',
    groupName: ''
  },
]

// 必须加上基础路由
menus.forEach(item => {
  item.path = baseRouter + item.path
})

export default menus;
```

## Tab

设置页面 tab,注册页面信息

主项目会在 window 上注册一个全局方法，供子项目用来提供单个页面的信息

```
this.baseSetTab(页面名称（会显示在tab上）, 页面name（用来实现缓存功能）)

eg.
window.baseSetTab('主页xxx', 'home')
```

## OutStore

对外输出方法，提供其他模块可调用的方法，目的是模块之间的通信

`src/config/outputStore.js`

```
import store from '../store'

export default {
  setData(x) {
    store.state.a = x
  }
}
```

在其他模块中,会获取并注册这些方法，即可调用此方法：

`Vue` （注册在 store 中，若要修改注册位置，请查看 `src/config/single-spa-vue.config.js`）:

```
this.$store.state[模块入口名][方法名]()

eg.
this.$store.state.singleApp1.setData(666)
```

# Build

```
yarn build
```

进入各个项目 build 完成之后，项目下的 dist 文件夹即是各个项目所需部署的根目录文件夹，主项目与普通的 spa 项目部署方式并无区别，子项目与其不同的是最终暴露出来的入口文件不是 index.html 而是 app.js 文件（具体查看子项目下的 vue.cong.js）,然后各个项目分别部署即可。

# Other

在开发环境时，考虑到子项目不与 baseapp 交互时，不能运行子项目。可以控制 `src/config/config.js` 中 `outputHtml` 为 `true` 即可使其单独运行（此时不能进行微服务化）。
