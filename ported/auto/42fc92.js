// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fc92.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042fc92(heap) {
  let cVar1 = 0;
  let pcVar2 = 0;
  let pcVar3 = 0;
  heap.setU32(0x0087d794, (0x1a697) >>> 0);
  heap.setU32(0x0087d750, (heap.u32(0x005eee38)) >>> 0);
  pcVar2 = ((0x005eee40) >>> 0);
  heap.setU32(0x005eee7f, (0) >>> 0);
  pcVar3 = ((0x0087d754) >>> 0);
  do {
    cVar1 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar3, (cVar1) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    pcVar3 = ((pcVar3 + 1) >>> 0);
  } while (cVar1 != 0);
  return;
}
