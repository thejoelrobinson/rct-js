// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434fbb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0043424f } from "./43424f.js";
export function FUN_00434fbb(heap) {
  let uVar1 = 0;
  uVar1 = FUN_0043424f(heap);
  if (uVar1 != 0x8000) {
    uVar1 = uVar1 & 0xffe0;
  }
  return uVar1;
}
