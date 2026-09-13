// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a895.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045a895(heap) {
  let sVar1 = 0;
  let puVar2 = 0;
  puVar2 = ((0x0087f41c) >>> 0);
  sVar1 = ((0x400) & 0xffff);
  do {
    heap.setU32(puVar2, (0) & 0xffffffff);
    puVar2 = ((puVar2 + 0x20) >>> 0);
    sVar1 = ((sVar1 + -1) & 0xffff);
  } while (sVar1 != 0);
  return;
}
