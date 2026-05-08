// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df40c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005df40c(heap) {
  let uVar1 = 0;
  uVar1 = heap.u32(0x006e3b88);
  heap.setU32(0x006e3b88, (heap.u32(0x006e3b88) + ((heap.u32(0x006e3b8c) ^ 0x1234567f) >>> 7 | (heap.u32(0x006e3b8c) ^ 0x1234567f) << 0x19)) >>> 0);
  heap.setU32(0x006e3b8c, (uVar1 >>> 3 | uVar1 << 0x1d) >>> 0);
  return;
}
