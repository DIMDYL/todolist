<script setup></script>

<template>
  <RouterView />
</template>

<style>
::-webkit-scrollbar-thumb {
  background-color: #252527;
  height: 50px;
  outline-offset: -2px;
  outline: 2px solid #fff;
  -webkit-border-radius: 4px;
  border: 2px solid #fff;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*滚动框背景样式*/
::-webkit-scrollbar-track-piece {
  background-color: #565659;
  -webkit-border-radius: 0;
}
</style>
