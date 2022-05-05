<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from "./components/Nav.vue";
</script>

<template>
  <Nav />
  <RouterView />
</template>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
