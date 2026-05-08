// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e687d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004363f1 } from "./4363f1.js";
import { FUN_0043642b } from "./43642b.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005e687d(heap) {
  let uVar1 = 0;
  let unaff_ESI = 0;
  let uVar2 = 0;
  uVar1 = heap.u32(0x00991f30) >>> 3;
  heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xfffffff7) >>> 0);
  if ((uVar1 & 1) != 0) {
    FUN_004363f1(heap);
    FUN_0043642b(heap);
    heap.setU32(0x0099a020, (0) >>> 0);
    if (-1 < heap.u32(0x00991f5c)) {
      uVar2 = (heap.u32(0x00991f5a) | 0x80) == 0;
      FUN_005e5301(heap);
      FUN_005e3b2b(heap);
      if (!uVar2) {
        (heap.u32(heap.u32((unaff_ESI + 4))))();
      }
    }
  }
  return;
}
