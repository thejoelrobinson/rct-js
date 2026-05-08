// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408342.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { WriteFile } from "../runtime/win32.js";
export function FUN_00408342(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(4);
  const __addr_local_8 = __sp + 0;
  try {
  let BVar1 = 0;
  BVar1 = WriteFile(heap, param_1, param_2, param_3, __addr_local_8, 0x0);
  if (BVar1 == 0) {
    heap.setU32(__addr_local_8, (0xffffffff) >>> 0);
  }
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(4);
  }
}
