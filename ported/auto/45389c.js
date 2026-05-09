// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45389c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045389c(heap) {
  let puVar1 = 0;
  let puVar2 = 0;
  heap.setU32(0x006325b0, (0x006325b4) >>> 0);
  puVar2 = ((heap.u32(0x009a1164)) >>> 0);
  do {
    puVar1 = ((puVar2 + -0x178) >>> 0);
    if (puVar1 < 0x009a013c) {
      heap.setU32(0x006323fc, (0xffffffff) >>> 0);
      heap.setU32(0x006325b0, (0x006325b4) >>> 0);
      return;
    }
    heap.setU32(0x006323fc, (heap.i32((puVar2 + -0x170))) >>> 0);
    puVar2 = ((puVar1) >>> 0);
  } while ((heap.u32(0x006323fc) == 0) || ((heap.u16((heap.u32(0x006323fc) + 0x12)) & 0x800) == 0));
  heap.setU32(0x00632404, (0) >>> 0);
  if ((heap.i8((heap.u32(0x006323fc) + 0x10)) != 0) && (heap.setU32(0x00632404, (0x1e) >>> 0), heap.i8((heap.u32(0x006323fc) + 0x10)) != 1)) {
    heap.setU32(0x00632404, (0x3c) >>> 0);
  }
  heap.setU32(0x00632400, (puVar1) >>> 0);
  return;
}
