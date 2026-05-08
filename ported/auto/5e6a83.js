// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6a83.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e6a83(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_009a121c = __sp + 0;
  const __addr_DAT_009a1168 = __sp + 4;
  try {
  let psVar1 = 0;
  let puVar2 = 0;
  puVar2 = __addr_DAT_009a121c;
  psVar1 = __addr_DAT_009a1168;
  do {
    if (heap.u32(psVar1) != 0) {
      heap.setU32(puVar2, (psVar1) >>> 0);
      puVar2 = puVar2 + 1;
    }
    psVar1 = psVar1 + 10;
  } while (psVar1 < __addr_DAT_009a121c);
  heap.setU32(puVar2, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(8);
  }
}
