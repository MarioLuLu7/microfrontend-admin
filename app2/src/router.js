import {
  baseRouter
} from './config/config'

import VueI from 'vue'
import RouterI from 'vue-router'
const Vue = window.Vue || VueI
const Router = window.Router || RouterI
if (!window.Router) {
  Vue.use(Router)
}


const routes = [{
    path: '',
    name: 'home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('./views/User.vue')
  }
]

routes.forEach(item => {
  item.path = baseRouter + item.path
})
export default new Router({
  routes
})