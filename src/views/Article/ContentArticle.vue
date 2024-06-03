<template>
  <el-dialog v-model="dialogInfo.isDis" style="background-color: #272727">
    <div
      style="
        height: 450px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      "
    >
      <p style="height: 400px; overflow-y: auto; color: white">
        {{ dialogInfo.content }}
      </p>
      <button
        style="margin-left: auto; padding: 5px 10px"
        @click="dialogInfo.isDis = false"
      >
        关闭
      </button>
    </div>
  </el-dialog>
  <div v-if="articles.length == 0">这里没有任何总结！！！</div>
  <ul v-infinite-scroll="scrollQuery">
    <li v-for="(v, index) in articles" :key="index">
      <div class="articlebox BoxColor">
        <div class="info">
          <div class="userinfo">
            <el-avatar :size="50" :src="userInfo.image" />
            <div>
              <p>{{ userInfo.userName }}</p>
              <p>发布于：{{ v.createTime }}</p>
            </div>
          </div>
          <div class="articleinfo">
            <a @click="show(v.content)">查看详情</a>
          </div>
        </div>
        <div class="word">
          <p
            style="
              width: 0px;
              height: 30px;
              overflow: visible;
              white-space: nowrap;
            "
          >
            {{ v.content }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { reactive } from 'vue'
import { scrollQueryRequest } from '@/axios/summaryRequest'
import { useUserStore } from '@/stores/user'
const { userInfo } = useUserStore()
const queryNumber = 5
const articles = reactive([])
const dialogInfo = reactive({
  isDis: false,
  content: ''
})
//展示详情
const show = (content) => {
  dialogInfo.isDis = true
  dialogInfo.content = content
}
//滚动查询
const scrollQuery = async () => {
  //①获取数据
  let response = await scrollQueryRequest({
    start: articles.length,
    number: queryNumber,
    userId: userInfo.id
  })
  //②更新数据
  if (response != null) {
    let l = response.data.length
    for (let i = 0; i < l; i++) articles.push(response.data[i])
  }
}
</script>
<style lang="less" scoped>
.articlebox {
  width: 100%;
  padding: 20px;
  margin-bottom: 17px;
  box-sizing: border-box;
  .word {
    overflow: hidden;
    width: 100%;
    padding: 20px 0;
    text-indent: 2em;
    p {
      line-height: 27px;
    }
  }
  .info {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .userinfo {
      display: flex;
      align-items: center;
      -webkit-user-select: none;
      p {
        padding: 0 10px;
      }
    }
    .articleinfo {
      height: 100%;
      display: flex;
      -webkit-user-select: none;
      p {
        padding: 0 10px;
      }
      a {
        cursor: pointer;
        padding: 0px 30px;
        //   border: 1px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          color: #ffd04b;
        }
      }
    }
  }
}
</style>
