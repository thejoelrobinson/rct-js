// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d678.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042db0f } from "./42db0f.js";
export function FUN_0042d678(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00743b98 = __sp + 0;
  try {
  let uVar1 = 0;
  uVar1 = heap.u32(0x0087c39a);
  while (uVar1 != 0xffff) {
    uVar1 = heap.u32((__addr_DAT_00743b98) + (uVar1 * 0x80) * 4);
    FUN_0042db0f(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
