// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fc92.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042fc92(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005eee40 = __sp + 0;
  const __addr_DAT_0087d754 = __sp + 4;
  try {
  let cVar1 = 0;
  heap.setU32(0x0087d794, (0x1a697) >>> 0);
  heap.setU32(0x0087d750, (heap.u32(0x005eee38)) >>> 0);
  pcVar2 = __addr_DAT_005eee40;
  heap.setU32(0x005eee7f, (0) >>> 0);
  pcVar3 = __addr_DAT_0087d754;
  do {
    cVar1 = heap.u32(pcVar2);
    heap.u32(pcVar3) = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar1 != '\0');
  return;
} finally {
    heap.freeFrame(8);
  }
}
