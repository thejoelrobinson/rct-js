// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436558.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00436558(heap) {
  let pbVar1 = 0;
  let iVar2 = 0;
  let puVar3 = 0;
  let puVar4 = 0;
  heap.setU32(0x00981ef4, (0x006e3b90) >>> 0);
  puVar4 = ((0x00971ef4) >>> 0);
  iVar2 = ((0x4000) >>> 0);
  do {
    heap.setU32(puVar4, (heap.u32(0x00981ef4)) & 0xffffffff);
    puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
    puVar3 = ((heap.u32(0x00981ef4)) >>> 0);
    do {
      heap.setU32(0x00981ef4, (puVar3 + ((2) * 4)) >>> 0);
      pbVar1 = (((((puVar3) | 0) + 1)) >>> 0);
      puVar3 = ((heap.u32(0x00981ef4)) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
    iVar2 = ((iVar2 + -1) >>> 0);
  } while (iVar2 != 0);
  return;
}
