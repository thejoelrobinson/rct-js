// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/431b6f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00431b6f(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_006284ec = __sp + 0;
  try {
  let iVar1 = 0;
  let unaff_EBP = 0;
  heap.setU32(0x00628928, (0) >>> 0);
  puVar2 = __addr_DAT_006284ec;
  heap.setU32(0x005f96e8, (unaff_EBP) >>> 0);
  for (iVar1 = 0x100; iVar1 != 0; iVar1 = iVar1 + -1) {
    heap.u32(puVar2) = 0;
    puVar2 = puVar2 + 1;
  }
  heap.setU32(0x006288ec, (0xffffffff) >>> 0);
  heap.setU32(0x006288f0, (0) >>> 0);
  heap.setU32(0x00628924, (0) >>> 0);
  heap.setU32(0x00628920, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
