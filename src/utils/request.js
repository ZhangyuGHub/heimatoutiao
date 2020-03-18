import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '../store'
import router from '@/router'
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
async function (error) {
  // 错误的时候 token容易失效
  if (error.response && error.response.status === 401) {
    const path = {
      path: '/login', // 地址
      query: {
        // 需要传递的query参数
        redirectUrl: router.currentRoute.fullPath // 表示登录页需要跳转的地址
      }
      // 路由传参的两个写法  动态路由  query()
    }
    if (store.state.user.refresh_token) {
      // 有refresh——token
      // 如果有refresh_token 我们就要用refresh 换取新token  需要调用刷新token的接口
      // 发请求 得用工具啊 ? 用instance 还是axios呢 ?
      // 这里必须要用axios 因为 现在token已经失效了 instance的拦截器 还是会去将 失效的token注入到 headers中
      // 需要用没有拦截器的axios 来发 刷新token的请求
      try {
        const result = await axios({
          method: 'put', // 请求类型
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations', // 完成的url地址
          headers: { Authorization: `Bearer ${store.state.user.refresh_token}` } // 在请求头中注入refresh_token
        })
        //   await 后面就是 promise成功执行完成的逻辑
        // 新token
        // 如果成功了 应该更新失效的token
        // 直接更新vuex中的数据
        store.commit('updateUser', {
          //   载荷数据
          user: {
            // token
            token: result.data.data.token, // 最新的token
            refresh_token: store.state.user.refresh_token // 还是原来的refresh_token 14天之后过期
          }
        }) // 提交mutations 更新vuex数据
        //   你之所以会到这个位置 是因为  401, 也就意味着你之前的请求 是错误的
        //  需要把之前错误的请求再次发送出去 用axios 还是 instance呢
        // A =>  B  => C  =>  D
        return instance(error.config) // 相当于 执行之前出现401错误的请求  返回这个请求的目的 是继续执行这个请求执行链下面的内容
      } catch (error) {
        //   如果失败意味着 你尝试去续命 可是续命失败
        // 重新登录 重新登录之前 需要  删除掉 token 因为此时 token失效 refesh_token也失效
        store.commit('delUser')
        // 重新跳到登录页面
        router.push(path)
      }
    } else {
      //  如果没有refresh_token 直接宣布over 直接跳到登录页面
      // router.push('/login') // 直接跳转到登录无可厚非, 但是我们需要做一种更复杂的场景
      // 如果由于 token失效,跳到登录页, 当前页面怎么办呢 ? 登录成功之后,跳转的还是这个页面吗? 不一定了吧!!
      // 我们要实现 你 在  A页面发请求 结果失效了  也没有refresh_token,只能回到 login, 你登录之后, 你希望回到A页面
      // 怎么做呢 ? 我们需要在跳到登录页中过程中 ,把当前页面的地址 传给 登录页面
      // 登录页面 登录成功能之后 先判断 有没有需要跳转的地址 如果没有跳到主页 如果有 跳到需要跳转的页面
      // router.currentRoute // 表示当前的路由信息对象 里面包含了路由的地址 和参数
      // 我们需要获取 当前路由的带参数的地址  router.currentRoute.fullPath(文档)
      router.push({
        path: '/login',
        query: {
          redirectUrl: router.currentRoute.fullPath
        }
      })
    }
  }
  return Promise.reject(error)
})

export default instance// 导出request工具
