// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/401200.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { MessageBoxA } from "../../runtime/win32.js";
export function FUN_00401200(heap) {
  return MessageBoxA(heap, heap.u32(0x005e916c), 0x005e90dc, 0x005e90f4, 0);
}
