// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408b0b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FreeLibrary } from "../../runtime/win32.js";
export function FUN_00408b0b(heap) {
  if (heap.u32(0x005ebf2c) != 0x0) {
    FreeLibrary(heap, heap.u32(0x005ebf2c));
    heap.setU32(0x005ebf2c, (0x0) >>> 0);
    heap.setU32(0x005f0d60, (0) >>> 0);
    heap.setU32(0x005f0958, (0) >>> 0);
    heap.setU32(0x005f0eec, (0) >>> 0);
    if (heap.u32(0x005ebf30) != 0x0) {
      (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 8))))(heap.u32(0x005ebf30));
      heap.setU32(0x005ebf30, (0x0) >>> 0);
    }
  }
  return;
}
