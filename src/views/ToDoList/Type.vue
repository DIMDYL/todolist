<template>
  <div class="head BoxColor">
    <div class="type">
      <textarea
        placeholder="请输入待办事项"
        class="textareaStyle"
        style="width: 100%; height: 100%"
        v-model="local_content"
      ></textarea>
    </div>

    <div class="submit">
      <slot name="limit" />
      <button
        @click="addTask_"
        style="padding: 3px 15px; margin-right: 10px; margin-left: auto"
      >
        提交
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/task.js'
import { useUserStore } from '@/stores/user.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// ---------------------------attributes
//本地的内容
let local_content = ref('')
//当前所在组件是否是limit
let { setContent, initialize, addTask } = useTaskStore()

//----------------------------methods
let addTask_ = () => {
  //执行添加
  let id = useUserStore().userInfo.id
  addTask(id)
  //清空数据
  local_content.value = ''
}
//----------------------------watch
//当本地的content改变时，就改变全局的
watch(local_content, (newVal) => {
  setContent(newVal)
})

//----------初始化执行
initialize(useRoute().fullPath.split('/')[2] == 'limit' ? 1 : 0) //①初始化taskInfo, 如果当前页面时limit，那么isLimitedTime属性为1，否则0
</script>

<style scoped>
.head {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  row-gap: 10px;
  flex: 0 0 200px;
  width: 100%;
}
.type {
  flex: 1 0 0;
  width: 100%;
}
.submit {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex: 0 0 50px;
  width: 100%;
}
</style>
