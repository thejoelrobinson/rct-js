// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ba8c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040ba8c(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f0960 = __sp + 0;
  try {
  if (param_1 == 0) {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50))))(heap.u32(0x005ebf30), heap.u32(0x005e916c), 0xb);
  } else {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50))))(heap.u32(0x005ebf30), heap.u32(0x005e916c), 0x13);
  }
  if (heap.u32(0x005ebf3c) != 0x0) {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf3c)) + 0x18))))(heap.u32(0x005ebf3c), 0, 0, 0x100, __addr_DAT_005f0960);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
