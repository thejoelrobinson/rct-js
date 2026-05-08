// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44e6d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044e6d3(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00631a00 = __sp + 0;
  try {
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_005e3c3c(heap);
    heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_00631a00;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x1dc;
    FUN_005e412c(heap);
    heap.u32((unaff_ESI + 0x158)) = 0;
    heap.u32((unaff_ESI + 0x159)) = 0xff;
    heap.u32((unaff_ESI + 0x168)) = 0;
  }
  heap.setU32(0x00631d54, (0) >>> 0);
  heap.u32((unaff_ESI + 0x16a)) = 0;
  return;
} finally {
    heap.freeFrame(4);
  }
}
