// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42cc19.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042cc5f } from "./42cc5f.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0042cc19(heap) {
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_005e3c3c(heap);
    heap.u32((unaff_ESI + 0x1c)) = 0x005f54a4;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 4;
    FUN_005e412c(heap);
    heap.u32((unaff_ESI + 0x15a)) = 0xffff;
  }
  FUN_0042cc5f(heap);
  return;
}
