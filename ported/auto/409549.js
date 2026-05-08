// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409549.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00409549(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f0960 = __sp + 0;
  try {
  let local_c = 0;
  if ((heap.u32(0x005ebf3c) != 0x0) && (param_2 < 0x100)) {
    if (param_2 < 10) {
      param_2 = 10;
    }
    if (0xf6 < param_3 + param_2) {
      param_3 = 0xf6 - param_2;
    }
    for (local_c = param_2; local_c < param_3 + param_2; local_c = local_c + 1) {
      heap.u32((__addr_DAT_005f0960) + (local_c * 4) * 4) = heap.u32((param_1 + 2 + local_c * 4));
      heap.u32((local_c * 4 + 0x5f0961)) = heap.u32((param_1 + 1 + local_c * 4));
      heap.u32((local_c * 4 + 0x5f0962)) = heap.u32((param_1 + local_c * 4));
      heap.u32((local_c * 4 + 0x5f0963)) = 5;
    }
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf3c)) + 0x18))))(heap.u32(0x005ebf3c), 0, param_2, param_3, __addr_DAT_005f0960 + param_2 * 4);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
