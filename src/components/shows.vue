<style scoped>
#sd div {
  background-color: #beb1a0;
  width: 80px;
  height: 50%;
  font-size: large;
}
#sd {
  margin-top: 10px;
  margin-left: 10px;
  float: right;
  border: #857c71 solid 2px;
  border-radius: 3px;
}
</style>

<template>
  <div id="sd">
    <div>{{ props.name }}</div>
    <div ref="value">{{ Math.floor(num.value) }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { store } from "../stores";
const value = ref<HTMLElement>();
const { blockes, renderFlag } = storeToRefs(store());
const props = defineProps<{
  name: "分数" | "最高数";
}>();
let values = ref(0);
let score=0
watch(renderFlag, () => {
  let max = 0;
  for (const blo of blockes.value) {
    if (blo.num > max) max = blo.num;
    if (blo.del) score += blo.mergeNum;
  }
  values.value = props.name == "分数" ? score : max;
});
let num = reactive({
  value: 0,
});
watch(
  values,
  (newValue) => {
    gsap.to(num, {
      value: newValue,
      ease: "power1.out",
      duration: 0.7,
    });
  }
);
</script>
