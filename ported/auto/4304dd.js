// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4304dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_004304dd(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f8130 = __sp + 0;
  try {
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_005e3f31(heap);
    heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_005f8130;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 4;
    FUN_005e412c(heap);
    heap.u32((unaff_ESI + 0x15a)) = 0xffff;
    heap.u32((unaff_ESI + 0x15c)) = 0xffff;
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
