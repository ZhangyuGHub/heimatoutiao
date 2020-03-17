import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '../store'
// 创建一个axios实例，和原来的axios没有关系
const instance = axios.create({
  // 构造参数
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 设置请求地址常量
  // 处理大数字
  transformResponse: [function (data) {
    try {
      // 默认是JSON.parse，这是不对的。需要用JSONBig替换
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    //   统一注入token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
},
function (error) {
  // 将错误信息返出来
  return Promise.reject(error)
})

export default instance
