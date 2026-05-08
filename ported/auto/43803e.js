// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43803e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0043803e(heap) {
  let iVar1 = 0;
  let puVar2 = 0;
  iVar1 = 0x4000;
  puVar2 = heap.u32(0x00628c44);
  do {
    heap.setU32(puVar2, (0xa0a0a0a) >>> 0);
    puVar2 = puVar2 + 1;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  heap.setU32(0x00628c48, (0) >>> 0);
  return;
}
