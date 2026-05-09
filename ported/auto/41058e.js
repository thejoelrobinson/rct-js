// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41058e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { BitBlt } from "../../runtime/win32.js";
export function FUN_0041058e(heap, param_1, param_2) {
  let bVar1 = 0;
  bVar1 = ((heap.u32(0x005ec0e4) != ((0x0) >>> 0)) & 0xff);
  if (bVar1) {
    BitBlt(heap, heap.u32(0x005ec0e4), heap.u32(param_2), heap.u32(param_2 + (1) * 4), heap.u32(param_2 + (2) * 4) - heap.u32(param_2), heap.u32(param_2 + (3) * 4) - heap.u32(param_2 + (1) * 4), heap.u32(0x005ec0e8), heap.u32(param_1), heap.u32(param_1 + (1) * 4), 0xcc0020);
  }
  return bVar1;
}
