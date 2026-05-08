// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408d19.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408c1c } from "./408c1c.js";
export function FUN_00408d19(heap, param_1) {
  let iVar1 = 0;
  heap.setU32(0x005f0954, (param_1) >>> 0);
  iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x20))))(heap.u32(0x005ebf30), 0, 0, 0, FUN_00408c1c);
  if (iVar1 == 0) {
    iVar1 = param_1 + heap.u32(0x005ebf58);
  }
  return iVar1;
}
