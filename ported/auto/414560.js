// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414560.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00414560(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f0020 = __sp + 0;
  const __addr_DAT_005ee552 = __sp + 4;
  try {
  if ((heap.u32((__addr_DAT_005f0020 + (param_1 & 0xff) + 1)) & param_3) == 0) {
    if (param_2 == 0) {
      param_2 = 0;
    } else {
      param_2 = heap.u32((__addr_DAT_005ee552 + (param_1 & 0xff) * 2)) & param_2;
    }
    if (param_2 == 0) {
      return 0;
    }
  }
  return 1;
} finally {
    heap.freeFrame(8);
  }
}
