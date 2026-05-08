// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403454.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00403454(heap, param_1) {
  let iVar1 = 0;
  let uVar2 = 0;
  uVar2 = heap.u32(0x005e91e4) + 1 & 0x3f;
  if (uVar2 != heap.u32(0x005e91e8)) {
    iVar1 = heap.u32(0x005e91e4) * 0xc;
    heap.u32((0x005f1cc0 + iVar1)) = heap.u32(0x005f1cb4);
    heap.u32((0x005f1cc4 + iVar1)) = heap.u32(0x005f1cb8);
    heap.u32((0x005f1cc8 + iVar1)) = param_1;
    heap.setU32(0x005e91e4, (uVar2) >>> 0);
  }
  return;
}
