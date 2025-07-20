import { storeToRefs } from "pinia";
import { store } from "../stores";
import { create } from "./bace";

export default (e: KeyboardEvent) => {
  const { blockes, table ,createFlag,renderFlag} = storeToRefs(store());
  for(const blo of blockes.value){
    blo.sync("position")
  }
  for (let i = 0; i <= 15; i++) {
    //移动与合并
    switch (e.key.toLowerCase()) {
      case "arrowup":
      case "w":
        table.value[0][i % 4].move("top",{x:0,y:-1},"bottom");
        break;
      case "arrowdown":
      case "s":
        table.value[3][i % 4].move("bottom",{x:0,y:1},"top");
        break;
      case "arrowleft":
      case "a":
        table.value[i % 4][0].move("left",{x:-1,y:0},"right");
        break;
      case "arrowright":
      case "d":
        table.value[i % 4][3].move("right",{x:1,y:0},"left");
        break;
      default:
        createFlag.value=false;
        break
    }
  }
  if (createFlag.value) {
    for (const block of blockes.value) {
      if (!block.num) {
        create(block);
        break;
      }
    }
    createFlag.value=false;
  };
  renderFlag.value=!renderFlag.value
};