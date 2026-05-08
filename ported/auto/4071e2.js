// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4071e2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0040704d } from "./40704d.js";
export function FUN_004071e2(heap) {
  let iVar1 = 0;
  heap.setU32(0x005ebee8, (0) >>> 0);
  if (heap.u32(0x005ebf00) != 0x0) {
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf00)) + 0x24))))(heap.u32(0x005ebf00), 0x100, 0x005f1180);
    if (iVar1 == 0) {
      heap.setU32(0x005ebee8, (1) >>> 0);
    } else {
      if ((iVar1 == -0x7ff8ffe2) || (iVar1 == -0x7ff8fff4)) {
      FUN_0040704d(heap);
    }
    }
  }
  return heap.u32(0x005ebee8);
}
