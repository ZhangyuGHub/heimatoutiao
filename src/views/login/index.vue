<template>
  <div class='container'>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
 <van-field
    required
    label="手机号"
    placeholder="请输入手机号"
  />
  <van-field
  center
  required
  clearable
  label="验证码"
  placeholder="请输入验证码"
>
  <van-button slot="button" size="small" type="primary">发送验证码</van-button>
</van-field>
  </van-cell-group>
   <div class='login-box'>
      <van-button type="info" round size="small" block>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style>
.login-box{
  padding: 10px;
}
</style>
