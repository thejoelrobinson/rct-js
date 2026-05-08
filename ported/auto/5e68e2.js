// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e68e2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e68e2(heap) {
  let in_AX = 0;
  puVar1 = 0x009a013c;
  while (true) {
    if (heap.u32(0x009a1164) <= puVar1) {
      return in_AX;
    }
    if (heap.u32(puVar1 + (0x174) * 4) == '\0') {
      break;
    }
    puVar1 = puVar1 + 0x178;
  }
  return in_AX;
}
