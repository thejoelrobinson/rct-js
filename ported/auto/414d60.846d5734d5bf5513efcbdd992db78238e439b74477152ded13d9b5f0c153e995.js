// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414d60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00414d60(heap) {
  let iVar1 = 0;
  let puVar2 = 0;
  puVar2 = ((0x005f0020) >>> 0);
  for (iVar1 = ((0x40) >>> 0); iVar1 != 0; iVar1 = (((iVar1 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar2, (0) & 0xffffffff);
    puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
  }
  heap.setU8(puVar2, (0) & 0xff);
  heap.setU32(0x005f0228, (0) >>> 0);
  heap.setU32(0x005f3f64, (0) >>> 0);
  heap.setU32(0x005f022c, (0) >>> 0);
  heap.setU32(0x005f0230, (0) >>> 0);
  heap.setU32(0x005f0234, (0) >>> 0);
  heap.setU32(0x005f0238, (0) >>> 0);
  return;
}
