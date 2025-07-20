<style scoped>
.move {
  z-index: 10;
  color: #776e65;
  font-weight: bolder;
  font-size: 30px;
  text-align: center;
  line-height: 81px;
  background-color: #eee4da;
  width: 81px;
  height: 81px;
  position: absolute;
  margin: 0px 0px;
  padding: 0px 0px;
  border-radius: 7px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: inset -2.5px -2.5px 0 rgba(0, 0, 0, 0.4),
    inset 5px 5px 0 rgba(255, 255, 255, 0.4);
}
.move[data-length="4"] {
  font-size: 15px;
}
.move[data="T"] {
  color: #f3f0e5;
}
</style>
<template>
  <div
    class="move"
    ref="block"
    v-for="dom in blockes"
    v-show="dom.num"
    :style="{
      zIndex: dom.del === true ? 5 : 10,
      backgroundColor: color(dom.num),
    }"
    :data-length="String(dom.num).length"
    :data="dom.num >= 8 ? 'T' : 'F'"
  >
    {{ dom.num }}
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { store } from "../stores";
import { ref, watch } from "vue";

const { blockes, renderFlag } = storeToRefs(store());
const block = ref<HTMLElement[]>([]);
const colorMap = new Map([
  [2, "rgb(238, 228, 218)"],
  [4, "rgb(237, 224, 200)"],
  [8, "rgb(242, 177, 121)"],
  [16, "rgb(242, 177, 121)"],
  [32, "rgb(246, 124, 95)]"],
  [64, "rgb(246, 94, 59)"],
  [128, "rgb(237, 207, 114)"],
  [256, "rgb(237, 204, 97)"],
  [512, "rgb(237, 200, 80)"],
  [1024, "rgb(237, 197, 63)"],
  [2048, "rgb(237, 194, 46)"],
]);
const color = (value: number) => colorMap.get(value);
watch(
  renderFlag,
  () => {
    for (let i = 0; i <= 15; i++) {
      blockes.value[i].animation(block.value[i]);
    }
  },
  { deep: true }
);
</script>
