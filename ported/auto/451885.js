// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/451885.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00451885(heap) {
  let uVar1 = 0;
  let in_AX = 0;
  let iVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = in_EDX & 0xff;
  iVar4 = uVar3 * 0x260;
  heap.u32((0x00887422) + (uVar3 * 0x130) * 4) = heap.u32((0x00887422) + (uVar3 * 0x130) * 4) & 0xfe3f;
  heap.u32((0x0088751d) + (iVar4) * 4) = heap.u32((0x0088751d) + (iVar4) * 4) | 0x1c;
  if ((heap.u32((0x00887422) + (uVar3 * 0x130) * 4) & 1) != 0) {
    iVar2 = 0;
    do {
      uVar1 = heap.u32((0x0088747e + iVar2 * 2 + iVar4));
      do {
        heap.u32((0x00743bdc + uVar1 * 0x100)) = heap.u32((0x00743bdc + uVar1 * 0x100)) & 0xfc7f;
        uVar1 = heap.u32((0x00743bd2 + uVar1 * 0x100));
      } while (uVar1 != 0xffff);
      iVar2 = iVar2 + 1;
    } while (iVar2 < heap.u32((byte)(0x00887498) + (iVar4) * 4));
  }
  heap.u32((0x00887566 + iVar4)) = heap.u32((0x00887566 + iVar4)) + (in_AX & 0xff) * (ushort)((byte)(100U - ((ushort) * (0x00887566 + iVar4) >>> 8)) >>> 1);
  return;
}
