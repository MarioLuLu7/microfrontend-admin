const Vue = window.Vue
import App from './App.vue';
import router from './router';
import Store from './store'
import singleSpaVue from 'single-spa-vue';
import {
  baseRouter
} from './config/config'
import menus from './config/menu';
import outputStore from './config/outputStore';
import singleSpaConfig from './config/single-spa-vue.config'


if (process.env.NODE_ENV === 'development') {
  Vue.baseUrl = Vue.prototype.baseUrl = process.env.BASE_URL;
}
Vue.baseRouter = Vue.prototype.baseRouter = baseRouter;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => {
      return h(App)
    },
    router,
    store: Store
  }
});

const vueLife = singleSpaConfig(vueLifecycles);
export const bootstrap = vueLife.bootstrap;
export const mount = vueLife.mount;
export const unmount = vueLife.unmount;
export const menu = menus; // 导出菜单
export const store = outputStore; // 导出外用状态和方法