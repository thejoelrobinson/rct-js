// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d74b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005d94b6 } from "./5d94b6.js";
export function FUN_005d74b4(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = ((uint)(0x0070093a - heap.u32(0x0087c3b4)) >>> 5 | (0x0070093a - heap.u32(0x0087c3b4)) * 0x8000000) - heap.u32(0x0087c3b8);
  uVar1 = (uVar1 >>> 7 | uVar1 * 0x2000000) + heap.u32(0x0087d0c8);
  uVar2 = heap.u32(0x0087c396);
  if ((uVar1 >>> 3 | uVar1 * 0x20000000) == heap.u32(0x0087d79c)) {
    while (uVar2 != 0xffff) {
      uVar2 = heap.u32((0x00743b98) + (uVar2 * 0x80) * 4);
      FUN_005d94b6(heap);
    }
  }
  return;
}
