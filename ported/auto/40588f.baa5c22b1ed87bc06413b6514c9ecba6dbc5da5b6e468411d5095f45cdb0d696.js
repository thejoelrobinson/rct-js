// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40588f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetWindowPos } from "../../runtime/win32.js";
export function FUN_0040588f(heap) {
  return SetWindowPos(heap, heap.u32(0x005e916c), ((0xfffffffe) | 0), 0, 0, 0, 0, 3);
}
