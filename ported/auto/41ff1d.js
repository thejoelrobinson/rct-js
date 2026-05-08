// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41ff1d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0041ff1d(heap) {
  let uVar1 = 0;
  let unaff_EDI = 0;
  uVar1 = heap.u32((unaff_EDI + 0xce)) & 0x1f;
  if (0xb < uVar1) {
    uVar1 = 0xb;
  }
  return uVar1 * 0xbd174 >>> 0x10;
}
