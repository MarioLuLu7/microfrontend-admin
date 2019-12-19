import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store'
import {
  baseRouter
} from './config/config'

if (process.env.NODE_ENV === 'development') {
  Vue.baseUrl = Vue.prototype.baseUrl = process.env.BASE_URL;
}
Vue.baseRouter = Vue.prototype.baseRouter = baseRouter;
Vue.baseSetTab = Vue.prototype.baseSetTab = () => {}

new Vue({
  router,
  store: Store,
  render: h => h(App)
}).$mount("#app");