// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45174b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045174b(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088755c = __sp + 4;
  const __addr_DAT_0088755d = __sp + 8;
  const __addr_DAT_0088757c = __sp + 12;
  const __addr_DAT_0088757d = __sp + 16;
  const __addr_PTR_LAB_00451798 = __sp + 20;
  try {
  let in_DL = 0;
  let unaff_EBX = 0;
  let uVar1 = 0;
  let iVar2 = 0;
  uVar1 = in_DL;
  iVar2 = uVar1 * 0x260;
  if ((heap.u32((__addr_DAT_00887422) + (uVar1 * 0x130) * 4) & 0x4c0) == 0) {
    heap.u32((__addr_DAT_00887422) + (uVar1 * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (uVar1 * 0x130) * 4) & 0xfeff;
    heap.u32((__addr_DAT_00887422) + (uVar1 * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (uVar1 * 0x130) * 4) | 0x40;
    heap.u32((__addr_DAT_0088755c) + (iVar2) * 4) = unaff_EBX;
    heap.u32((__addr_DAT_0088755d) + (iVar2) * 4) = 0;
    heap.u32((__addr_DAT_0088757c) + (iVar2) * 4) = 0;
    heap.u32((__addr_DAT_0088757d) + (iVar2) * 4) = 0;
    (heap.u32(heap.u32((__addr_PTR_LAB_00451798) + (unaff_EBX) * 4)))();
    return;
  }
  return;
} finally {
    heap.freeFrame(24);
  }
}
