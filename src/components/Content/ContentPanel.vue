<script setup>
import ContentRight from './ContentRight.vue'
</script>
<template>
  <div class="panel">
    <div class="article">
      <slot></slot>
    </div>
    <div class="contentright">
      <ContentRight></ContentRight>
    </div>
  </div>
</template>
<style lang="less" scoped>
.panel {
  width: 100%;
  display: flex;
  padding: 17px;
  .article {
    flex: 1;
  }
  .contentright {
    width: 400px;
    box-sizing: border-box;
  }
}
</style>
