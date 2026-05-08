// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44142c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0044142c(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_0088752b = __sp + 0;
  const __addr_DAT_0088751d = __sp + 4;
  try {
  let unaff_ESI = 0;
  let iVar1 = 0;
  if ((heap.u32((unaff_ESI + 0x2b)) == '\a') || (heap.u32((unaff_ESI + 0x2b)) == '\x03')) {
    iVar1 = heap.u32((unaff_ESI + 0x68)) * 0x260;
    heap.u32((__addr_DAT_0088752b) + (iVar1) * 4) = heap.u32((__addr_DAT_0088752b) + (iVar1) * 4) + -1;
    heap.u32((__addr_DAT_0088751d) + (iVar1) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar1) * 4) | 0xc;
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
