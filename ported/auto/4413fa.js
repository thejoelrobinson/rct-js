// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4413fa.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { LOCK } from "../runtime/ghidra-builtins.js";
export function FUN_004413fa(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_0088752a = __sp + 0;
  const __addr_DAT_00887529 = __sp + 4;
  const __addr_DAT_00887528 = __sp + 8;
  const __addr_DAT_0088751d = __sp + 12;
  try {
  let uVar1 = 0;
  let unaff_BL = 0;
  let unaff_EDI = 0;
  heap.u32((__addr_DAT_0088752a) + (unaff_EDI) * 4) = heap.u32((__addr_DAT_0088752a) + (unaff_EDI) * 4) + unaff_BL;
  heap.u32((__addr_DAT_00887529) + (unaff_EDI) * 4) = heap.u32((__addr_DAT_00887529) + (unaff_EDI) * 4) + '\x01';
  if (0x18 < heap.u32((byte)(__addr_DAT_00887529) + (unaff_EDI) * 4)) {
    LOCK();
    uVar1 = heap.u32((__addr_DAT_0088752a) + (unaff_EDI) * 4);
    heap.u32((__addr_DAT_0088752a) + (unaff_EDI) * 4) = 0;
    UNLOCK(heap);
    heap.u32((__addr_DAT_00887528) + (unaff_EDI) * 4) = uVar1;
    heap.u32((__addr_DAT_00887529) + (unaff_EDI) * 4) = 0;
    heap.u32((__addr_DAT_0088751d) + (unaff_EDI) * 4) = heap.u32((__addr_DAT_0088751d) + (unaff_EDI) * 4) | 1;
  }
  return;
} finally {
    heap.freeFrame(16);
  }
}
