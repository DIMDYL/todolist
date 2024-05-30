<template>
  <Content>
    <div class="index">
      <Type>
        <template #limit>
          <div>
            <el-time-picker
              v-model="timeInfo.currentTime"
              style="width: 150px"
              value-format="HH:mm:ss"
              placeholder="限时"
            />
          </div>
        </template>
      </Type>
      <ToDoList />
    </div>
  </Content>
</template>

<script setup>
import Content from '@/components/Content/index.vue'
import Type from '@/views/ToDoList/Type.vue'
import ToDoList from '@/views/ToDoList/ToDoList.vue'
import { reactive, watch } from 'vue'
import { useTaskStore } from '@/stores/task.js'
//------------attributes
let useTaskStore_ = useTaskStore()

let timeInfo = reactive({
  currentTime: ''
})
//-----------methods
let setLimitedTime = useTaskStore_.setLimitedTime

//-------------watchs
watch(
  () => timeInfo.currentTime,
  (val) => {
    setLimitedTime(val)
  }
)
watch(
  () => useTaskStore_.eventNotice.addTask,
  () => {
    timeInfo.currentTime = null
  }
)
</script>

<style scoped>
.index {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  height: 100%;
}
</style>
