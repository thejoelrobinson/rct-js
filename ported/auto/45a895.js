// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a895.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0045a895(heap) {
  let sVar1 = 0;
  puVar2 = 0x0087f41c;
  sVar1 = 0x400;
  do {
    heap.u32(puVar2) = 0;
    puVar2 = puVar2 + 0x20;
    sVar1 = sVar1 + -1;
  } while (sVar1 != 0);
  return;
}
