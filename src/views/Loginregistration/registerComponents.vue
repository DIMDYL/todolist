<script setup>
import { ref } from 'vue'

const userinfo = ref({
  username: '',
  nikename: '',
  password: '',
  emial: '',
  validate: ''
})
const register = () => {
  console.log(1)
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
        <el-input v-model="userinfo.name" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userinfo.nikename" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="userinfo.password" />
      </el-form-item>
      <div class="emial">
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.emial" />
        </el-form-item>
        <el-button>发送</el-button>
      </div>
      <el-form-item label="验证码">
        <el-input v-model="userinfo.validate" />
      </el-form-item>
      <el-form-item>
        <a class="button" @click="register">注册</a>
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
  .emial {
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
