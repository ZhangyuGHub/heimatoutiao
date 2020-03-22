<template>
  <div class='container'>
  <van-tabs >
  <van-tab :title="`标签${item}`" v-for="item in 7" :key="item">
    <span class="bar_btn">
      <van-icon name="wap-nav" />
    </span>
    <ArticleList></ArticleList>
  </van-tab>

</van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
export default {
  name: 'home', // devtools查看组件时  可以看到 对应的name名称
  components: {
    ArticleList
  }
}
</script>

<style lang="less" scoped>

.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.van-cell{
  text-align: left;
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
