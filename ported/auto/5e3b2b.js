// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3b2b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e3b2b(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a013c = __sp + 0;
  try {
  let bVar1 = 0;
  let in_CX = 0;
  let in_DX = 0;
  puVar2 = __addr_DAT_009a013c;
  bVar1 = in_CX & 0x7f;
  if ((in_CX >>> 7 & 1) == 0) {
    for (; (puVar2 < heap.u32(0x009a1164) && ((bVar1 != heap.u32(puVar2 + (0x174) * 4) || (in_DX != heap.u32((puVar2 + 0x30)))))); puVar2 = puVar2 + 0x178) {
    
    }
  } else {
    for (; (puVar2 < heap.u32(0x009a1164) && (bVar1 != heap.u32(puVar2 + (0x174) * 4))); puVar2 = puVar2 + 0x178) {
    
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
