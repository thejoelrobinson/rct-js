// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4413c5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { LOCK } from "../runtime/ghidra-builtins.js";
export function FUN_004413c5(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_0088751c = __sp + 0;
  const __addr_DAT_0088751b = __sp + 4;
  const __addr_DAT_0088751a = __sp + 8;
  const __addr_DAT_0088751d = __sp + 12;
  try {
  let bVar1 = 0;
  let unaff_BL = 0;
  let unaff_EDI = 0;
  heap.u32((__addr_DAT_0088751c) + (unaff_EDI) * 4) = heap.u32((__addr_DAT_0088751c) + (unaff_EDI) * 4) + unaff_BL;
  heap.u32((__addr_DAT_0088751b) + (unaff_EDI) * 4) = heap.u32((__addr_DAT_0088751b) + (unaff_EDI) * 4) + '\x01';
  if (0x13 < heap.u32((byte)(__addr_DAT_0088751b) + (unaff_EDI) * 4)) {
    LOCK();
    bVar1 = heap.u32((__addr_DAT_0088751c) + (unaff_EDI) * 4);
    heap.u32((__addr_DAT_0088751c) + (unaff_EDI) * 4) = 0;
    UNLOCK(heap);
    heap.u32((__addr_DAT_0088751a) + (unaff_EDI) * 4) = bVar1 >>> 2;
    heap.u32((__addr_DAT_0088751b) + (unaff_EDI) * 4) = 0;
    heap.u32((__addr_DAT_0088751d) + (unaff_EDI) * 4) = heap.u32((__addr_DAT_0088751d) + (unaff_EDI) * 4) | 1;
  }
  return;
} finally {
    heap.freeFrame(16);
  }
}
