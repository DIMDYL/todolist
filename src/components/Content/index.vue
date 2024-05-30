<script setup>
import ContentTop from './ContentTop.vue'
import ContentPanel from './ContentPanel.vue'
</script>
<template>
  <div class="article animate__animated animate__fadeIn">
    <ContentTop></ContentTop>
    <ContentPanel>
      <slot></slot>
    </ContentPanel>
  </div>
</template>
<style lang="less" scoped>
.article {
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
