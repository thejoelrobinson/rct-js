// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408c1c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00408c1c(heap, param_1) {
  puVar1 = (heap.u32(0x005f0954) * 0x12 + heap.u32(0x005ebe38));
  heap.u32(puVar1) = heap.u32((param_1 + 0xc));
  heap.u32(puVar1 + (1) * 4) = heap.u32((param_1 + 8));
  heap.u32((puVar1 + 2)) = 2;
  heap.u32((puVar1 + 7)) = heap.u32((param_1 + 0x18));
  if ((heap.u32((param_1 + 0x4c)) & 0x40) == 0) {
    heap.u32((puVar1 + 5)) = 0;
    heap.u32((puVar1 + 3)) = 0;
    heap.u32(puVar1 + (8) * 4) = 0;
  } else {
    heap.u32((puVar1 + 5)) = 1;
    heap.u32((puVar1 + 3)) = heap.u32((param_1 + 0x54));
    heap.u32(puVar1 + (8) * 4) = 6;
  }
  if ((heap.u32((param_1 + 0x4c)) & 0x1828) == 0) {
    heap.u32((puVar1 + 7)) = 0;
    heap.u32(puVar1 + (6) * 4) = 0;
  } else {
    heap.u32((puVar1 + 7)) = 1;
    heap.u32(puVar1 + (6) * 4) = (1 << (heap.u32((puVar1 + 3)) & 0x1f));
  }
  heap.u32(puVar1 + (4) * 4) = 0;
  heap.u32(puVar1 + (5) * 4) = 0;
  heap.u32((puVar1 + 0xf)) = 1;
  heap.setU32(0x005f0954, (heap.u32(0x005f0954) + 1) >>> 0);
  return 1;
}
