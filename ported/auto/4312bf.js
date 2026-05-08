// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4312bf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004312bf(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_0087ccd0 = __sp + 0;
  const __addr_DAT_005f96bc = __sp + 4;
  try {
  let in_EAX = 0;
  heap.setU32(0x005f96bc, (0) >>> 0);
  for (piVar2 = __addr_DAT_0087ccd0; heap.u32(piVar2) != -1; piVar2 = (piVar2 + 5)) {
  
  }
  while (heap.u32((piVar2 + 5)) != -2) {
    pbVar1 = (__addr_DAT_005f96bc + (heap.u32((piVar2 + 9)) >>> 3));
    heap.u32(pbVar1) = heap.u32(pbVar1) | '\x01' << (heap.u32((piVar2 + 9)) & 7);
    piVar2 = (piVar2 + 5);
  }
  return in_EAX;
} finally {
    heap.freeFrame(8);
  }
}
