// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436558.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00436558(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_006e3b90 = __sp + 0;
  const __addr_DAT_00971ef4 = __sp + 4;
  try {
  let pbVar1 = 0;
  let iVar2 = 0;
  let puVar3 = 0;
  let puVar4 = 0;
  heap.setU32(0x00981ef4, (__addr_DAT_006e3b90) >>> 0);
  puVar4 = __addr_DAT_00971ef4;
  iVar2 = 0x4000;
  do {
    heap.setU32(puVar4, (heap.u32(0x00981ef4)) >>> 0);
    puVar4 = puVar4 + 1;
    puVar3 = heap.u32(0x00981ef4);
    do {
      heap.setU32(0x00981ef4, (puVar3 + 2) >>> 0);
      pbVar1 = (puVar3 + 1);
      puVar3 = heap.u32(0x00981ef4);
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    iVar2 = iVar2 + -1;
  } while (iVar2 != 0);
  return;
} finally {
    heap.freeFrame(8);
  }
}
