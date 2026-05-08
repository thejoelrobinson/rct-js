// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/423677.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00423677(heap) {
  let bVar1 = 0;
  let in_AX = 0;
  let in_CX = 0;
  if ((in_AX < 0x1000) && (in_CX < 0x1000)) {
    pbVar2 = heap.u32((0x00971ef4) + ((ushort)((ushort)((in_CX & 0xffe0) << 7 | in_CX >>> 9 | in_AX & 0xffe0) >>> 5 | (in_CX >>> 9) << 0xb)) * 4);
    bVar1 = heap.u32(pbVar2);
    while ((bVar1 & 0x3c) != 0) {
      pbVar2 = pbVar2 + 8;
      bVar1 = heap.u32(pbVar2);
    }
    (heap.u32(heap.u32((0x004236e0) + (heap.u32(pbVar2 + (4) * 4) & 0xf) * 4)))();
    return;
  }
  return;
}
