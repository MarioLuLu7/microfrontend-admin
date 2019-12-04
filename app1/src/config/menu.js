import {
  baseRouter
} from './config'

const menus = [{
    title: '主页',
    path: '',
    groupName: '主页'
  },
  {
    title: '关于',
    path: '/about',
    groupName: '主页'
  },
  {
    title: '用户1231',
    path: '/user/213',
    groupName: ''
  },
]

menus.forEach(item => {
  item.path = baseRouter + item.path
})

export default menus;