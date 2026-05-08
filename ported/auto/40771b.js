// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40771b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004080e0 } from "./4080e0.js";
export function FUN_0040771b(heap, param_1) {
  let uVar1 = 0;
  if (heap.u32(0x005ec050) == 0) {
    heap.setU32(0x005ec050, (FUN_004080e0(heap, param_1, 0, 0)) >>> 0);
    if (heap.u32(0x005ec050) == 0) {
      uVar1 = 0;
    } else {
      uVar1 = 1;
    }
  } else {
    uVar1 = 0;
  }
  return uVar1;
}
