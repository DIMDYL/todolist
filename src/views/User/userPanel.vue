<script setup>
import userTimeLine from './userTimeLine.vue'
</script>
<template>
  <div class="panel">
    <div class="info BoxColor animate__animated animate__flipInY">
      <h1>DDD</h1>
      <h5>DDD@DDD.DDD</h5>
      <p>加入时间</p>
      <h4>1991-08-16</h4>
      <el-button type="info">编辑</el-button>
    </div>
    <div class="meandgem BoxColor">
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #ffd04b;
    button {
      background-color: #252527;
    }
  }
  .meandgem {
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
