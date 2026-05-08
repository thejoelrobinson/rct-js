// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43115d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004310fa } from "./4310fa.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_0043115d(heap) {
  let unaff_ESI = 0;
  FUN_005e3c3c(heap);
  heap.u32((unaff_ESI + 0x1c)) = 0x005f94e0;
  heap.u32((unaff_ESI + 0xc)) = heap.u32(0x005f9690);
  heap.u32((unaff_ESI + 0x30)) = 0;
  heap.u32((unaff_ESI + 0x164)) = 0;
  heap.u32((unaff_ESI + 0x168)) = 0;
  FUN_004310fa(heap);
  return;
}
