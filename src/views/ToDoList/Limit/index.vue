<template>
  <Content>
    <div class="index">
      <Type>
        <template #limit>
          <div>
            <i>是否限时?&nbsp; </i>
            <input
              type="radio"
              v-model="ifLimit"
              @click="ifLimit = !ifLimit"
              style="margin-right: 20px"
            />
            <input v-if="ifLimit" type="text" />
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

import { ref } from 'vue'

let ifLimit = ref(false)
</script>

<style scoped>
.index {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  height: 100%;
}
</style>
