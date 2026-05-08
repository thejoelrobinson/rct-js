// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414d60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00414d60(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f0020 = __sp + 0;
  try {
  let iVar1 = 0;
  puVar2 = __addr_DAT_005f0020;
  for (iVar1 = 0x40; iVar1 != 0; iVar1 = iVar1 + -1) {
    heap.u32(puVar2) = 0;
    puVar2 = puVar2 + 1;
  }
  heap.u32(puVar2) = 0;
  heap.setU32(0x005f0228, (0) >>> 0);
  heap.setU32(0x005f3f64, (0) >>> 0);
  heap.setU32(0x005f022c, (0) >>> 0);
  heap.setU32(0x005f0230, (0) >>> 0);
  heap.setU32(0x005f0234, (0) >>> 0);
  heap.setU32(0x005f0238, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
