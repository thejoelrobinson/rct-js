// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a381.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0044a381(heap) {
  let iVar1 = 0;
  let puVar2 = 0;
  puVar2 = ((0x00887420) >>> 0);
  iVar1 = ((0xff) >>> 0);
  do {
    heap.setU32(puVar2, (0xff) & 0xffffffff);
    puVar2 = ((puVar2 + 0x260) >>> 0);
    iVar1 = ((iVar1 + -1) >>> 0);
  } while (iVar1 != 0);
  heap.setU8(0x008ae948, (0) & 0xff);
  heap.setU8(0x008ae949, (0) & 0xff);
  puVar2 = ((0x008ae9c4) >>> 0);
  iVar1 = ((8) >>> 0);
  do {
    heap.setU32(puVar2, (0xff) & 0xffffffff);
    puVar2 = ((puVar2 + 0x4b0c) >>> 0);
    iVar1 = ((iVar1 + -1) >>> 0);
  } while (iVar1 != 0);
  return;
}
