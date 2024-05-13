<template>
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
      <slot name="limit"></slot>
      <button style="padding: 3px 15px; margin-right: 10px; margin-left: auto">
        提交
      </button>
    </div>
  </div>
</template>

<script setup></script>

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
