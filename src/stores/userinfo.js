import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore(
  'userinfo',
  () => {
    // 用户登录状态
    const loginstatus = ref(false)
    // 动态组件名称
    const componentsname = ref(null)
    // 用户信息
    const user = ref({
      name: 'dimdim',
      age: 18,
      sex: '男'
    })

    // 更新用户信息
    function updateinfo(val) {
      user.value = val
    }
    // 更新组件名称
    function updatecomponentsname(val) {
      componentsname.value = val
    }
    // 更新登录状态
    function updateLoginStatus(val) {
      loginstatus.value = val
    }

    return {
      user,
      updateinfo,
      updatecomponentsname,
      componentsname,
      loginstatus,
      updateLoginStatus
    }
  },
  {
    persist: {
      key: 'userinfo',
      paths: ['user', 'loginstatus']
    }
  }
)
