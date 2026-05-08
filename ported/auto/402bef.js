// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402bef.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040473c } from "./40473c.js";
export function FUN_00402bef(heap) {
  if (heap.u32(0x005e9160) != 0) {
    heap.setU32(0x005eee80, (heap.u32(0x005e9118)) >>> 0);
    heap.setU32(0x005eee88, (0) >>> 0);
    heap.setU32(0x005eee84, (-1) >>> 0);
    heap.setU32(0x005e9124, (0) >>> 0);
    heap.setU32(0x005e9160, (0) >>> 0);
  }
  heap.setU32(0x005e9110, (FUN_0040473c(heap)) >>> 0);
  heap.setU32(0x005e9114, (heap.u32(0x005e9110) - heap.u32(0x005eee80)) >>> 0);
  heap.setU32(0x005e911c, (heap.u32(0x005e9110) - heap.u32(0x005e9118)) >>> 0);
  if (heap.u32(0x005e9114) == 0) {
    heap.setU32(0x005e9120, (1000) >>> 0);
  } else {
    heap.setU32(0x005e9120, ((undefined4)(1000 / heap.u32(0x005e9114))) >>> 0);
  }
  heap.setU32(0x005eee80, (heap.u32(0x005e9110)) >>> 0);
  heap.setU32(0x005eee88, (heap.u32(0x005eee88) + heap.u32(0x005e9114)) >>> 0);
  heap.setU32(0x005eee84, (heap.u32(0x005eee84) + 1) >>> 0);
  if (999 < heap.u32(0x005eee88)) {
    heap.setU32(0x005eee88, (heap.u32(0x005eee88) - 1000) >>> 0);
    heap.setU32(0x005e9124, (heap.u32(0x005eee84)) >>> 0);
    heap.setU32(0x005eee84, (0) >>> 0);
  }
  return;
}
