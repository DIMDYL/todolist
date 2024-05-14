<script setup>
import { reactive, ref } from 'vue'

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: ''
})
const login = () => {
  console.log(1)
}
const labelPosition = ref('Top')
</script>
<template>
  <div class="login">
    <h1>登录</h1>
    <el-form
      :label-position="labelPosition"
      label-width="auto"
      :model="formLabelAlign"
      style="max-width: 600px"
    >
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item>
        <a class="button" @click="login">登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
.login {
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
