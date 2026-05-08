// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407e92.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00407e92(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_local_18 = __sp + 0;
  try {
  let iVar1 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_14 = 0;
  local_10 = 0;
  local_c = 0;
  local_8 = 0;
  heap.setU32(__addr_local_18, (0x14) >>> 0);
  iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(param_1)) + 0xc))))(heap.u32(param_1), __addr_local_18);
  if (iVar1 != 0) {
    local_8 = 0;
  }
  return local_8;
} finally {
    heap.freeFrame(4);
  }
}
