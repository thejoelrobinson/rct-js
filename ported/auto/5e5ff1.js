// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5ff1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e69bd } from "./5e69bd.js";
export function FUN_005e5ff1(heap) {
  let uVar1 = 0;
  heap.setU32(0x009a1618, (heap.u32(0x009a1618) + 1) >>> 0);
  heap.setU32(0x00991f54, (heap.u32(0x00991f54) + heap.u32(0x00999f98)) >>> 0);
  uVar1 = heap.u32(0x009a1164);
  while (0x9a013b < uVar1 - 0x178) {
    (heap.u32(heap.u32((uVar1 - 0x174))))();
    uVar1 = uVar1 - 0x178;
  }
  FUN_005e69bd(heap);
  return;
}
