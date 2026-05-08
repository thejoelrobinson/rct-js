// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45ac19.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0045ac6f } from "./45ac6f.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0045ac19(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_PTR_0064bc70 = __sp + 0;
  try {
  let uVar1 = 0;
  let extraout_CX = 0;
  uVar1 = heap.u32((heap.u32((__addr_PTR_PTR_0064bc70) + (heap.u32(0x008d7eaa)) * 4) + (heap.u32(0x006e3b80) & 7) * 4));
  FUN_005df40c(heap);
  heap.setU32(0x008d7eaf, (FUN_0045ac6f(heap)) >>> 0);
  heap.setU32(0x008d7eb1, (uVar1) >>> 0);
  heap.setU32(0x008d7eb3, ((uVar1 >>> 8)) >>> 0);
  heap.setU32(0x008d7eb5, (extraout_CX) >>> 0);
  heap.setU32(0x008d7eb7, ((extraout_CX >>> 8)) >>> 0);
  heap.setU32(0x008d7eac, (0x780) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
