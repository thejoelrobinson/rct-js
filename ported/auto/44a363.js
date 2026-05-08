// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a363.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044a363(heap) {
  let uVar1 = 0;
  heap.setU32(0x00631d0c, (0) >>> 0);
  uVar1 = 0;
  do {
    heap.u32((0x00631d0d) + (uVar1) * 4) = 0xff;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 6);
  heap.setU32(0x00631d54, (0) >>> 0);
  return;
}
