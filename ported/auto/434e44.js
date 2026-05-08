// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434e44.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_00434e44(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_00434e98 = __sp + 0;
  try {
  let sVar2 = 0;
  let uVar3 = 0;
  let unaff_BX = 0;
  let unaff_ESI = 0;
  sVar2 = FUN_005e3ace(heap);
  if ((((unaff_ESI != 0) && (psVar1 = heap.u32((unaff_ESI + 8)), psVar1 != 0x0)) && (heap.u32(psVar1 + (2) * 4) <= sVar2)) && ((((sVar2 - heap.u32(psVar1 + (2) * 4)) < heap.u32(psVar1) && (heap.u32(psVar1 + (3) * 4) <= unaff_BX)) && ((unaff_BX - heap.u32(psVar1 + (3) * 4)) < heap.u32(psVar1 + (1) * 4))))) {
    uVar3 = (heap.u32(heap.u32((__addr_PTR_LAB_00434e98) + (heap.u32(0x00991f88)) * 4)))();
    return uVar3;
  }
  return 0x8000;
} finally {
    heap.freeFrame(4);
  }
}
