import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore(
  'userinfo',
  () => {
    const user = ref({
      name: 'dimdim',
      age: 18,
      sex: '男'
    })
    function update(val) {
      user.value = val
    }
    return { user, update }
  },
  {
    persist: true
  }
)
