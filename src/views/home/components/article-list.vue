<template>
  <div class="scroll-wrapper">
      <van-list finished-text="没有了" v-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell-group>
          <van-cell  v-for="item in articles" :key="item" title="左边" :value="'天台排队'+item"></van-cell>
        </van-cell-group>
      </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 表示是否开启了上拉加载 默认值false
      finished: false, // 表示 是否已经完成所有数据的加载
      articles: []
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      if (this.articles.length > 50) {
        // this.upLoading = true
        this.finished = true
      } else {
        const arr = Array.from(Array(15), (value, index) => index + 1)
        this.articles.push(...arr)
        this.upLoading = false
      }

      // setTimeout(() => {
      //   this.finished = true
      // }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
