// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5de5a7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00424db7 } from "./424db7.js";
import { FUN_005dde9c } from "./5dde9c.js";
import { FUN_005ded48 } from "./5ded48.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_005de5a7(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_006e1d40 = __sp + 0;
  try {
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_005dde9c(heap);
    FUN_005e3c3c(heap);
    heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_006e1d40;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x2fff4;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x3c0000;
    FUN_005e412c(heap);
    FUN_005ded48(heap);
    FUN_00424db7(heap);
    heap.setU32(0x006e1ec3, (2) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
