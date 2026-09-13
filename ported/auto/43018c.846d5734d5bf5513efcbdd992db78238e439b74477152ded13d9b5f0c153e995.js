// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43018c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0043018c(heap) {
  let iVar1 = 0;
  let puVar2 = 0;
  puVar2 = ((0x0099c16c) >>> 0);
  iVar1 = ((0xe84) >>> 0);
  do {
    heap.setU32(puVar2, (heap.u32(puVar2) + 0x39393939 >>> 5 | (heap.u32(puVar2) + 0x39393939) * 0x8000000) & 0xffffffff);
    puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
    iVar1 = ((iVar1 + -1) >>> 0);
  } while (iVar1 != 0);
  return;
}
