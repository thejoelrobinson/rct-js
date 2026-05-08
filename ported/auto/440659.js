// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440659.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00440659(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_006291b0 = __sp + 0;
  try {
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_005e3c3c(heap);
    heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_006291b0;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 500;
    FUN_005e412c(heap);
    heap.setU32(0x0062d2fc, (0xffff) >>> 0);
    heap.u32((unaff_ESI + 0x16a)) = 0;
    heap.setU32(0x0062d2fe, (0) >>> 0);
    heap.setU32(0x0062d2fa, (0xff) >>> 0);
    heap.u32((unaff_ESI + 0x16c)) = 0;
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
