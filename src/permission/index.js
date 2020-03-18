import router from '@/router'// 引入路由实例
import store from '@/store'// 引入store对象
// 设置前置守卫,路由发生变化是,执行路由守卫
router.beforeEach(function (to, from, next) {
  // 判断请求地址以及token
  if (to.path.startsWith('/user') && !store.state.user.token) { // 如果跳转到user，并且没有token
    next({
      path: '/login', // 跳转到login界面
      query: {
        redirectUrl: to.fullPath// 在login界面登陆完成以后,跳转到登陆前所在的界面
      }
    })
  } else {
    next()// 直接放行
  }
})
