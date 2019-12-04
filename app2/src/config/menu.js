import {
  baseRouter
} from './config'

const menus = [{
    title: '主页1',
    path: '',
    groupName: '组1'
  },
  {
    title: '关于1',
    path: '/about',
    groupName: '组1'
  },
  {
    title: '用户123',
    path: '/user/213',
    groupName: ''
  },
]

menus.forEach(item => {
  item.path = baseRouter + item.path
})

export default menus;