// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407b0c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0040ddca } from "./40ddca.js";
export function FUN_00407b0c(heap) {
  let iVar1 = 0;
  local_10 = heap.u32(0x005ec054);
  while (local_10 != 0x0) {
    if (local_10 == heap.u32(0x005ec058)) {
      local_8 = 0x0;
    } else {
      local_8 = heap.u32(local_10 + (4) * 4);
    }
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(local_10)) + 0x24))))(heap.u32(local_10), local_c);
    if ((iVar1 == 0) && ((heap.u32(local_c + (0) * 4) & 2) != 0)) {
      FUN_0040ddca(heap, local_10);
    }
    local_10 = local_8;
  }
  return;
}
