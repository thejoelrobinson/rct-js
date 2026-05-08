// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f199.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042f199(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005f8ea4 = __sp + 0;
  const __addr_DAT_005f91d9 = __sp + 4;
  const __addr_DAT_008dbe94 = __sp + 8;
  try {
  let cVar1 = 0;
  pcVar2 = __addr_DAT_005f8ea4;
  pcVar3 = __addr_DAT_005f91d9;
  do {
    pcVar4 = pcVar3;
    cVar1 = heap.u32(pcVar2);
    heap.u32(pcVar4) = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar4 + 1;
  } while (cVar1 != '\0');
  if (heap.u32(__addr_DAT_008dbe94) != '\0') {
    pcVar3 = __addr_DAT_008dbe94;
    do {
      pcVar2 = pcVar4;
      cVar1 = heap.u32(pcVar3);
      heap.u32(pcVar2) = cVar1;
      pcVar3 = pcVar3 + 1;
      pcVar4 = pcVar2 + 1;
    } while (cVar1 != '\0');
    heap.u32(pcVar2) = heap.u32(0x005f92db);
    heap.u32(pcVar2 + (4) * 4) = '\0';
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}
