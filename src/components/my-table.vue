<style scoped>
.buttom {
  position: absolute;
  padding: 0px 0px;
  border: #857c71 solid 2px;
  border-radius: 8px;
  z-index: 0;
  width: 80px;
  height: 80px;
  left: 0px;
  top: 0px;
}
</style>

<template>
  <div v-for="obj in arr" :key="obj.id" ref="block" class="buttom"></div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { store } from '../stores';
const { renderFlag } = storeToRefs(store());
const block = ref<HTMLElement[]>([]);
const arr = Array.from({ length: 16 }, (_, index) => ({
  id: index, 
  x: index % 4,
  y: Math.floor(index / 4),
  show(delay: number) {
    const self = block.value[this.id];
    const deltaX = this.x <= 1 ? 37 : -37;
    const deltaY = this.y <= 1 ? 37 : -37;
    gsap.fromTo(
      self,
      {
        x: this.x * 95 + 12 + deltaX,
        y: this.y * 95 + 12 + deltaY,
        opacity:-0.5,
        scale: 0,
      },
      {
        x: this.x * 95 + 12,
        y: this.y * 95 + 12,
        opacity:1,
        scale: 1,
        duration: 0.8,
        delay: delay,
      }
    )
  },
  shows(){
    const self = block.value[this.id];
    gsap.to(self,{
        backgroundColor:"#cdc1b4",
        boxShadow:"inset -2px -2px 0 rgba(255, 255, 255, 0.4),inset 2px 2px 0 rgba(0, 0, 0, 0.3)",
        duration:1.5,
        ease: "power1.out",
        delay:1.2
      }).then(()=>renderFlag.value=!renderFlag.value)
  }
}));
const animate = [
  [5, 6, 9, 10],
  [1, 2, 4, 8, 13, 14, 7, 11],
  [0, 3, 12, 15],
];
const main = () => {
    animate.forEach((arrs, delay) => {
      arrs.forEach((index) => {
        arr[index].show(delay * 0.17+0.3)
        arr[index].shows();
      });
    });
};
onMounted(main);
</script>
