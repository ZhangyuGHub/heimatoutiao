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
export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '111111'// 验证码
      },
      errorMessage: {
        mobile: '', // 手机号错误信息
        code: ''// 验证码错误信息
      }
    }
  },
  methods: {
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
    login () {
      if (this.checkMobile() && this.checkCode()) {
        console.log('校验通过')
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
