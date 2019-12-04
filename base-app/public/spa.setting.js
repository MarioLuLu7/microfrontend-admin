// 写在内部会导致模块加载失败
window.loadApp = function (app) {
  System.import(app.url).then(res => {
    window.setAppParams(app, res)
  })
}