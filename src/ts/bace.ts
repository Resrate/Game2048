import { storeToRefs } from "pinia";
import { store } from "../stores";
import gsap from "gsap";

type Pos = "left" | "right" | "top" | "bottom";
export class Block {
  constructor(
    public num = 0,
    public form = { x: 0, y: 0 },
    public to = { x: 0, y: 0 },
    public del = false,
    public merge = false,
    public create = false,
    public mergeBlock = null as null | Block,
    public mergeNum = 0,
    public tl = null as null | GSAPTimeline 
  ) {}
  get positionForm() {
    return {
      x: this.form.x * 95 + 13,
      y: this.form.y * 95 + 13,
    };
  }
  get positionTo() {
    return {
      x: this.to.x * 95 + 13,
      y: this.to.y * 95 + 13,
      duration: 0.25, //时间
    };
  }
  move(delta: { x: number; y: number }) {
    this.to.x += delta.x;
    this.to.y += delta.y;
    if (this.mergeBlock) {
      this.mergeBlock.to.x = this.to.x;
      this.mergeBlock.to.y = this.to.y;
    }
  }
  animation(dom: HTMLElement) {
    this.tl?.kill();
    const tl = gsap.timeline();
    this.tl = tl;
    tl.add(gsap.set(dom, { scale: 1 }));
    tl.add(gsap.fromTo(dom, this.positionForm, this.positionTo), "<");
    if (this.merge == true) {
      tl.add(
        gsap.to(dom, {
          scale: 1.1,
          duration: 0.1,
          onStart: () => {
            this.num = this.mergeNum;
          },
        })
      );
      tl.add(gsap.to(dom, { scale: 1, duration: 0.1 }));
    }
    if (this.create) {
      this.num=this.mergeNum
      this.create = false;
      tl.add(gsap.from(dom, { scale: 0, duration: 0.2 }));
    }
  }
  sync(value: "position" | "number") {
    if (value == "position") {
      this.form.x = this.to.x;
      this.form.y = this.to.y;
      this.merge = false;
      this.mergeBlock = null;
      this.num = this.mergeNum;
      if (this.del) {
        this.mergeNum = this.num = 0;
      }
    }
  }
}
export class TableBlock {
  constructor(
    public block = null as Block | null,
    public next = {
      top: undefined as undefined | TableBlock,
      left: undefined as undefined | TableBlock,
      right: undefined as undefined | TableBlock,
      bottom: undefined as undefined | TableBlock,
    }
  ) {}
  move(direc: Pos, delta: { x: number; y: number }, nexts: Pos) {
    const self = this.block;
    const target = this.next[direc];
    const { createFlag } = storeToRefs(store());
    if (target === undefined) {
      this.next[nexts]?.move(direc, delta, nexts);
    } else if (self === null) {
      this.next[nexts]?.move(direc, delta, nexts);
    } else if (target.block === null) {
      self.move(delta);
      createFlag.value = true;
      target.block = self;
      this.block = null;
    } else if (
      target.block.mergeNum == self.mergeNum &&
      self.merge == false &&
      target.block.merge == false
    ) {
      self.move(delta);
      createFlag.value = true;
      self.del = true;
      target.block.mergeBlock = self;
      self.merge = target.block.merge = true;
      target.block.mergeNum *= 2;
      this.block = null;
    } else {
      this.next[nexts]?.move(direc, delta, nexts);
      console.log("next");
    }
  }
  checkWin() {
    if (this.block?.mergeNum == 2048) return true;
  }
  checkFalse() {
    if (this.block === null) return false;
    for (const index of ["left", "top", "right", "bottom"] as Pos[]) {
      if (this.next[index] === undefined) continue;
      if (this.block.mergeNum == this.next[index].block?.mergeNum) return false;
    }
    return true;
  }
}
export const create = (block: Block) => {
  while (true) {
    const { table } = storeToRefs(store());
    const newX = Math.floor(Math.random() * 4);
    const newY = Math.floor(Math.random() * 4);
    if (table.value[newY][newX].block === null) {
      table.value[newY][newX].block = block;
      block.create = true;
      block.del = false;
      block.mergeNum = block.num = 2;
      block.form.x = block.to.x = newX;
      block.to.y = block.form.y = newY;
      break;
    }
  }
};
export const start = () => {
  const { blockes, table} = storeToRefs(store());
  blockes.value = Array.from({ length: 16 }, () => new Block());
  table.value = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => new TableBlock())
  );
  create(blockes.value[0])
  blockes.value[0].num=0
  for (let y = 0; y <= 3; y++) {
    for (let x = 0; x <= 3; x++) {
      const n = table.value[y][x].next;
      n.top = table.value[y - 1]?.[x];
      n.bottom = table.value[y + 1]?.[x];
      n.left = table.value[y]?.[x - 1];
      n.right = table.value[y]?.[x + 1];
    }
  }
};
