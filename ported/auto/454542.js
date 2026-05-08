// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/454542.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00454542(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00632dc8 = __sp + 0;
  try {
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_005e3c3c(heap);
    heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_00632dc8;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x3ef4;
    FUN_005e412c(heap);
    heap.setU32(0x00632f00, (0xffff) >>> 0);
    heap.u32((unaff_ESI + 0x16a)) = 0;
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
