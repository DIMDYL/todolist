<template>
  <Content>
    <div class="index">
      <div class="head BoxColor">
        <div class="type">
          <textarea
            placeholder="请输入待办事项"
            style="
              width: 100%;
              height: 100%;
              resize: none;
              box-sizing: border-box;
              padding: 20px 0 0 20px;
              background-color: #19191b;
              -webkit-text-fill-color: white;
              caret-color: white;
            "
          ></textarea>
        </div>
        <div class="submit">
          <button style="padding: 3px 15px; margin-right: 10px">提交</button>
        </div>
      </div>
      <div class="body BoxColor">
        <div class="toDoList-list">
          <div class="limit-list">
            <ul
              class="toDoList-list-ul"
              style="
                width: 100%;
                display: flex;
                flex-direction: column;
                row-gap: 10px;
              "
            >
              <li class="toDoList-list-li" v-for="index in 15" :key="index">
                <el-button type="success" :icon="Check" circle />
                <div style="align-self: center">
                  <h3>30分钟瑜伽</h3>
                  <div style="color: rgb(120, 179, 30)">
                    ?<i style="font-style: normal">上午7:30</i>?
                  </div>
                </div>
                <div style="margin-left: auto; align-self: flex-end">
                  健身 #
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>

<script setup>
import Content from '@/components/Content/index.vue'
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
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 50px;
  width: 100%;
}
.body {
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  column-gap: 20px;
  flex: 1 0 0;
  width: 100%;
}

.toDoList-list {
  flex: 1 0 0;
  height: 100%;
}
.toDoList-list-ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.toDoList-list-li {
  box-sizing: border-box;

  padding: 15px 0 5px 0;
  display: flex;
  width: 100%;

  column-gap: 10px;
  border-top: 1px solid #101011;
}
</style>
