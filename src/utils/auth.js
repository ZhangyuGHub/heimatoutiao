/****
 * auth.js专门用来处理token的读写和删除
 * create by zhanguy 2020.03.15
 *
 * *****/
// 存储用户信息
const USER_TOKEN = 'heima-toutiao-mobile-94'
// 设置用户token信息
export function setUser (user) {
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))// setitem第二个参数为string类型，所以需要转换类型
}
// 获取token
export function getUser () {
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')// 短路表达式,也可使用三元表达式,if else等
  // ||前边为false,执行||后边的.为true执行前边的
//     if (window.localStorage.getItem(USER_TOKEN)) {
//         return JSON.parse(window.localStorage.getItem(USER_TOKEN)
//   } else {
//         '{}'
//   }
}
// 删除token
export function delUser () {
  localStorage.removeItem(USER_TOKEN)// 删除用户token
}
