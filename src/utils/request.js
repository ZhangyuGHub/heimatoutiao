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
// 拦截器有两个参数，一个成功一个失败。
// 请求拦截器注入token，request请求
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
// 响应拦截器处理返回数据
instance.interceptors.response.use(function (response) {
  // 响应数据  返回得到的响应数据  第一层data是axios默认包data, 第二个data是接口返回里面的包的data
  // 得到的response其实被axios包裹了一层data
  try {
    // 将数据解构，如果有两层就返回两层
    return response.data.data
  } catch (error) {
    //   返回错误时，将response中的data抛出，如果解不出来两层，只有一层，直接返回，axios默认包了一层data
    return response.data
  }
},
function (error) {
  // 错误的时候 token容易失效
  return Promise.reject(error)
})

export default instance// 导出request工具
