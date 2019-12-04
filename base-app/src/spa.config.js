import store from './store'
import * as singleSpa from 'single-spa'

// 设置当前路由
function setTab(hash) {
  const path = hash.includes('#') ? hash.split('#')[1] : hash
  store.state.menu.forEach(item => {
    if (item.path === path) {
      setTimeout(() => {
        store.state.activePath = path
      }, 0)
    }
  })
}

// 设置模块加载时的一些信息
window.setAppParams = function (app, appModel) {
  setAppDetail(app, appModel)
  if (document.getElementById(app.name)) {
    store.state.models[app.name] = singleSpa.mountRootParcel(appModel, {
      domElement: document.getElementById(app.name),
      keepAliveTabs: store.state.keepAliveTabs[app.name],
      store: store.state.outputStore
    })
    singleSpa.start();
  }
}

// 设置app详情，名称、菜单
const setAppDetail = function (app, detail) {
  store.state.nowApp = app
  store.state.menu = detail.menu
  for (let key in detail.store) {
    store.state.outputStore[app.name][key] = detail.store[key]
  }
  setTab(location.hash)
}

// 提供子项目所需的手动设置tab标签方法
window.baseSetTab = function (title, name = '', fromApp = '') {
  const path = location.hash.includes('#') ? location.hash.split('#')[1] : location.hash
  let temp = false
  store.state.tabs.forEach(tab => {
    if (tab.path === path) {
      temp = true
    }
  })
  if (!temp) {
    store.state.tabs.push({
      name,
      title,
      path,
      fromApp: fromApp || store.state.nowApp.name
    })
  }
  // 设置主项目的重新load页面  keep-alive  exclude
  if (fromApp === 'baseapp') {
    store.state.exTab.forEach((tab, index) => {
      if (tab === name) {
        store.state.exTab.splice(index, 1)
      }
    })
  } else {
    store.state.keepAliveTabs[store.state.nowApp.name].forEach((tab, index) => {
      if (tab === name) {
        store.state.keepAliveTabs[store.state.nowApp.name].splice(index, 1)
      }
    })
  }
  setTimeout(() => {
    store.state.activePath = path
  }, 0)
}

// 提供全局删除提示框
window.deleteModal = function (text = '此条信息将会被永久删除', back) {
  store.state.baseDeleteState = true
  store.state.baseDeleteText = text
  window.baseDeleteBack = function () {
    back()
    store.state.baseDeleteState = false
  }
}