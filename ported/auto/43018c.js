// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43018c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0043018c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099c16c = __sp + 0;
  try {
  let iVar1 = 0;
  let puVar2 = 0;
  puVar2 = __addr_DAT_0099c16c;
  iVar1 = 0xe84;
  do {
    heap.setU32(puVar2, (heap.u32(puVar2) + 0x39393939 >>> 5 | (heap.u32(puVar2) + 0x39393939) * 0x8000000) >>> 0);
    puVar2 = puVar2 + 1;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
