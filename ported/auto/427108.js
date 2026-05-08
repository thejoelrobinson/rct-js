// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/427108.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_00427108(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f4ab4 = __sp + 0;
  try {
  let in_EAX = 0;
  let in_DX = 0;
  let unaff_BX = 0;
  let unaff_ESI = 0;
  heap.setU32(0x005f4a98, (heap.u32(0x00971e86)) >>> 0);
  heap.setU32(0x005f4a9c, (heap.u32(0x00971e8a)) >>> 0);
  heap.setU32(0x005f4aa0, (heap.u32(0x00971e8e)) >>> 0);
  heap.setU32(0x005f4aa4, (heap.u32(0x00971e92)) >>> 0);
  heap.setU32(0x005f4aa8, (heap.u32(0x00971e96)) >>> 0);
  heap.setU32(0x005f4aac, (4) >>> 0);
  heap.setU32(0x005f4a94, (unaff_BX) >>> 0);
  heap.setU32(0x005f4a96, (in_DX) >>> 0);
  FUN_005e5b80(heap);
  FUN_005e3f31(heap);
  heap.setU32((unaff_ESI + 0x1c), (__addr_DAT_005f4ab4) >>> 0);
  heap.setU32((unaff_ESI + 0x32), (heap.u32((unaff_ESI + 0x32)) | 0x10) >>> 0);
  heap.setU32((unaff_ESI + 0x15a), (0) >>> 0);
  return in_EAX;
} finally {
    heap.freeFrame(4);
  }
}
