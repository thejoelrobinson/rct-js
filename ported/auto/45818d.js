// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45818d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004429db } from "./4429db.js";
export function FUN_0045818d(heap) {
  let uVar1 = 0;
  heap.setU32(0x0099c163, (heap.u32(0x008d7ea4)) >>> 0);
  for (uVar1 = heap.u32(0x0087c398); uVar1 != 0xffff; uVar1 = heap.u32((0x00743b98) + (uVar1 * 0x80) * 4)) {
    if (heap.u32((0x00743bc2) + (uVar1 * 0x100) * 4) == '\x01') {
      heap.setU32(0x0099c167, (0x28) >>> 0);
      FUN_004429db(heap);
    }
  }
  return;
}
