// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4365c3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004365c3(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_006e3b90 = __sp + 4;
  try {
  let pbVar1 = 0;
  let pcVar2 = 0;
  let pcVar3 = 0;
  let pcVar4 = 0;
  heap.setU32(0x00743b90, (heap.u32(0x00743b90) + 1 & 0x3fff) >>> 0);
  pcVar4 = heap.u32((__addr_DAT_00971ef4) + (heap.u32(0x00743b90)) * 4);
  pcVar2 = pcVar4;
  do {
    pcVar3 = pcVar2;
    pcVar2 = pcVar3 + -8;
    if (pcVar2 < __addr_DAT_006e3b90) {
      break;
    }
  } while (heap.u32(pcVar2) == -1);
  if (pcVar3 != pcVar4) {
    heap.setU32(((__addr_DAT_00971ef4) + (heap.u32(0x00743b90)) * 4), (pcVar3) >>> 0);
    do {
      heap.setU32(pcVar3, (heap.u32(pcVar4)) >>> 0);
      heap.setU32((pcVar3 + 4), (heap.u32((pcVar4 + 4))) >>> 0);
      heap.setU32(pcVar4, (-1) >>> 0);
      pcVar4 = pcVar4 + 8;
      pbVar1 = (pcVar3 + 1);
      pcVar3 = pcVar3 + 8;
      pcVar2 = heap.u32(0x00981ef4);
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    do {
      heap.setU32(0x00981ef4, (pcVar2) >>> 0);
      pcVar2 = heap.u32(0x00981ef4) + -8;
    } while (heap.u32(heap.u32(0x00981ef4) + (-8) * 4) == -1);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
