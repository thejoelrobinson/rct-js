// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6a83.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e6a83(heap) {
  puVar2 = 0x009a121c;
  psVar1 = 0x009a1168;
  do {
    if (heap.u32(psVar1) != 0) {
      heap.u32(puVar2) = psVar1;
      puVar2 = puVar2 + 1;
    }
    psVar1 = psVar1 + 10;
  } while (psVar1 < 0x009a121c);
  heap.u32(puVar2) = 0;
  return;
}
