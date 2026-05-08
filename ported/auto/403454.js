// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403454.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00403454(heap, param_1) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005f1cc0 = __sp + 0;
  const __addr_DAT_005f1cc4 = __sp + 4;
  const __addr_DAT_005f1cc8 = __sp + 8;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  uVar2 = heap.u32(0x005e91e4) + 1 & 0x3f;
  if (uVar2 != heap.u32(0x005e91e8)) {
    iVar1 = heap.u32(0x005e91e4) * 0xc;
    heap.setU32((__addr_DAT_005f1cc0 + iVar1), (heap.u32(0x005f1cb4)) >>> 0);
    heap.setU32((__addr_DAT_005f1cc4 + iVar1), (heap.u32(0x005f1cb8)) >>> 0);
    heap.setU32((__addr_DAT_005f1cc8 + iVar1), (param_1) >>> 0);
    heap.setU32(0x005e91e4, (uVar2) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}
