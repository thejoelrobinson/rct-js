// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5fcb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5c36 } from "./5e5c36.js";
export function FUN_005e5fcb(heap) {
  let uVar1 = 0;
  let unaff_ESI = 0;
  let in_ZF = 0;
  uVar1 = FUN_005e3b2b(heap);
  if (!in_ZF) {
    heap.u32((unaff_ESI + 0x32)) = heap.u32((unaff_ESI + 0x32)) | 0x600;
    FUN_005e43de(heap);
    FUN_005e5c36(heap);
  }
  return uVar1;
}
