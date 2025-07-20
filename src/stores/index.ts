import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Block, TableBlock } from '../ts/bace';

export const store=defineStore('2048',()=>{
  const blockes=ref([] as Block[]);
  const table=ref([] as TableBlock[][]);
  const renderFlag=ref(false);
  const createFlag=ref(true);
  return {blockes,table,renderFlag,createFlag};
})