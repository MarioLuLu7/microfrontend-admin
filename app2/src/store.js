import VueI from 'vue'
import VuexI from 'vuex'
const Vue = window.Vue || VueI
const Vuex = window.Vuex || VuexI
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