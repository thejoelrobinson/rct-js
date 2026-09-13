// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b308d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009b308d(heap) {
  let uVar1 = 0;
  let puVar2 = 0;
  let puVar3 = 0;
  puVar2 = ((heap.u32(0x008dc0b4) + -0x1400) >>> 0);
  puVar3 = ((heap.u32(0x008dc0b4)) >>> 0);
  do {
    uVar1 = ((heap.u32(puVar3)) >>> 0);
    if (heap.u32(0x008dc0b4) <= puVar2) {
      uVar1 = ((uVar1 | heap.u32(puVar2)) >>> 0);
    }
    puVar3 = ((puVar3 + ((0x400) * 4)) >>> 0);
    puVar2 = ((puVar2 + ((0x400) * 4)) >>> 0);
  } while (puVar3 < heap.u32(0x00971e74));
  return uVar1;
}
