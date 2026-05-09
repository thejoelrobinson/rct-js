// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f199.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042f199(heap) {
  let cVar1 = 0;
  let pcVar2 = 0;
  let pcVar3 = 0;
  let pcVar4 = 0;
  pcVar2 = ((0x005f8ea4) >>> 0);
  pcVar3 = ((0x005f91d9) >>> 0);
  do {
    pcVar4 = ((pcVar3) >>> 0);
    cVar1 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar4, (cVar1) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    pcVar3 = ((pcVar4 + 1) >>> 0);
  } while (cVar1 != 0);
  if (heap.u8(0x008dbe94) != 0) {
    pcVar3 = ((0x008dbe94) >>> 0);
    do {
      pcVar2 = ((pcVar4) >>> 0);
      cVar1 = ((heap.i8(pcVar3)) & 0xff);
      heap.setU32(pcVar2, (cVar1) & 0xffffffff);
      pcVar3 = ((pcVar3 + 1) >>> 0);
      pcVar4 = ((pcVar2 + 1) >>> 0);
    } while (cVar1 != 0);
    heap.setU32(pcVar2, (heap.u32(0x005f92db)) & 0xffffffff);
    heap.setI8((pcVar2 + (4)), (0) & 0xff);
  }
  return;
}
