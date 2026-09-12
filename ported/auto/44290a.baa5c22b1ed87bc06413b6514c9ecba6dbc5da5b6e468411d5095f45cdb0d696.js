// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44290a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0044290a(heap) {
  let pcVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  for (uVar2 = ((heap.u32(0x0087c398)) & 0xffff); uVar2 != 0xffff; uVar2 = (((heap.u32((0x00743b98) + (((uVar2) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
    iVar3 = ((((uVar2) >>> 0) * 0x100) >>> 0);
    if (((heap.u32((0x00743bc2) + (iVar3) * 4) == 0) && (heap.u32((0x00743bbe) + (iVar3) * 4) == 0)) && (heap.u32((0x00743bbf) + (iVar3) * 4) == 6)) {
      pcVar1 = ((0x00743c89 + iVar3) >>> 0);
      heap.setU8(pcVar1, (heap.i8(pcVar1) + 1) & 0xffffffff);
      if (heap.i8(pcVar1) == 0) {
        heap.setU32(((0x00743c89) + (iVar3) * 4), (heap.u32((0x00743c89) + (iVar3) * 4) + -1) & 0xffffffff);
      }
    }
  }
  return;
}
