<script setup></script>
<template>
  <div class="userinfo">
    <div class="avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <div class="info animate__animated">
      <h1>DDD</h1>
      <h5>DDD@DDD.DDD</h5>
    </div>
  </div>
</template>
<style lang="less" scoped>
.userinfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    /deep/ .el-avatar {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    padding: 10px 0;
    color: #ffd04b;
    text-align: center;
  }
}
</style>
