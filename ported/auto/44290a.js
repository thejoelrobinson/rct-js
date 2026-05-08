// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44290a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044290a(heap) {
  let uVar2 = 0;
  let iVar3 = 0;
  for (uVar2 = heap.u32(0x0087c398); uVar2 != 0xffff; uVar2 = heap.u32((0x00743b98) + (uVar2 * 0x80) * 4)) {
    iVar3 = uVar2 * 0x100;
    if (((heap.u32((0x00743bc2) + (iVar3) * 4) == '\0') && (heap.u32((0x00743bbe) + (iVar3) * 4) == '\0')) && (heap.u32((0x00743bbf) + (iVar3) * 4) == '\x06')) {
      pcVar1 = 0x00743c89 + iVar3;
      heap.u32(pcVar1) = heap.u32(pcVar1) + '\x01';
      if (heap.u32(pcVar1) == '\0') {
        heap.u32((0x00743c89) + (iVar3) * 4) = heap.u32((0x00743c89) + (iVar3) * 4) + -1;
      }
    }
  }
  return;
}
