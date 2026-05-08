// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/454520.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004575af } from "./4575af.js";
export function FUN_00454520(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_008d7e2a = __sp + 0;
  try {
  let uVar1 = 0;
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_008d7e2a) + (uVar1) * 4) = 0;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x74);
  do {
    heap.u32((__addr_DAT_008d7e2a) + (uVar1) * 4) = 1;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x78);
  FUN_004575af(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
