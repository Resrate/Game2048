<style scoped>
* {
  position: absolute;
  text-align: center;
  width: 100%;
  height: auto;
  z-index: 30;
  color: rgba(255, 255, 255, 0.65);
  font-size: 200%;
}
#white {
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
}
#win {
  font-family: "楷体";
  font-size: 500%;
  top: 10%;
}
#time {
  top: 55%;
}
#tick {
  top: 63%;
}
</style>

<template>
  <Transition @enter="obj.white.animate">
    <div id="white" v-if="obj.white.show">&nbsp;</div>
  </Transition>
  <Transition @enter="obj.win.animate">
    <div id="win" v-show="obj.white.show">
      <h1>{{ result }}</h1>
    </div>
  </Transition>
  <Transition @enter="obj.time.animate">
    <div id="time" v-show="obj.white.show">
      最高数:{{ Math.floor(max.value) }}, 分数：{{ Math.floor(score.value) }}
    </div>
  </Transition>
  <Transition @enter="obj.tick.animate">
    <div id="tick" v-show="obj.white.show" @click="f5">
      单击此处即可重新开始游戏
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { store } from "../stores";

const { blockes, renderFlag, table } = storeToRefs(store());
const f5 = () => {
  location.replace(location.href);
};
let maxs = 0,
  scores = 0,
  result = ref("失败" as "失败" | "胜利"),
  show = ref(false),
  flag = true;
watch(renderFlag, () => {
  (flag = true), (maxs = 0), (result.value = "失败" as "失败" | "胜利");
  for (const blo of blockes.value) {
    if (blo.num > maxs) maxs = blo.num;
    if (blo.del) scores += blo.mergeNum;
  }
  a: for (let y = 0; y <= 3; y++) {
    for (let x = 0; x <= 3; x++) {
      const block = table.value[y][x];
      if (block.checkWin() === true) {
        result.value = "胜利";
        show.value = true;
        break a;
      }
      if (block.checkFalse() === false) {
        flag = false;
        break a;
      }
    }
  }
  if (flag) {
    result.value = "失败";
    show.value = true;
  }
});

const max = reactive({ value: 0 }),
  score = reactive({ value: 0 });
type GSAPTweenTarget = string | Element | Element[] | object;
const obj = reactive({
  white: {
    show: ref(false),
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      gsap.from(vDom, {
        opacity: 0,
        duration: 1,
        onComplete: done,
      });
    },
  },
  win: {
    show: ref(false),
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      gsap.from(vDom, {
        opacity: 0,
        duration: 2,
        y: -1000,
        ease: "bounce.out",
        onComplete: done,
      });
    },
  },
  time: {
    show: ref(false),
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      gsap.from(vDom, {
        opacity: 0,
        y: window.innerHeight,
        duration: 0.7,
        onComplete: done,
      });
      gsap.to(max, {
        duration: 2.3,
        ease: "power1.out",
        value: maxs,
      });
      gsap.to(score, {
        duration: 2.3,
        ease: "power1.out",
        value: scores,
      });
    },
  },
  tick: {
    show: ref(false),
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      gsap.from(vDom, {
        opacity: 0,
        duration: 4,
        ease: "power4.in",
        onComplete: done,
      });
    },
  },
});
watch(show, (s) => {
  obj.white.show = s;
  obj.win.show = s;
  // await timmer(1000);
  obj.time.show = s;
  // await timmer(1000);
  obj.tick.show = s;
});
</script>
