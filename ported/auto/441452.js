// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441452.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00441452(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_0088752b = __sp + 0;
  const __addr_DAT_0088751d = __sp + 4;
  try {
  let in_EAX = 0;
  let iVar1 = 0;
  let unaff_ESI = 0;
  if (heap.u32((unaff_ESI + 0x2e)) == '\0') {
    FUN_005e5301(heap);
    if ((heap.u32((unaff_ESI + 0x2b)) == '\x03') || (heap.u32((unaff_ESI + 0x2b)) == '\a')) {
      iVar1 = heap.u32((unaff_ESI + 0x68)) * 0x260;
      heap.setU32(((__addr_DAT_0088752b) + (iVar1) * 4), (heap.u32((__addr_DAT_0088752b) + (iVar1) * 4) + '\x01') >>> 0);
      heap.setU32(((__addr_DAT_0088751d) + (iVar1) * 4), (heap.u32((__addr_DAT_0088751d) + (iVar1) * 4) | 0xc) >>> 0);
    }
    FUN_005e5301(heap);
    return in_EAX;
  }
  FUN_005e5301(heap);
  FUN_005e5301(heap);
  return in_EAX;
} finally {
    heap.freeFrame(8);
  }
}
