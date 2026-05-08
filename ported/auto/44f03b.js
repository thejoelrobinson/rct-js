// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f03b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_0044f03b(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00631d0d = __sp + 0;
  const __addr_DAT_005f5d05 = __sp + 4;
  try {
  let uVar1 = 0;
  let unaff_ESI = 0;
  let bVar2 = 0;
  bVar2 = true;
  uVar1 = FUN_005e3b2b(heap);
  if (!bVar2) {
    heap.setU32(((__addr_DAT_00631d0d) + (heap.u32((__addr_DAT_005f5d05) + ((uVar1 & 0xff) * 8) * 4)) * 4), (uVar1) >>> 0);
    (heap.u32(heap.u32((unaff_ESI + 4))))();
  }
  return uVar1;
} finally {
    heap.freeFrame(8);
  }
}
