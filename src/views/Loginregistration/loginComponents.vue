<script setup>
import { reactive, ref } from 'vue'

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: ''
})
const labelPosition = ref('Top')
</script>
<template>
  <div class="login">
    <el-form
      :label-position="labelPosition"
      label-width="auto"
      :model="formLabelAlign"
      style="max-width: 600px"
    >
      <el-form-item label="Name">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
.login {
  width: 100%;
}
</style>
