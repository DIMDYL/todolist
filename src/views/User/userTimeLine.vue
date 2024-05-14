<script setup>
import { ref } from 'vue'
const data = ref([
  {
    timestamp: '2024/8/16',
    content: '这是一片测试文章...',
    showOperation: false
  },
  {
    timestamp: '2024/8/16',
    content: '这是一片测试文章...',
    showOperation: false
  },
  {
    timestamp: '2024/8/16',
    content: '这是一片测试文章...',
    showOperation: false
  },
  {
    timestamp: '2024/8/16',
    content: '这是一片测试文章...',
    showOperation: false
  },
  {
    timestamp: '2024/8/16',
    content: '这是一片测试文章...',
    showOperation: false
  },
  {
    timestamp: '2024/8/16',
    content: '这是一片测试文章...',
    showOperation: false
  },
  {
    timestamp: '2024/8/16',
    content: '这是一片测试文章...',
    showOperation: false
  }
])
</script>
<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in data"
      :key="item"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <div class="card">
          {{ item.content }}
          <div
            class="operation animate__animated animate__bounce animate__flipInY"
          >
            <a @click.stop="up(1)">编辑</a>
            <a @click.stop="up(2)">删除</a>
            <a @click.stop="up(3)">查看</a>
          </div>
        </div>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
<style lang="less" scoped>
.ant-timeline {
  color: white !important;
}
.card {
  -webkit-user-select: none;
  cursor: pointer;
  .operation {
    width: 200px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    color: #ffd04b;
    a {
      cursor: pointer;
      display: block;
      padding: 10px;
      &:hover {
        color: #ffffff;
      }
    }
  }
}
/deep/ .el-card__body {
  background-color: #252527;
  color: rgb(190, 184, 184);
}
</style>
