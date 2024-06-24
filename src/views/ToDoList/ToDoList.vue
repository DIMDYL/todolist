<!-- 
数据展示逻辑

   ①所有任务顺序都是按照 时间 从小到大来排序 (限时任务根据 limitedTime， 普通任务根据createTime

操作
-任务完成-------------------
    ①点击任务{完成}，将该 {任务} 从 {未完成列表} 中 {删除}
    ②将该 {任务} 插入到 {完成列表} 去展示给用户(注意，{插入逻辑应遵循排序顺序}，如果插入的位置理论上在后面，那么就不热更新任务，让用户自己通过滚动去更新
-取消任务完成--------------------
    ①点击任务 {取消完成}，那么该 {任务} 从 {完成列表} 中 {删除}
    ②并且如果删除该任务后，当前 {任务条数少于5}，那么就 {查询} 一次，
 -->
<template>
  <el-dialog v-model="dialogInfo.isShow" style="background-color: #101011">
    <div
      style="width: 100%; display: flex; flex-direction: column; row-gap: 10px"
    >
      <div style="width: 100%">
        <textarea
          style="width: 100%"
          class="textareaStyle"
          v-model="dialogInfo.content"
        ></textarea>
      </div>
      <div class="dialog-footer">
        <button @click="editTaskContent">保存</button>
        <button @click="dialogInfo.isShow = false">取消</button>
      </div>
    </div>
  </el-dialog>
  <div class="index">
    <div class="unfinished">
      <div
        v-if="toDoListInfo.unfinished.data.length == 0"
        class="BoxColor"
        style="box-sizing: border-box; padding: 10px 0 10px 10px"
      >
        ! ! !请添加任务
      </div>
      <ul v-else class="toDoList-list-ul BoxColor">
        <li
          class="toDoList-list-li"
          v-for="(v, index) in toDoListInfo.unfinished.data"
          :key="v.id"
        >
          <el-button
            type="info"
            circle
            @click="modifyStatus(index, toDoListInfo.unfinished.data, true)"
          />
          <div
            style="
              display: flex;
              flex: 1 0 0;
              flex-direction: column;
              justify-content: center;
            "
          >
            <p>
              {{ v.content }}
            </p>
            <div
              v-if="isLimitedTime"
              v-show="isLimitedTime"
              style="color: rgb(120, 179, 30)"
            >
              <i style="font-style: normal">{{ v.limitedTime }}</i>
            </div>
          </div>
          <div class="mani-button">
            <button @click="deleteTask(toDoListInfo.unfinished.data, index)">
              删除</button
            >|
            <button @click="showEditDialog(v)">编辑</button>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="finished"
      ref="scrollBox"
      style="overflow-y: auto; height: 350px"
    >
      <div
        v-if="toDoListInfo.finished.data.length == 0"
        class="BoxColor"
        style="box-sizing: border-box; padding: 10px 0 10px 10px"
      >
        ! ! !这里还没有完成任何任务
      </div>
      <ul v-else class="toDoList-list-ul BoxColor"
      v-infinite-scroll="queryFinished">
        <li
          class="toDoList-list-li"
          v-for="(v, index) in toDoListInfo.finished.data"
          :key="v.id"
        >
          <el-button
            type="success"
            circle
            @click="modifyStatus(index, toDoListInfo.finished.data, false)"
          />
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
            "
          >
            <p>
              {{ v.content }}
            </p>
            <div
              v-if="isLimitedTime"
              v-show="isLimitedTime"
              style="color: rgb(120, 179, 30)"
            >
              <i style="font-style: normal">{{ v.limitedTime }}</i>
            </div>
          </div>
          <div class="mani-button">
            <button @click="deleteTask(toDoListInfo.finished.data, index)">
              删除</button
            >|
            <button @click="showEditDialog(v)">编辑</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTaskStore } from '@/stores/task'
import { useRoute } from 'vue-router'
import {
  queryRequest,
  modiyStatusRequest,
  editTaskContentRequest,
  deleteTaskRequest
} from '@/axios/taskRequest.js'
import { ElMessage } from 'element-plus'
//----------------------------------------attributes
const useTaskStore_ = useTaskStore()
//notation
const scrollBox = ref()
//用户id
const {
  userInfo: { id }
} = useUserStore()
//当前组件mode ->limited? common
const isLimitedTime = useRoute().fullPath.split('/')[2] == 'limit' ? 1 : 0
//更新数量
const queryNumber = 5
//任务列表数据
let toDoListInfo = reactive({
  unfinished: {
    data: []
  },
  finished: {
    data: []
  }
})
//dialog
let dialogInfo = ref({
  isShow: false,
  task: null,
  content: ''
})
//-----------------------------------------methods
//查询
const queryFinished = () => {
  query(true)
}
const queryUnFinished = () => {
  query(false)
}
const query = async (isFinished) => {
  //①初始化数据
  let start = isFinished ? toDoListInfo.finished.data.length : null
  let status = isFinished ? 1 : 0
  //②滚动请求
  let response = await queryRequest({
    userId: id,
    start,
    number: isFinished ? queryNumber : null,
    status,
    isLimitedTime
  })

  //③数据存储
  if (response != null) {
    if (isFinished) {
      let l = response.data.length
      for (let i = 0; i < l; i++)
        toDoListInfo.finished.data.push(response.data[i])
    } else {
      Object.assign(toDoListInfo.unfinished.data, response.data)
    }
  }
  //④将滚动条提高5px
  scrollBox.value.scroll(0, scrollBox.value.scrollTop - 10)
}
//将时间字符串 转 数字字符串
const getWhole = (val) => {
  let value = val.split(':')
  let x = ''
  let l = value.length
  for (let i = 0; i < l; i++) x += value[i]
  return x
}
//将val插入到array中
const queryPosition = (array, val, isLimitedTime) => {
  //将时间转成数字
  let value = getWhole(
    isLimitedTime ? val.limitedTime : val.createTime.split(' ')[1]
  )

  let l = 0
  let r = array.length - 1
  //寻找合适的位置
  while (l <= r) {
    //也检查右边界
    let mid = (l + r) >> 1
    let target = getWhole(
      isLimitedTime
        ? array[mid].limitedTime
        : array[mid].createTime.split(' ')[1]
    )
    if (target <= value) l = mid + 1
    else {
      r = mid - 1
    }
  }
  return l
}
//更改任务状态
const modifyStatus = async (index, array, isToFinish) => {
  //发送请求
  let response = await modiyStatusRequest(array[index].id, isToFinish ? 1 : 0)
  //本地更新代办数据
  if (response != null && response.code == 1) {
    //获得任务数据
    let task = array[index]
    //从原表删除
    array.splice(index, 1)
    //转移到另一张表
    if (isToFinish) {
      // unfinished -> finished
      //如果完成列表中没有数据，直接插入，
      //否则寻找task应该在完成列表中的那个位置，对比数据是时间，如果是限时任务，就是limitedTime，否则就是createTime
      let position = queryPosition(
        toDoListInfo.finished.data, //插入的目标数组
        task, //插入对象
        isLimitedTime
      )
      if (
        position < queryNumber ||
        position < toDoListInfo.finished.data.length
      ) {
        //没有超出完成列表数据范围
        toDoListInfo.finished.data.splice(position, 0, task)
      }
    } else {
      //finished -> unfinished
      query(false)
      //除了更新未完成列表外，如果完成列表少于number,那么就查询一次
      if (toDoListInfo.finished.data.length < queryNumber) {
        query(true)
      }
    }
  }
}
//显示编辑的窗口
const showEditDialog = (task) => {
  //激活窗口
  dialogInfo.value.isShow = true
  //初始化内容
  dialogInfo.value.task = task
  dialogInfo.value.content = task.content
}
//删除task
const deleteTask = async (array, index) => {
  let response = await deleteTaskRequest(array[index].id)
  if (response != null) {
    //删除
    array.splice(index, 1)
  }
}
//编辑task内容
const editTaskContent = async () => {
  // 校验长度
  if(dialogInfo.value.content.length > 70){
    ElMessage.error("长度超出70")
    return ;
  }
  let response = await editTaskContentRequest({
    id: dialogInfo.value.task.id,
    content: dialogInfo.value.content
  })
  //热更新本地
  if (response != null) {
    dialogInfo.value.task.content = dialogInfo.value.content
    dialogInfo.value.isShow = false
  }
}
//-------------------------------watchs
watch(
  //当提交后，更新数据
  () => useTaskStore_.eventNotice.addTask,
  () => {
    // 延迟查询，在插入和查询之间间隔，避免幻读
    setTimeout(() => {
      query(false)
    }, 100)
  }
)
//-------------------------------初始化
queryUnFinished()
queryFinished()
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: end;
  column-gap: 10px;
}
.dialog-footer button {
  padding: 5px 10px;
}

.index {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
.toDoList-list-ul {
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
}
.toDoList-list-li {
  box-sizing: border-box;
  display: flex;
  height: 67px;
  flex: 1 0 0;
  column-gap: 10px;
  border-top: 1px solid #101011;
}
.toDoList-list-li p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.mani-button {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.mani-button button {
  height: 40px;
  padding: 0 10px;
  background-color: transparent;
  outline: none;
  border: 0px;
}
.mani-button button:nth-child(1):hover {
  color: red;
}
.mani-button button:nth-child(2):hover {
  color: aqua;
}
.toDoList-list-li:nth-child(1) {
  border-top: 0px;
}
/deep/ .el-button {
  align-self: center;
}
</style>
