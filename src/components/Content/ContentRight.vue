<script setup>
import { ref } from 'vue'
import ContentUserinfo from './ContentUserinfo.vue'
import { useLayoutStore } from '@/stores/layout.js'
const layoutStore = useLayoutStore()
const y = ref(layoutStore.y)
</script>
<template>
  <div class="contentright" :class="{ top: y > 200 }">
    <div class="contentbox BoxColor">
      <ContentUserinfo />
    </div>
  </div>
</template>
<style lang="less" scoped>
.contentright {
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  .contentbox {
    padding: 17px;
    box-sizing: border-box;
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
  }
  .top {
    position: fixed;
    top: 17px;
    transition: all 0.5s;
  }
}
</style>
