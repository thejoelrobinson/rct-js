// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/420379.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00420379(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_005f679c = __sp + 0;
  const __addr_DAT_005f679e = __sp + 4;
  const __addr_DAT_005f67a0 = __sp + 8;
  const __addr_DAT_005f67a2 = __sp + 12;
  const __addr_DAT_005f67a4 = __sp + 16;
  const __addr_DAT_005f67a6 = __sp + 20;
  const __addr_DAT_005f67a8 = __sp + 24;
  const __addr_DAT_005f67aa = __sp + 28;
  const __addr_DAT_005f67ac = __sp + 32;
  try {
  let in_ECX = 0;
  let iVar1 = 0;
  let iVar2 = 0;
  iVar2 = heap.u32(unaff_EDI) * 0x12;
  iVar1 = in_ECX + heap.u32((__addr_DAT_005f679c + iVar2)) + heap.u32((__addr_DAT_005f679e + iVar2)) * (heap.u32(unaff_EDI + (0xc5) * 4) >>> 6) + (((heap.u32((unaff_EDI + 0x94)) + heap.u32((unaff_EDI + 0x98)) + heap.u32((unaff_EDI + 0x9c)) + heap.u32((unaff_EDI + 0xa0))) >>> 0x10) * heap.u32((__addr_DAT_005f67a0 + iVar2)) >>> 10);
  if ((heap.u32((unaff_EDI + 2)) & 0x20) != 0) {
    iVar1 = iVar1 + heap.u32((__addr_DAT_005f67a2 + iVar2));
  }
  heap.u32((unaff_EDI + 0x132)) = ((iVar1 + heap.u32((__addr_DAT_005f67a4 + iVar2)) * heap.u32(0x008ae984) + heap.u32((__addr_DAT_005f67a6 + iVar2)) * heap.u32(0x008ae982) + heap.u32((__addr_DAT_005f67a8 + iVar2)) * heap.u32(unaff_EDI + (0x78) * 4) + heap.u32((__addr_DAT_005f67aa + iVar2)) * heap.u32(unaff_EDI + (0x79) * 4) + heap.u32((__addr_DAT_005f67ac + iVar2)) * heap.u32(unaff_EDI + (0x77) * 4)) * 10 >>> 4);
  heap.u32(unaff_EDI + (0xfd) * 4) = heap.u32(unaff_EDI + (0xfd) * 4) | 2;
  return;
} finally {
    heap.freeFrame(36);
  }
}
