// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4122a3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mmioAdvance, mmioGetInfo, mmioSetInfo } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004138d0 } from "./4138d0.js";
export function FUN_004122a3(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(128);
  const __addr_local_5c = __sp + 0;
  const __addr_local_14 = __sp + 72;
  const __addr_local_10 = __sp + 76;
  const __addr_local_c = __sp + 80;
  const __addr_local_8 = __sp + 84;
  try {
  let MVar1 = 0;
  heap.setU32(__addr_local_8, (0) >>> 0);
  MVar1 = ((mmioGetInfo(heap, param_1, __addr_local_5c, 0)) >>> 0);
  heap.setU32(__addr_local_8, ((((MVar1 != 0)) | 0)) >>> 0);
  if (heap.u32(__addr_local_8) == 0) {
    heap.setU32(__addr_local_14, (param_2) >>> 0);
    if (heap.u32((param_4 + 4)) < param_2) {
      heap.setU32(__addr_local_14, (heap.u32((param_4 + 4))) >>> 0);
    }
    heap.setI32((param_4 + 4), (heap.i32((param_4 + 4)) - heap.u32(__addr_local_14)) & 0xffffffff);
    for (heap.setU32(__addr_local_c, (0) >>> 0); heap.u32(__addr_local_c) < heap.u32(__addr_local_14); heap.setU32(__addr_local_c, (heap.u32(__addr_local_c) + heap.u32(__addr_local_10)) >>> 0)) {
      if (heap.u32((__addr_local_5c + 16)) == heap.u32((__addr_local_5c + 28))) {
        heap.setU32(__addr_local_8, (mmioAdvance(heap, param_1, __addr_local_5c, 0)) >>> 0);
        if (heap.u32(__addr_local_8) != 0) {
          heap.setU32(param_5, (0) & 0xffffffff);
          return heap.u32(__addr_local_8);
        }
        heap.setU32(__addr_local_8, (0) >>> 0);
        if (heap.u32((__addr_local_5c + 16)) == heap.u32((__addr_local_5c + 28))) {
          heap.setU32(__addr_local_8, (0xe103) >>> 0);
          heap.setU32(param_5, (0) & 0xffffffff);
          return heap.u32(__addr_local_8);
        }
      }
      heap.setU32(__addr_local_10, (((heap.u32((__addr_local_5c + 28))) | 0) - ((heap.u32((__addr_local_5c + 16))) | 0)) >>> 0);
      if (heap.u32(__addr_local_14) - heap.u32(__addr_local_c) < heap.u32(__addr_local_10)) {
        heap.setU32(__addr_local_10, (heap.u32(__addr_local_14) - heap.u32(__addr_local_c)) >>> 0);
      }
      (regs.eax = FUN_004138d0(heap, heap.u32(__addr_local_c) + param_3, heap.u32((__addr_local_5c + 16)), heap.u32(__addr_local_10)));
      heap.setU32((__addr_local_5c + 16), (heap.u32((__addr_local_5c + 16)) + heap.u32(__addr_local_10)) >>> 0);
    }
    heap.setU32(__addr_local_8, (mmioSetInfo(heap, param_1, __addr_local_5c, 0)) >>> 0);
    if (heap.u32(__addr_local_8) == 0) {
      heap.setU32(param_5, (heap.u32(__addr_local_14)) & 0xffffffff);
      return 0;
    }
  }
  LAB_004123e9: heap.setU32(param_5, (0) & 0xffffffff);
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(128);
  }
}
