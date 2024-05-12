<script setup>
import { ref } from 'vue'
const defaultactive = ref(location.pathname)
</script>
<template>
  <div class="nav BoxColor">
    <div class="top animate__animated animate__bounce animate__rubberBand">
      <h6>My</h6>
      <h5>ToDo</h5>
      <h1>List</h1>
    </div>
    <el-menu
      router
      active-text-color="#ffd04b"
      background-color="#252527"
      class="el-menu-vertical-demo animate__animated animate__bounce animate__rubberBand"
      :default-active="defaultactive"
      text-color="#fff"
    >
      <el-menu-item index="/">
        <el-icon color="#409efc" class="iconfont"> &#xe66c; </el-icon>
        <span>每日总结</span>
      </el-menu-item>
      <el-menu-item index="/">
        <el-icon color="#409efc" class="iconfont"> &#xe601; </el-icon>

        <span>我的代办</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <el-icon color="#409efc" class="iconfont">&#xe61d; </el-icon>

        <span>用户中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.nav {
  width: 200px;
  height: 100%;
  overflow: hidden;
  .top {
    width: 100%;
    height: 177px;
    color: #ffd04b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.el-menu {
  border-right: none !important;
}
</style>
