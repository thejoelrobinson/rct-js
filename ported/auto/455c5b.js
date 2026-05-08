// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/455c5b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00455a66 } from "./455a66.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_00455c5b(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00632b40 = __sp + 0;
  try {
  let in_AX = 0;
  let unaff_ESI = 0;
  FUN_005e3c3c(heap);
  heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_00632b40;
  heap.u32((unaff_ESI + 0xc)) = heap.u32(0x00632db0);
  heap.u32((unaff_ESI + 0x30)) = in_AX;
  heap.u32((unaff_ESI + 0x164)) = 0;
  heap.u32((unaff_ESI + 0x15c)) = 0;
  heap.u32((unaff_ESI + 0x168)) = 0;
  FUN_00455a66(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
