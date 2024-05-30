<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'

let useUserStore_ = useUserStore()
const userinfo = reactive({
  accountName: '',
  password: ''
})
// 检测参数是否异常

let isErrorForFilledInfo = reactive({
  //①用户信息提示
  accountName: false,
  password: false
})

//----------------methods------------------
const checkInfoIeagl = () => {
  //结果
  let bool = true
  //如果没有填写，那么添加定时器
  if (userinfo.accountName === '') {
    bool = false //验证失败
    isErrorForFilledInfo.accountName = true
    setTimeout(() => {
      isErrorForFilledInfo.accountName = false
    }, 1000)
  } else {
    isErrorForFilledInfo.accountName = false
  }
  if (userinfo.password === '') {
    bool = false //验证失败
    isErrorForFilledInfo.password = true
    setTimeout(() => {
      isErrorForFilledInfo.password = false
    }, 1000)
  } else {
    isErrorForFilledInfo.password = false
  }
  return bool
}
const login = () => {
  if (checkInfoIeagl()) {
    useUserStore_.loginOrSignup(true, userinfo)
  }
}
</script>
<template>
  <div class="register">
    <h1>登录</h1>
    <el-form
      label-width="auto"
      :model="formLabelAlign"
      style="max-width: 600px"
    >
      <el-form-item label="用户名">
        <el-input v-model="userinfo.accountName" />
        <i v-if="isErrorForFilledInfo.accountName">请输入用户名</i>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="userinfo.password" />
        <i v-if="isErrorForFilledInfo.password">请输入密码</i>
      </el-form-item>
      <el-form-item>
        <a class="button" @click="login">登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
.register {
  width: 100%;
  text-align: center;
  h1 {
    color: #ffd04b;
    margin-bottom: 10px;
  }
  .button {
    width: 100%;
    display: flex;
    height: 30px;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
