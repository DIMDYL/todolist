<template>
  <Content>
    <div class="index">
      <Type />
      <ToDoList />
    </div>
  </Content>
</template>

<script setup>
import Content from '@/components/Content/index.vue'
import Type from '@/views/ToDoList/Type.vue'
import ToDoList from '@/views/ToDoList/ToDoList.vue'
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
