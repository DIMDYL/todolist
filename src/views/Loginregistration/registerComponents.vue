<script setup>
import { reactive,ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { sendIdentifyingCodeRequest } from '@/axios/userRequest'
//-----------------data-------------------------
const userinfo = reactive({
  accountName: '',
  userName: '',
  password: '',
  email: '',
  identifyingCode: ''
})
const useUserStore_ = useUserStore()
let isErrorForFilledInfo = reactive({
  //①用户信息提示
  accountName: false,
  userName: false,
  password: false,
  email: false,
  identifyingCode: false
})
let sendButton = ref()
let countDown = ref()
let isDisabled = ref(false)
//-------------------methods--------------------
const sendIdentifyingCode = async () => {
  //校验是否有填写验证码
  if (userinfo.email === '') {
    isErrorForFilledInfo.email = true
    setTimeout(() => {
      isErrorForFilledInfo.email = false
    }, 1000)
  } else {
    isErrorForFilledInfo.email = false
    //按钮禁止点击状态，并显式动画效果
    startCountDown(6)
    //发送验证码
    sendIdentifyingCodeRequest({
      email: userinfo.email,
      type: 1
    })
  }

}
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
  if (userinfo.image === '') {
    bool = false //验证失败
    isErrorForFilledInfo.image = true
    setTimeout(() => {
      isErrorForFilledInfo.image = false
    }, 1000)
  } else {
    isErrorForFilledInfo.image = false
  }
  if (userinfo.userName === '') {
    bool = false //验证失败
    isErrorForFilledInfo.userName = true
    setTimeout(() => {
      isErrorForFilledInfo.userName = false
    }, 1000)
  } else {
    isErrorForFilledInfo.userName = false
  }
  if (userinfo.email === '') {
    bool = false //验证失败
    isErrorForFilledInfo.email = true
    setTimeout(() => {
      isErrorForFilledInfo.email = false
    }, 1000)
  } else {
    isErrorForFilledInfo.email = false
  }
  if (userinfo.identifyingCode === '') {
    bool = false //验证失败
    isErrorForFilledInfo.identifyingCode = true
    setTimeout(() => {
      isErrorForFilledInfo.identifyingCode = false
    }, 1000)
  } else {
    isErrorForFilledInfo.identifyingCode = false
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
const signup = () => {
  if (checkInfoIeagl()) {
    useUserStore_.loginOrSignup(false, userinfo)
  }
}
let startCountDown = (second) => {
  isDisabled.value = true
  countDown.value = second
  sendButton.value.disabled = true
  //动画效果
  let countDownInterval = setInterval(() => {
    countDown.value--
  }, 1000)
  //结束动作
  setTimeout(() => {
    sendButton.value.disabled = false
    isDisabled.value = false
    clearInterval(countDownInterval)
  }, second * 1000)
}
</script>
<template>
  <div class="register">
    <h1>注册</h1>
    <el-form
      label-width="auto"
      :model="formLabelAlign"
      style="max-width: 600px"
    >
      <el-form-item label="用户名">
        <el-input v-model="userinfo.accountName" />
        <i v-if="isErrorForFilledInfo.accountName">请输入用户名</i>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userinfo.userName" />
        <i v-if="isErrorForFilledInfo.userName">请输入昵称</i>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="userinfo.password" />
        <i v-if="isErrorForFilledInfo.password">请输入密码</i>
      </el-form-item>
      <div class="email">
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email" />
          <i v-if="isErrorForFilledInfo.email">请输入邮箱</i>
        </el-form-item>
        <el-button @click="sendIdentifyingCode"  ref="sendButton"> {{ isDisabled ? countDown +"秒后重试": '发送' }}</el-button>
      </div>
      <el-form-item label="验证码">
        <el-input v-model="userinfo.identifyingCode" />
        <i v-if="isErrorForFilledInfo.identifyingCode">请输入验证码</i>
      </el-form-item>
      <el-form-item>
        <a class="button" @click="signup">注册</a>
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
  .email {
    width: 100%;
    display: flex;
    justify-content: space-between;
    /deep/ .el-input__inner {
      flex: 1;
    }
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
