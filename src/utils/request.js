import axios from 'axios'
// 引入store.js文件，对于用户是否登录发送的请求进行判断
import store from '@/store/index.js'
// import * as auth from '@/utils/auth.js'
// 始化axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'

})
// 设置请求拦截
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // console.log(user)
  // const user = auth.getUser()
  // console.log(user)

  // 在用户发送请求前的时候，对齐进行拦截，是否登录
  // 根据请求是否为登录请求而设置请求头

  // // 如果不是登录的请求
  if (config.url !== 'app/v1_0/authorizations') {
    // 并且还有user，那么就直接给他设置token的请求头
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  }
  // console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
