// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44290a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044290a(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00743b98 = __sp + 0;
  const __addr_DAT_00743bc2 = __sp + 4;
  const __addr_DAT_00743bbe = __sp + 8;
  const __addr_DAT_00743bbf = __sp + 12;
  const __addr_DAT_00743c89 = __sp + 16;
  try {
  let uVar2 = 0;
  let iVar3 = 0;
  for (uVar2 = heap.u32(0x0087c398); uVar2 != 0xffff; uVar2 = heap.u32((__addr_DAT_00743b98) + (uVar2 * 0x80) * 4)) {
    iVar3 = uVar2 * 0x100;
    if (((heap.u32((__addr_DAT_00743bc2) + (iVar3) * 4) == '\0') && (heap.u32((__addr_DAT_00743bbe) + (iVar3) * 4) == '\0')) && (heap.u32((__addr_DAT_00743bbf) + (iVar3) * 4) == '\x06')) {
      pcVar1 = __addr_DAT_00743c89 + iVar3;
      heap.u32(pcVar1) = heap.u32(pcVar1) + '\x01';
      if (heap.u32(pcVar1) == '\0') {
        heap.u32((__addr_DAT_00743c89) + (iVar3) * 4) = heap.u32((__addr_DAT_00743c89) + (iVar3) * 4) + -1;
      }
    }
  }
  return;
} finally {
    heap.freeFrame(20);
  }
}
