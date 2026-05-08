// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/420379.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00420379(heap) {
  let in_ECX = 0;
  let iVar1 = 0;
  let iVar2 = 0;
  iVar2 = (uint) * unaff_EDI * 0x12;
  iVar1 = in_ECX + (uint) * (0x005f679c + iVar2) + (uint) * (0x005f679e + iVar2) * (uint)(heap.u32(unaff_EDI + (0xc5) * 4) >>> 6) + (((uint)(heap.u32((unaff_EDI + 0x94)) + heap.u32((unaff_EDI + 0x98)) + heap.u32((unaff_EDI + 0x9c)) + heap.u32((unaff_EDI + 0xa0))) >>> 0x10) * (uint) * (0x005f67a0 + iVar2) >>> 10);
  if ((heap.u32((unaff_EDI + 2)) & 0x20) != 0) {
    iVar1 = iVar1 + (uint) * (0x005f67a2 + iVar2);
  }
  heap.u32((unaff_EDI + 0x132)) = ((iVar1 + (uint) * (0x005f67a4 + iVar2) * heap.u32(0x008ae984) + (uint) * (0x005f67a6 + iVar2) * heap.u32(0x008ae982) + (uint) * (0x005f67a8 + iVar2) * heap.u32(unaff_EDI + (0x78) * 4) + (uint) * (0x005f67aa + iVar2) * heap.u32(unaff_EDI + (0x79) * 4) + (uint) * (0x005f67ac + iVar2) * heap.u32(unaff_EDI + (0x77) * 4)) * 10 >>> 4);
  heap.u32(unaff_EDI + (0xfd) * 4) = heap.u32(unaff_EDI + (0xfd) * 4) | 2;
  return;
}
