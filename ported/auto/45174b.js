// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45174b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0045174b(heap) {
  let in_DL = 0;
  let unaff_EBX = 0;
  let uVar1 = 0;
  let iVar2 = 0;
  uVar1 = in_DL;
  iVar2 = uVar1 * 0x260;
  if ((heap.u32((0x00887422) + (uVar1 * 0x130) * 4) & 0x4c0) == 0) {
    heap.u32((0x00887422) + (uVar1 * 0x130) * 4) = heap.u32((0x00887422) + (uVar1 * 0x130) * 4) & 0xfeff;
    heap.u32((0x00887422) + (uVar1 * 0x130) * 4) = heap.u32((0x00887422) + (uVar1 * 0x130) * 4) | 0x40;
    heap.u32((0x0088755c) + (iVar2) * 4) = unaff_EBX;
    heap.u32((0x0088755d) + (iVar2) * 4) = 0;
    heap.u32((0x0088757c) + (iVar2) * 4) = 0;
    heap.u32((0x0088757d) + (iVar2) * 4) = 0;
    (heap.u32(heap.u32((0x00451798) + (unaff_EBX) * 4)))();
    return;
  }
  return;
}
