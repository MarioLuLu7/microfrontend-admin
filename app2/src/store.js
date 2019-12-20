const Vue = window.Vue || require('vue')
const Vuex = window.Vuex || require('vuex')
if (!window.Vuex) {
  Vue.use(Vuex)
}


export default new Vuex.Store({
  state: {
    keepAliveTabs: []
  },
  mutations: {

  },
  actions: {

  }
})