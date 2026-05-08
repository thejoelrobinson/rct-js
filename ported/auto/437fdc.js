// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/437fdc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00404656 } from "./404656.js";
import { FUN_0043803e } from "./43803e.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00437fdc(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00628a50 = __sp + 0;
  try {
  let iVar1 = 0;
  let unaff_ESI = 0;
  let bVar2 = 0;
  bVar2 = true;
  FUN_005e5fcb(heap);
  if (bVar2) {
    iVar1 = FUN_00404656(heap, 0x10000, 0);
    if (iVar1 == 0) {
      return;
    }
    heap.setU32(0x00628c44, (iVar1) >>> 0);
    FUN_005e3c3c(heap);
    heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_00628a50;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 4;
    FUN_005e412c(heap);
    heap.u32((unaff_ESI + 0x15a)) = heap.u32(0x00991f88);
    FUN_0043803e(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
