const routes = [{
    path: '/model',
    name: 'model',
    component: () => import('./views/Model.vue')
  },
  {
    path: '*',
    name: 'content',
    component: () => import('./views/Content.vue')
  }
]
export default new Router({
  routes
})