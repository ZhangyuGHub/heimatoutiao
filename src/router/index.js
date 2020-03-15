import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 按需加载配置路由
const Layout = () => import('@/views/layout')// 按需引入layout
const home = () => import('@/views/home')// 按需引入home，二级路由
const question = () => import('@/views/question')// 按需引入question，二级路由
const video = () => import('@/views/video')// 按需引入video，二级路由
const user = () => import('@/views/user')// 按需引入user，二级路由
// 其他的一级路由
const chat = () => import('@/views/user/chat')// 小智同学
const login = () => import('@/views/login')// 登录模式
const profile = () => import('@/views/user/profile')// 编辑资料
const search = () => import('@/views/search')// 搜索中心
const searchresult = () => import('@/views/search/result')// 搜索结果
const article = () => import('@/views/article')// 文章中心

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout, // 一级路由,布局组件
    children: [{
      path: '', // path为空,默认为二级路由的默认组件
      component: home
    }, {
      path: '/question', // 问答组件
      component: question
    },
    {
      path: '/video', // 视频组件
      component: video
    },
    {
      path: '/user',
      component: user
    }
    ]
  },
  {
    path: '/user/chat', // 一级路由,小智同学
    component: chat
  },
  {
    path: '/login', // 一级路由,登录
    component: login
  },
  {
    path: '/user/profile', // 一级路由,编辑资料
    component: profile
  },
  {
    path: '/search', // 一级路由,搜索中心
    component: search
  },
  {
    path: '/search/result', // 一级路由,搜索中心
    component: searchresult
  },
  {
    path: '/article', // 一级路由,文章详情
    component: article
  }
]

const router = new VueRouter({
  routes
})

export default router
