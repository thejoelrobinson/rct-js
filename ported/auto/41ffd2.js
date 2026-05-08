// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41ffd2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0041ffd2(heap) {
  let uVar1 = 0;
  uVar1 = heap.u32(0x008ae980);
  if (uVar1 != 0) {
    uVar1 = uVar1 + 10;
  }
  if (0x14 < uVar1) {
    uVar1 = 0x14;
  }
  return uVar1 * 0x28000 >>> 0x10;
}
