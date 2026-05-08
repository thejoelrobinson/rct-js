// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4301a9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004301a9(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099c16c = __sp + 0;
  try {
  let iVar1 = 0;
  puVar2 = __addr_DAT_0099c16c;
  iVar1 = 0xe84;
  do {
    heap.u32(puVar2) = (heap.u32(puVar2) << 5 | heap.u32(puVar2) >>> 0x1b) + 0xc6c6c6c7;
    puVar2 = puVar2 + 1;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
