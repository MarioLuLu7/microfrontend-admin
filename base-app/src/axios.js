import axios from 'axios'
import route from './router'
import {
  Message
} from 'iview'

let http = axios.create({
  timeout: 10000
})

http.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
})

http.interceptors.response.use(res => {
  if (res.data.success) {
    return res.data.data
  } else {
    Message.error({
      background: true,
      content: res.data.data
    })
    return false
  }
}, (error) => {
  if (error.response.status === 401) {
    route.push('/login')
  }
})

export default http