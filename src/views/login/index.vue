<template>
  <div class='container'>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
<van-field :error-message="errorMessage.mobile" @blur="checkMobile" v-model.trim='loginForm.mobile' required label="手机号" placeholder="请输入手机号"/>
<van-field :error-message="errorMessage.code" @blur="checkCode" v-model.trim="loginForm.code" center required clearable label="验证码" placeholder="请输入验证码">
  <van-button slot="button" size="small" type="primary">发送验证码</van-button>
</van-field>
  </van-cell-group>
   <div class='login-box'>
      <van-button type="info" round size="small" @click="login" block>登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810'// 验证码
      },
      errorMessage: {
        mobile: '', // 手机号错误信息
        code: ''// 验证码错误信息
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']), // 可以导入需要的方法  直接把updateUser方法映射到当前的methods方法中
    checkMobile () {
      // 获取手机号，并进行判断
      if (!this.loginForm.mobile) {
        this.errorMessage.mobile = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      this.errorMessage.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码必须为6位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        try {
          const result = await login(this.loginForm)
          // 后端 现在把所有手机号 都认为是成功
          // console.log(result) // 打印结果
          // 拿到token之后 应该把token设置vuex中的state
          // 要去修改vuex中的state必须通过 mutations
          // this.$store.commit('')  // 原始方式
          this.updateUser({ user: result }) // 相当于更新当前的token 和 refresh_token
          // 应该跳转到主页 but 如果此时 你这个登录 是 别人401之后跳转过来的 你就应该回到那个跳转过来的页面
          // 1 判断是否有需要跳转的页面 如果有 就跳转 如果没有 不用管 直接跳到主页
          const { redirectUrl } = this.$route.query // query查询参数 也就是 ?后边的参数表
          // redirectUrl有值的话 跳到该地址 没值的话 跳到 主页
          this.$router.push(redirectUrl || '/') // 短路表达式
        } catch (error) {
          // 提示消息 提示用户 告诉用户登录失败
          this.$notify({ message: '用户名或者验证码错误', duration: 800 })
        }
      }
    }
  }
}
</script>

<style>
.login-box{
  padding: 0.417rem;
}
</style>
