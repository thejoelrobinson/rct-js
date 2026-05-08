// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406fca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00406fca(heap) {
  let iVar1 = 0;
  if (((heap.u32(0x005ebef4) != 0) && (heap.u32(0x005ebefc) != 0x0)) && (heap.u32(0x005e916c) != 0)) {
    heap.setU32(0x005ebf04, (0) >>> 0);
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebefc)) + 0x34))))(heap.u32(0x005ebefc), heap.u32(0x005e916c), 5);
    if ((iVar1 == 0) && (iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebefc)) + 0x1c))))(heap.u32(0x005ebefc)), iVar1 == 0)) {
      heap.setU32(0x005ebf04, (1) >>> 0);
    }
  }
  return;
}
