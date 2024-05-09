import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore(
  'layout',
  () => {
    const y = ref(0)
    const count = ref('DIMDIM')
    function updatey(val) {
      y.value = val
    }
    return { y, updatey, count }
  },
  {
    persist: true
  }
)
