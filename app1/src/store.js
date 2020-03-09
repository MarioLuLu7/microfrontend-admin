const Vuex = window.Vuex || require('vuex').default
if (!window.Vuex) {
  const Vue = require('vue').default
  Vue.use(Vuex)
}

export default new Vuex.Store({
  state: {
    keepAliveTabs: [],
    a: 2
  },
  mutations: {

  },
  actions: {

  }
})