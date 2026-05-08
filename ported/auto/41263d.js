// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41263d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mmioCreateChunk, mmioGetInfo } from "../../runtime/win32.js";
export function FUN_0041263d(heap, param_1, param_2, param_3) {
  let local_8 = 0;
  heap.setU32(param_2, (0x61746164) >>> 0);
  heap.setU32((param_2 + 4), (0) >>> 0);
  local_8 = mmioCreateChunk(heap, heap.u32(param_1), param_2, 0);
  if (local_8 == 0) {
    local_8 = mmioGetInfo(heap, heap.u32(param_1), param_3, 0);
  }
  return local_8;
}
