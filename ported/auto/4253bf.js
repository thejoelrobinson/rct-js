// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4253bf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_004253bf(heap) {
  let uVar2 = 0;
  let unaff_ESI = 0;
  let in_CF = 0;
  heap.setU32(0x005f494a, (heap.u32(0x005f494a) + -1) >>> 0);
  if ((heap.u32(0x005f494a) == '\0') && (FUN_005e68e2(heap), !in_CF)) {
    puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
    uVar2 = heap.u32(puVar1);
    heap.u32(puVar1) = heap.u32(puVar1) & 0xfdff;
    if ((uVar2 >>> 9 & 1) != 0) {
      FUN_005e43de(heap);
    }
  }
  return;
}
