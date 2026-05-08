// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4151d0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00415210 } from "./415210.js";
export function FUN_004151d0(heap) {
  if ((heap.u32(0x005efeb4) == 1) || ((heap.u32(0x005efeb4) == 0 && (heap.u32(0x005ec264) == 1)))) {
    FUN_00415210(heap, 0xfc);
    if (heap.u32(0x005f0240) != 0x0) {
      (heap.u32(heap.u32(0x005f0240)))();
    }
    FUN_00415210(heap, 0xff);
  }
  return;
}
