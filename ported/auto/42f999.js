// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f999.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042f91e } from "./42f91e.js";
export function FUN_0042f999(heap) {
  let uVar1 = 0;
  if (heap.u32(0x005f88ae) != '\0') {
    if (heap.u32(0x005f88ae) < '\0') {
      if (heap.u32(0x005f8d34) != '\0') {
        heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) + -1) >>> 0);
        return heap.u32(0x005f8cb4);
      }
    } else {
      if (heap.u32(0x005f8d34) != '\0') {
      heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) + -1) >>> 0);
      uVar1 = FUN_0042f91e(heap);
      return uVar1;
    }
    }
  }
  heap.setU32(0x005f8d34, (FUN_0042f91e(heap)) >>> 0);
  if (-1 < heap.u32(0x005f8d34)) {
    heap.setU32(0x005f88ae, (1) >>> 0);
    uVar1 = FUN_0042f91e(heap);
    return uVar1;
  }
  heap.setU32(0x005f88ae, (0xff) >>> 0);
  heap.setU32(0x005f8d34, (-heap.u32(0x005f8d34)) >>> 0);
  heap.setU32(0x005f8cb4, (FUN_0042f91e(heap)) >>> 0);
  return heap.u32(0x005f8cb4);
}
