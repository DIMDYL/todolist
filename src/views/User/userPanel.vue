<script setup>
import userTimeLine from './userTimeLine.vue'
import { userStore } from '@/stores/userStore.js'
import { storeToRefs } from 'pinia'
let userStore_ = userStore()
let { isEdit } = storeToRefs(userStore_)
</script>
<template>
  <div class="panel">
    <div class="info BoxColor">
      <div class="infobox animate__animated animate__jackInTheBox">
        <h1>DDD</h1>
        <h5>DDD@DDD.DDD</h5>
        <p>加入时间</p>
        <h4>1991-08-16</h4>
        <el-button
          type="info"
          @click="userStore_.changeStatusForEdit(!isEdit.value)"
          >编辑</el-button
        >
      </div>
    </div>
    <div class="timeline BoxColor">
      <userTimeLine></userTimeLine>
    </div>
  </div>
</template>
<style lang="less" scoped>
.panel {
  width: 100%;
  margin: 27px 0;
  display: flex;
  .info {
    width: 300px;
    padding: 10px;
    height: 300px;
    max-height: 400px;
    box-sizing: border-box;
    margin-right: 20px;
    color: #ffd04b;
    .infobox {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
    button {
      background-color: #252527;
    }
  }
  .timeline {
    flex: 1;
    padding: 27px;
    box-sizing: border-box;
    height: auto;
    transition: all 0.5s;
  }
}
.show {
  display: none !important;
}
</style>
