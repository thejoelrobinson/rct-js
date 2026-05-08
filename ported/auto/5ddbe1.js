// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddbe1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005ddbe1(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_0065ea78 = __sp + 0;
  const __addr_DAT_005f6b10 = __sp + 4;
  const __addr_DAT_005f6b13 = __sp + 8;
  const __addr_DAT_005f6b11 = __sp + 12;
  const __addr_DAT_005f6b12 = __sp + 16;
  try {
  let in_AL = 0;
  let bVar1 = 0;
  let in_AH = 0;
  let cVar2 = 0;
  let uVar4 = 0;
  uVar4 = in_AL;
  bVar1 = 1;
  pcVar3 = __addr_DAT_0065ea78;
  do {
    cVar2 = heap.u32((__addr_DAT_005f6b10) + (uVar4 * 4) * 4);
    if (bVar1 == in_AH) {
      if (heap.u32((__addr_DAT_005f6b13) + (uVar4 * 4) * 4) != -1) {
        cVar2 = heap.u32((__addr_DAT_005f6b13) + (uVar4 * 4) * 4);
      }
    }
    if (bVar1 == 1) {
      if (heap.u32((__addr_DAT_005f6b11) + (uVar4 * 4) * 4) != -1) {
        cVar2 = heap.u32((__addr_DAT_005f6b11) + (uVar4 * 4) * 4);
      }
    }
    if (bVar1 == 2) {
      if (heap.u32((__addr_DAT_005f6b12) + (uVar4 * 4) * 4) != -1) {
        cVar2 = heap.u32((__addr_DAT_005f6b12) + (uVar4 * 4) * 4);
      }
    }
    heap.u32(pcVar3) = cVar2;
    pcVar3 = pcVar3 + 1;
    bVar1 = bVar1 + 1;
  } while (bVar1 <= in_AH);
  heap.u32(pcVar3) = -1;
  return;
} finally {
    heap.freeFrame(20);
  }
}
