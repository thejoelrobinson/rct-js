// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f8a9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042f6df } from "./42f6df.js";
export function FUN_0042f8a9(heap) {
  if (heap.u32(0x005f88ae) != '\0') {
    if (heap.u32(0x005f88ae) != '\x01') {
      if (heap.u32(0x005f88ae) != '\x02') {
        FUN_0042f6df(heap);
        do {
          FUN_0042f6df(heap);
          heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) + -1) >>> 0);
        } while (heap.u32(0x005f8d34) != '\0');
        heap.setU32(0x005f88ae, (0) >>> 0);
        return;
      }
      FUN_0042f6df(heap);
      FUN_0042f6df(heap);
      heap.setU32(0x005f88ae, (0) >>> 0);
      return;
    }
    FUN_0042f6df(heap);
    FUN_0042f6df(heap);
    heap.setU32(0x005f88ae, (heap.u32(0x005f88ae) + -1) >>> 0);
  }
  return;
}
