<script setup>
import userInfo from './userInfo.vue'
import userPanel from './userPanel.vue'
</script>
<template>
  <div class="user">
    <userInfo></userInfo>
    <userPanel></userPanel>
  </div>
</template>
<style lang="less" scoped>
.user {
  width: 100%;
  padding: 17px;
}
</style>
