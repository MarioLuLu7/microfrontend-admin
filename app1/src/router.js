import {
  baseRouter
} from './config/config'

const Router = window.Router || require('vue-router').default
if (!window.Router) {
  const Vue = require('vue').default
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