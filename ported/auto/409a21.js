// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409a21.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00413470 } from "./413470.js";
export function FUN_00409a21(heap, param_1) {
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  if ((param_1 != 0) && (heap.u32(0x005ebf48) != 0x0)) {
    local_8 = heap.u32(0x005ebf48);
    local_10 = 0x0;
    local_c = 0x0;
    while (local_8 != 0x0 && (local_10 == 0x0)) {
      if (heap.u32(local_8) == param_1) {
        local_10 = local_8;
      } else {
        local_c = local_8;
        local_8 = heap.u32(local_8 + (2) * 4);
      }
    }
    if (local_8 != 0x0) {
      (heap.u32(heap.u32((heap.u32(heap.u32(local_8 + (1) * 4)) + 8))))(heap.u32(local_8 + (1) * 4));
      FUN_00413470(heap, param_1);
      if (local_c == 0x0) {
        heap.setU32(0x005ebf48, (heap.u32(local_8 + (2) * 4)) >>> 0);
      } else {
        heap.setU32((local_c + (2) * 4), (heap.u32(local_8 + (2) * 4)) >>> 0);
      }
      FUN_00413470(heap, local_8);
    }
  }
  return;
}
