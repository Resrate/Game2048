<style scoped>
#table {
  background-color: #bbada0;
  width: 390px;
  height: 390px;
  position: relative;
  margin: 0px auto;
  padding: 0px 0px;
  border-radius: 10px;
  border: #857c71 solid 2px;
  box-shadow: inset -2.5px -2.5px 0 rgba(0, 0, 0, 0.4),inset 5px 5px 0 rgba(255, 255, 255, 0.4);
}
#first_line,
#last_line {
  display: flex;
  width: 350px;
  justify-content: space-between;
  margin: 0px auto;
  padding-top: 10px;
}
#score div {
  text-align: center;
}
#table {
  background-color: #bbada0;
  width: 390px;
  height: 390px;
  position: relative;
  margin: 10px auto;
  padding: 0px 0px;
  border-radius: 10px;
  border: #857c71 solid 2px;
}
h1 {
  margin: 0px;
  font-weight: bolder;
  font-size: 300%;
}
button {
  background-color: #beb1a0;
  border-radius: 2px;
  border: #857c71 solid 2px;
  color: #736d64;
}
.fonts {
  color: #736d64;
}
.font_white {
  color: whitesmoke;
}
#num {
  font-size: large;
  height: 100%;
}
</style>
<template>
  <check></check>
  <div id="first_line" class="fonts">
    <h1>2048</h1>
    <div id="score" class="font_white">
      <shows name="最高数"></shows>
      <shows name="分数"></shows>
    </div>
  </div>
  <div id="last_line" class="fonts">
    <div id="num">合并数字达到2048</div>
    <button class="font_white" @click="f5">重新开始游戏</button>
  </div>
  <div id="table">
    <block-render></block-render>
    <my-table></my-table>
  </div>
</template>

<script setup lang="ts">
import shows from "./components/shows.vue";
import check from "./components/check.vue";
import blockRender from "./components/block-render.vue";
import myTable from "./components/my-table.vue";
import logic from "./ts/logic";
import { start } from "./ts/bace";
import { onMounted } from "vue";
import { useEventListener } from "@vueuse/core";
useEventListener(window, "keyup", logic);
onMounted(start);
const f5 = () => {
  location.replace(location.href);
};
</script>
