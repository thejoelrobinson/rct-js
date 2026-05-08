// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d8ee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040d8ee(heap, param_1) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f03a0 = __sp + 0;
  const __addr_DAT_005f0500 = __sp + 4;
  try {
  let uVar1 = 0;
  if (heap.u32((__addr_DAT_005f03a0 + param_1 * 0x16c)) == 0) {
    uVar1 = 0;
  } else {
    if (heap.u32((__addr_DAT_005f0500 + param_1 * 0x16c)) == 0) {
    uVar1 = 1;
  } else {
    uVar1 = 0;
  }
  }
  return uVar1;
} finally {
    heap.freeFrame(8);
  }
}
