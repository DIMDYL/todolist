<script setup>
import { useLayoutStore } from '@/stores/layout.js'
import indexNav from './indexNav.vue'
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
const layoutStore = useLayoutStore()
const el = ref(null)
const { y } = useScroll(el)
layoutStore.updatey(y)
</script>
<template>
  <div class="index">
    <indexNav></indexNav>
    <div class="main" ref="el">
      <RouterView />
    </div>
  </div>
</template>
<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  display: flex;
  .main {
    flex: 1;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    .fooder {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
