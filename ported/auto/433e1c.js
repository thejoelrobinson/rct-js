// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433e1c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_009b438b } from "./9b438b.js";
export function FUN_00433e1c(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  iVar1 = heap.u32(0x005f96e4);
  while (iVar1 = heap.u32((iVar1 + 0x20)), iVar2 = iVar1, iVar1 != 0) {
    for (; FUN_009b438b(heap), heap.u32((iVar2 + 0x1c)) != 0; iVar2 = heap.u32((iVar2 + 0x1c))) {
    
    }
    for (iVar2 = heap.u32((iVar2 + 0x18)); iVar2 != 0; iVar2 = heap.u32((iVar2 + 8))) {
      FUN_009b438b(heap);
    }
  }
  return;
}
