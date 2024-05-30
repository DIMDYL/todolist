import { defineStore } from 'pinia'
import { addTaskRequest } from '@/axios/taskRequest.js'
export const useTaskStore = defineStore('useTaskStore', {
  state: () => ({
    typeInfo: {
      //内容
      content: '',
      //是否是限时任务
      isLimitedTime: 0,
      //限时时间
      limitedTime: null
    },
    eventNotice: {
      addTask: 0
    }
  }),
  actions: {
    setContent(val) {
      this.typeInfo.content = val
    },
    setLimitedTime(val) {
      this.typeInfo.limitedTime = val
    },
    initialize(isLimitedTime) {
      this.typeInfo.content = ''
      this.typeInfo.isLimitedTime = isLimitedTime
      this.typeInfo.limitedTime = null
    },
    addTask(id) {
      addTaskRequest({
        userId: id,
        content: this.typeInfo.content,
        isLimitedTime: this.typeInfo.isLimitedTime,
        limitedTime: this.typeInfo.limitedTime
      })

      // 通知
      this.eventNotice.addTask++
    }
  }
})
