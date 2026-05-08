// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4364c2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004364c2(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_008ad1c8 = __sp + 0;
  try {
  let in_AX = 0;
  let in_CX = 0;
  let in_DX = 0;
  let uVar1 = 0;
  uVar1 = heap.u32(0x008ae938);
  psVar2 = __addr_DAT_008ad1c8;
  if (uVar1 != 0) {
    if (999 < uVar1) {
      return;
    }
    do {
      if (((in_AX == heap.u32(psVar2 + (1) * 4)) && (in_CX == heap.u32(psVar2 + (2) * 4))) && (in_DX == heap.u32(psVar2))) {
        return;
      }
      psVar2 = psVar2 + 3;
      uVar1 = uVar1 - 1;
    } while (uVar1 != 0);
  }
  heap.setU32(0x008ae938, (heap.u32(0x008ae938) + 1) >>> 0);
  heap.u32(psVar2 + (1) * 4) = in_AX;
  heap.u32(psVar2 + (2) * 4) = in_CX;
  heap.u32(psVar2) = in_DX;
  return;
} finally {
    heap.freeFrame(4);
  }
}
