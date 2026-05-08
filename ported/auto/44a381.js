// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a381.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044a381(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_008ae9c4 = __sp + 4;
  try {
  let iVar1 = 0;
  puVar2 = __addr_DAT_00887420;
  iVar1 = 0xff;
  do {
    heap.u32(puVar2) = 0xff;
    puVar2 = puVar2 + 0x260;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  heap.setU32(0x008ae948, (0) >>> 0);
  heap.setU32(0x008ae949, (0) >>> 0);
  puVar2 = __addr_DAT_008ae9c4;
  iVar1 = 8;
  do {
    heap.u32(puVar2) = 0xff;
    puVar2 = puVar2 + 0x4b0c;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  return;
} finally {
    heap.freeFrame(8);
  }
}
