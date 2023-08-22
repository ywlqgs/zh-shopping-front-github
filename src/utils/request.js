import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建axios实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的axios
const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 自定义配置 一般配置请求/响应拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading, 禁止背景点击（节流处理，防止多次无效触发）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0 // 不会自动消失
  })

  // 只要有token,就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token // 因为请求项Access-Token中有'-'特殊字符，需要用到[]语法
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么（默认axios会多包装一层data,需要响应拦截器中处理一下）
  const res = response.data

  if (res.status !== 200) {
    // 给错误提示
    Toast(res.message)

    // 抛出一个错误的promise 如果不抛出promise异常，await会往下走
    return Promise.reject(res.message)
  } else {
    // 正确情况，直接走业务核心逻辑，清除loading效果
    Toast.clear()
  }

  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
