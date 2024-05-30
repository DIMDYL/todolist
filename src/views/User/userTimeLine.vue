<script setup>
import { reactive, ref } from 'vue'
import {
  scrollQueryRequest,
  deleteRequest,
  addSummaryRequest,
  editSummaryRequest
} from '@/axios/summaryRequest'
import { useUserStore } from '@/stores/user'
//-----------------------------attribute

const {
  userInfo: { id }
} = useUserStore()
const summaries = reactive([])
const queryNumber = 5
let typeContent = ref('')
let dialogInfo = reactive({
  disDialog: false,
  isEdit: true,
  targetSummary: null,
  content: ''
})
//------------------------------methods
const scrollQuery = async () => {
  let response = await scrollQueryRequest({
    userId: id,
    start: summaries.length,
    number: queryNumber
  })
  if (response != null) {
    let l = response.data.length
    for (let i = 0; i < l; i++) summaries.push(response.data[i])
  }
}

const addSummary = async () => {
  let response = await addSummaryRequest({
    userId: id,
    content: typeContent.value
  })
  //热更新本地数据
  if (response != null) {
    summaries.unshift(response.data)
  }
  //清空数据
  typeContent.value = ''
}
const removeSummary = (id, index) => {
  //删除remote
  deleteRequest(id)
  //清理local
  summaries.splice(index, 1)
}
const disDialog = (isEdit, summary) => {
  dialogInfo.disDialog = true
  dialogInfo.isEdit = isEdit
  dialogInfo.targetSummary = summary
  dialogInfo.content = summary.content
}
const saveEditedContent = async () => {
  //更新remote
  let response = await editSummaryRequest({
    id: dialogInfo.targetSummary.id,
    content: dialogInfo.content
  })
  if (response != null) {
    //成功?热更新local
    dialogInfo.targetSummary.content = dialogInfo.content
    //关闭dialog
    dialogInfo.disDialog = false
  }
}
</script>
<template>
  <div class="user-timeline-box">
    <el-dialog v-model="dialogInfo.disDialog">
      <div class="dislog-content">
        <textarea
          v-if="dialogInfo.isEdit"
          v-model="dialogInfo.content"
          class="textareaStyle"
          style="width: 100%; height: 99%; border: 1px solid rgb(118, 118, 118)"
        ></textarea>
        <p v-else style="width: 100%; height: 100%; color: white">
          {{ dialogInfo.content }}
        </p>
      </div>
      <div class="dialog-footer">
        <button v-if="dialogInfo.isEdit" @click="saveEditedContent">
          保存
        </button>
        <button
          v-else
          @click="dialogInfo.disDialog = false"
          style="margin-left: auto"
        >
          关闭
        </button>
      </div>
    </el-dialog>
    <div class="typeSummary BoxColor">
      <textarea
        placeholder="今日总结内容"
        class="textareaStyle"
        v-model="typeContent"
      />
      <button @click="addSummary">提交</button>
    </div>
    <div class="BoxColor">
      <el-timeline v-infinite-scroll="scrollQuery">
        <el-timeline-item
          v-for="(item, index) in summaries"
          :key="item.id"
          :timestamp="item.createTime"
          placement="top"
        >
          <el-card>
            <div class="card">
              <p style="height: 40px; overflow: hidden">
                {{ item.content }}
              </p>
              <div
                class="operation animate__animated animate__bounce animate__flipInY"
              >
                <a @click.stop="disDialog(true, item)">编辑</a>
                <a @click.stop="removeSummary(item.id, index)">删除</a>
                <a @click.stop="disDialog(false, item)">查看</a>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ant-timeline {
  color: white !important;
}

.user-timeline-box {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  .typeSummary {
    box-sizing: border-box;
    padding: 20px 20px 20px 20px;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    textarea {
      flex: 1 0 0;
    }
    button {
      margin-left: auto;
      padding: 5px 10px;
      width: 70px;
    }
  }
  /deep/ .el-dialog {
    background-color: #252527 !important;
  }
  /deep/ .el-dialog__body {
    box-sizing: border-box;
    padding: 20px 20px 50px 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    height: 500px !important;
    .dislog-content {
      flex: 1 0 0;
      width: 100%;
      overflow-y: auto;
    }
    .dialog-footer {
      flex: 0 0 35px;
      width: 100%;
      display: flex;
      button {
        padding: 0 10px;
      }
    }
  }
}
.card {
  -webkit-user-select: none;
  .operation {
    display: flex;
    height: 20px;
    column-gap: 10px;
    color: #ffd04b;
    a {
      cursor: pointer;
      display: block;
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
