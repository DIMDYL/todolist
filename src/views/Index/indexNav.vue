<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const defaultactive = ref(location.pathname)
const router = useRouter()

let elMenuActive = ref('')

let skipToDoList = (type) => {
  router.push({
    name: 'toDoList',
    params: {
      type
    }
  })
  elMenuActive.value = '/toDoList/' + type
}
</script>

<template>
  <div class="nav BoxColor">
    <div class="top animate__animated animate__bounce animate__rubberBand">
      <h6>My</h6>
      <h5>ToDo</h5>
      <h1>List</h1>
    </div>
    <el-menu
      :default-active="elMenuActive"
      router
      active-text-color="#ffd04b"
      background-color="#252527"
      class="el-menu-vertical-demo animate__animated animate__bounce animate__rubberBand"
      text-color="#fff"
    >
      <el-menu-item index="/">
        <el-icon color="#409efc" class="iconfont"> &#xe66c; </el-icon>
        <span>每日总结</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon color="#409efc" class="iconfont"> &#xe601; </el-icon>
          <span>我的代办</span>
        </template>
        <el-menu-item index="/toDoList/1" @click="skipToDoList(1)"
          ><el-icon color="#409efc" class="iconfont"> &#xe601; </el-icon
          >定时任务</el-menu-item
        >
        <el-menu-item index="/toDoList/2" @click="skipToDoList(2)"
          ><el-icon color="#409efc" class="iconfont"> &#xe601; </el-icon
          >普通任务</el-menu-item
        >
      </el-sub-menu>

      <el-menu-item index="/user">
        <el-icon color="#409efc" class="iconfont">&#xe61d; </el-icon>
        <span>用户中心</span>
      </el-menu-item>
      <a href="https://github.com/DIMDYL/mytodolist" target="_blank">
        <el-menu-item>
          <el-icon color="#409efc" class="iconfont">&#xe6c2; </el-icon>
          GitHub地址
        </el-menu-item>
      </a>
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
