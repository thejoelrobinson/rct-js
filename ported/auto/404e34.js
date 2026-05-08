// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404e34.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004049f2 } from "./4049f2.js";
export function FUN_00404e34(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_local_18 = __sp + 0;
  try {
  FUN_004049f2(heap, __addr_local_18);
  if ((heap.u32(__addr_local_18) & 0xffff) < heap.u32(0x005f1cac) + heap.u32(0x005f15c4)) {
    heap.setU32(0x005f18e0, ((heap.u32(__addr_local_18) & 0xffff) - heap.u32(0x005f1cac)) >>> 0);
  } else {
    heap.setU32(0x005f18e0, (heap.u32(0x005f15c4)) >>> 0);
  }
  if (heap.u32(0x005f1cac) < 0) {
    heap.setU32(0x005f13a4, (0) >>> 0);
    heap.setU32(0x005f1fc4, (-heap.u32(0x005f1cac)) >>> 0);
    heap.setU32(0x005f18e0, (heap.u32(0x005f18e0) + heap.u32(0x005f1cac)) >>> 0);
  } else {
    heap.setU32(0x005f13a4, (heap.u32(0x005f1cac)) >>> 0);
    heap.setU32(0x005f1fc4, (0) >>> 0);
  }
  if ((((heap.u32(__addr_local_18)) >>> 16) & 0xffff) < heap.u32(0x005f1cb0) + heap.u32(0x005f1b34)) {
    heap.setU32(0x005f1b24, ((((heap.u32(__addr_local_18)) >>> 16) & 0xffff) - heap.u32(0x005f1cb0)) >>> 0);
  } else {
    heap.setU32(0x005f1b24, (heap.u32(0x005f1b34)) >>> 0);
  }
  if (heap.u32(0x005f1cb0) < 0) {
    heap.setU32(0x005f13ac, (0) >>> 0);
    heap.setU32(0x005f1a08, (-heap.u32(0x005f1cb0)) >>> 0);
    heap.setU32(0x005f1b24, (heap.u32(0x005f1b24) + heap.u32(0x005f1cb0)) >>> 0);
  } else {
    heap.setU32(0x005f13ac, (heap.u32(0x005f1cb0)) >>> 0);
    heap.setU32(0x005f1a08, (0) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
