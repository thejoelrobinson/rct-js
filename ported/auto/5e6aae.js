// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6aae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e6aae(heap) {
  let in_AX = 0;
  let in_CX = 0;
  let in_DX = 0;
  let unaff_BX = 0;
  let uVar1 = 0;
  let sVar2 = 0;
  heap.setU32(0x009a012c, (heap.u32(unaff_EDI)) >>> 0);
  heap.setU32(0x009a013a, (0) >>> 0);
  heap.setU32(0x009a0138, (heap.u32(unaff_EDI + (3) * 4)) >>> 0);
  heap.setU32(0x009a0130, (heap.u32(unaff_EDI + (1) * 4)) >>> 0);
  heap.setU32(0x009a0132, (heap.u32((unaff_EDI + 6))) >>> 0);
  heap.setU32(0x009a0134, (heap.u32(unaff_EDI + (2) * 4)) >>> 0);
  heap.setU32(0x009a0136, (heap.u32((unaff_EDI + 10))) >>> 0);
  if (heap.u32(0x009a0130) < in_AX) {
    uVar1 = in_AX - heap.u32(0x009a0130);
    heap.setU32(0x009a0134, (heap.u32(0x009a0134) - uVar1) >>> 0);
    heap.setU32(0x009a0138, (heap.u32(0x009a0138) + uVar1) >>> 0);
    heap.setU32(0x009a012c, (heap.u32(0x009a012c) + uVar1) >>> 0);
    heap.setU32(0x009a0130, (in_AX) >>> 0);
  }
  sVar2 = (heap.u32(0x009a0130) + heap.u32(0x009a0134)) - (unaff_BX + in_AX);
  if (sVar2 != 0 && (unaff_BX + in_AX) <= (heap.u32(0x009a0130) + heap.u32(0x009a0134))) {
    heap.setU32(0x009a0134, (heap.u32(0x009a0134) - sVar2) >>> 0);
    heap.setU32(0x009a0138, (heap.u32(0x009a0138) + sVar2) >>> 0);
  }
  if (heap.u32(0x009a0132) < in_CX) {
    heap.setU32(0x009a0136, (heap.u32(0x009a0136) - (in_CX - heap.u32(0x009a0132))) >>> 0);
    heap.setU32(0x009a012c, (heap.u32(0x009a012c) + (uint)(ushort)(heap.u32(0x009a0138) + heap.u32(0x009a0134)) * (uint)(ushort)(in_CX - heap.u32(0x009a0132))) >>> 0);
    heap.setU32(0x009a0132, (in_CX) >>> 0);
  }
  sVar2 = (heap.u32(0x009a0132) + heap.u32(0x009a0136)) - (in_DX + in_CX);
  if (sVar2 != 0 && (in_DX + in_CX) <= (heap.u32(0x009a0132) + heap.u32(0x009a0136))) {
    heap.setU32(0x009a0136, (heap.u32(0x009a0136) - sVar2) >>> 0);
  }
  if ((0 < heap.u32(0x009a0134)) && (0 < heap.u32(0x009a0136))) {
    heap.setU32(0x009a0130, (heap.u32(0x009a0130) - in_AX) >>> 0);
    heap.setU32(0x009a0132, (heap.u32(0x009a0132) - in_CX) >>> 0);
    return;
  }
  return;
}
