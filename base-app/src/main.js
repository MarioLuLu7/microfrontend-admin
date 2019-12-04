import App from './App.vue'
import store from './store'
import router from './router'
import './spa.config'
import axios from './axios'

Vue.config.productionTip = false
Vue.$axios = Vue.prototype.$axios = axios

// 公用设置tab标签方法注册
Vue.baseSetTab = Vue.prototype.baseSetTab = window.baseSetTab;
// 公用删除确认警告注册
Vue.deleteModal = Vue.prototype.deleteModal = window.deleteModal;

import ViewUI from 'iview';
Vue.use(ViewUI);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')