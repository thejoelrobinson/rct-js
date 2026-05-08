// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412dcd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mmioDescend, mmioSeek } from "../../runtime/win32.js";
export function FUN_00412dcd(heap, param_1, param_2, param_3, param_4) {
  let local_8 = 0;
  mmioSeek(heap, heap.u32(param_1), heap.u32((param_3 + 12)) + 4, 0);
  heap.setU32(param_2, (0x61746164) >>> 0);
  local_8 = mmioDescend(heap, heap.u32(param_1), param_2, param_3, 0x10);
  if (local_8 == 0) {
    mmioSeek(heap, heap.u32(param_1), param_4, 1);
    local_8 = 0;
  }
  return local_8;
}
