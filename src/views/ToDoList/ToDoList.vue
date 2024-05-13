<template>
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
            <div style="margin-left: auto; align-self: flex-end">健身 #</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
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
