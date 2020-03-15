<template>
<div class="container">
    <van-nav-bar @click-right="$router.push('/search')" v-if="$route.path!=='/user'" title="黑马头条" fixed right-text="搜索"></van-nav-bar>
    <!-- 设置二级路由容器 -->
    <div class="my-wrapper" :class="{noTop:!showNavBar}">
        <router-view></router-view>
    </div>
    <!-- 设置底部标签并且开启路由模式 -->
    <van-tabbar >
  <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
  <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
  <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    // 是否显示navbar
    showNavBar () {
      // this  指向 组件实例
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
