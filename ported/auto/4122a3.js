// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4122a3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { MMRESULT } from "../runtime/win32.js";
import { FUN_004138d0 } from "./4138d0.js";
export function FUN_004122a3(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(128);
  const __addr_local_5c = __sp + 0;
  try {
  let MVar1 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_8 = 0;
  MVar1 = mmioGetInfo(param_1, __addr_local_5c, 0);
  local_8 = (MMRESULT)(MVar1 != 0);
  if (local_8 == 0) {
    local_14 = param_2;
    if (heap.u32((param_4 + 4)) < param_2) {
      local_14 = heap.u32((param_4 + 4));
    }
    heap.u32((param_4 + 4)) = heap.u32((param_4 + 4)) - local_14;
    for (local_c = 0; local_c < local_14; local_c = local_c + local_10) {
      if (heap.u32((__addr_local_5c + 16)) == heap.u32((__addr_local_5c + 28))) {
        local_8 = mmioAdvance(param_1, __addr_local_5c, 0);
        if (local_8 != 0) {
          /* goto LAB_004123e9 */ throw new Error("goto LAB_004123e9 not supported");
        }
        local_8 = 0;
        if (heap.u32((__addr_local_5c + 16)) == heap.u32((__addr_local_5c + 28))) {
          local_8 = 0xe103;
          /* goto LAB_004123e9 */ throw new Error("goto LAB_004123e9 not supported");
        }
      }
      local_10 = heap.u32((__addr_local_5c + 28)) - heap.u32((__addr_local_5c + 16));
      if (local_14 - local_c < local_10) {
        local_10 = local_14 - local_c;
      }
      FUN_004138d0(heap, local_c + param_3, heap.u32((__addr_local_5c + 16)), local_10);
      heap.u32((__addr_local_5c + 16)) = heap.u32((__addr_local_5c + 16)) + local_10;
    }
    local_8 = mmioSetInfo(param_1, __addr_local_5c, 0);
    if (local_8 == 0) {
      heap.u32(param_5) = local_14;
      return 0;
    }
  }
  LAB_004123e9: heap.u32(param_5) = 0;
  return local_8;
} finally {
    heap.freeFrame(128);
  }
}
