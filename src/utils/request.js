import axios from 'axios'
import JSONBig from 'json-bigint'
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
export default instance
