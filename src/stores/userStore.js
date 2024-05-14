import { defineStore } from 'pinia'
import { ref } from 'vue'
export const userStore = defineStore('userStore', () => {
  // 编辑状态
  let isEdit = ref(false)

  //   修改编辑状态
  let changeStatusForEdit = (val) => {
    isEdit.value = val
  }

  return {
    isEdit,
    changeStatusForEdit
  }
})
