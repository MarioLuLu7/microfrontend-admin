import Vue from 'vue'
import Vuex from 'vuex'

if (!window.Vuex) {
  Vue.use(Vuex)
} else {
  Vuex = window.Vuex
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