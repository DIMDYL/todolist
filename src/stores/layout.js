import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const y = ref(0)
  function updatey(val) {
    y.value = val
  }
  return { y, updatey }
})
