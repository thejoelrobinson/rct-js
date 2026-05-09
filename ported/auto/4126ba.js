// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4126ba.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mmioAdvance } from "../../runtime/win32.js";
export function FUN_004126ba(heap, param_1, param_2, param_3, param_4, param_5, param_6) {
  let local_c = 0;
  let local_8 = 0;
  local_8 = ((0) >>> 0);
  heap.setU32(param_5, (0) & 0xffffffff);
  local_c = ((0) >>> 0);
  do {
    if (param_2 <= local_c) {
      return local_8;
    }
    if (heap.u32((param_6 + 24)) == heap.u32((param_6 + 16))) {
      heap.setU32((param_6 + 4), (heap.u32((param_6 + 4)) | 0x10000000) >>> 0);
      local_8 = ((mmioAdvance(heap, param_1, param_6, 1)) >>> 0);
      if (local_8 != 0) {
        return local_8;
      }
    }
    heap.setU32(heap.u32((param_6 + 16)), (heap.i8((local_c + param_3))) & 0xffffffff);
    heap.setU32((param_6 + 16), (heap.u32((param_6 + 16)) + 1) >>> 0);
    heap.setU32(param_5, (heap.i32(param_5) + 1) & 0xffffffff);
    local_c = ((local_c + 1) >>> 0);
  } while (true);
}
