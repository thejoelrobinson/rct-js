// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4365c3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004365c3(heap) {
  let pbVar1 = 0;
  let pcVar2 = 0;
  let pcVar3 = 0;
  let pcVar4 = 0;
  heap.setU32(0x00743b90, (heap.u32(0x00743b90) + 1 & 0x3fff) >>> 0);
  pcVar4 = ((heap.u32((0x00971ef4) + (heap.u32(0x00743b90)) * 4)) >>> 0);
  pcVar2 = ((pcVar4) >>> 0);
  do {
    pcVar3 = ((pcVar2) >>> 0);
    pcVar2 = ((pcVar3 + -8) >>> 0);
    if (pcVar2 < 0x006e3b90) {
      break;
    }
  } while ((heap.i8(pcVar2) | 0) == -1);
  if (pcVar3 != pcVar4) {
    heap.setU32(((0x00971ef4) + (heap.u32(0x00743b90)) * 4), (pcVar3) & 0xffffffff);
    do {
      heap.setU32(pcVar3, (heap.u32(pcVar4)) & 0xffffffff);
      heap.setU32((pcVar3 + 4), (heap.u32((pcVar4 + 4))) & 0xffffffff);
      heap.setU32(pcVar4, (-1) & 0xffffffff);
      pcVar4 = ((pcVar4 + 8) >>> 0);
      pbVar1 = (((pcVar3 + 1)) >>> 0);
      pcVar3 = ((pcVar3 + 8) >>> 0);
      pcVar2 = ((heap.u32(0x00981ef4)) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
    do {
      heap.setU32(0x00981ef4, (pcVar2) >>> 0);
      pcVar2 = ((heap.u32(0x00981ef4) + -8) >>> 0);
    } while ((heap.u32(heap.u32(0x00981ef4) + (-8) * 4) | 0) == -1);
  }
  return;
}
