// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406270.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ShowWindow } from "../../runtime/win32.js";
export function FUN_00406270(heap) {
  let bVar1 = 0;
  bVar1 = heap.u32(0x005e916c) != 0x0;
  if (bVar1) {
    ShowWindow(heap, heap.u32(0x005e916c), 5);
  }
  return bVar1;
}
