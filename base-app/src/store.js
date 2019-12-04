export default new Vuex.Store({
  state: {
    me: {
      username: 'admin'
    },
    // 当前app
    nowApp: '',
    // 当前菜单
    menu: [],
    menuShowState: true,
    apps: [],
    tabs: [],
    exTab: [],
    models: {},
    outputStore: {},
    keepAliveTabs: {},
    activePath: '',
    baseDeleteState: false,
    baseDeleteText: '',
    baseDeleteBack: ''
  },
  mutations: {

  },
  actions: {
    getModels: ({
      state
    }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          let apps = sessionStorage.getItem('apps')
          state.apps = apps ? JSON.parse(apps) : []
          state.apps.forEach(app => {
            if (!state.keepAliveTabs[app.name]) {
              state.keepAliveTabs[app.name] = []
            }
            if (!state.outputStore[app.name]) {
              state.outputStore[app.name] = {}
            }
          })
          resolve(state.apps)
        }, 100);
      })
    }
  }
})