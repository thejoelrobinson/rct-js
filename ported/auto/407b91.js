// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407b91.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00407b91(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_local_8 = __sp + 0;
  try {
  let iVar1 = 0;
  if (heap.u32(param_1) == 0) {
    return 0;
  }
  iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(param_1)) + 0x24))))(heap.u32(param_1), __addr_local_8);
  if (iVar1 == 0) {
    if ((heap.u32(__addr_local_8 + (0) * 4) & 1) != 0) {
      return 1;
    }
    if ((heap.u32(__addr_local_8 + (0) * 4) & 4) != 0) {
      return 1;
    }
  }
  return 0;
} finally {
    heap.freeFrame(4);
  }
}
