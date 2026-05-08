// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4026ec.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004026ec(heap) {
  const __sp = heap.allocFrame(172);
  const __addr_local_bc = __sp + 0;
  const __addr_local_ac = __sp + 4;
  try {
  let local_b8 = 0;
  let local_b4 = 0;
  let local_b0 = 0;
  local_b8 = 0;
  heap.setU32(__addr_local_bc, (0) >>> 0);
  local_b4 = heap.u32(0x005f15c4);
  local_b0 = heap.u32(0x005f1b34);
  (heap.u32(heap.u32(0x005ebe58)))(__addr_local_ac);
  heap.setU32(0x005f1fe0, (4) >>> 0);
  (heap.u32(heap.u32(0x005ebe94)))(heap.u32(0x005e9100), __addr_local_bc, __addr_local_ac, __addr_local_bc);
  return;
} finally {
    heap.freeFrame(172);
  }
}
