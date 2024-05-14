<script setup></script>
<template>
  <div class="pleaselogin">
    <p>未登录</p>
    <a href="/login">
      <el-button type="warning">去登录</el-button>
    </a>
  </div>
</template>
<style lang="less" scoped>
.pleaselogin {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 300px;
  p {
    font-size: 30px;
    padding: 10px 0;
  }
  button {
    background-color: #ffd04b !important;
    outline: none;
    color: rgb(0, 0, 0);
  }
}
</style>
