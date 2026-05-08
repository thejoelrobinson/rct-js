// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4141e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00414300 } from "./414300.js";
export function FUN_004141e0(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_005e9008 = __sp + 0;
  const __addr_DAT_005e9010 = __sp + 4;
  const __addr_DAT_005e9000 = __sp + 8;
  const __addr_DAT_005e9004 = __sp + 12;
  try {
  if (heap.u32(0x005ec288) != 0x0) {
    (heap.u32(heap.u32(0x005ec288)))();
  }
  FUN_00414300(heap, __addr_DAT_005e9008, __addr_DAT_005e9010);
  FUN_00414300(heap, __addr_DAT_005e9000, __addr_DAT_005e9004);
  return;
} finally {
    heap.freeFrame(16);
  }
}
