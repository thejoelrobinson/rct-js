// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4054e3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CoCreateInstance, CoInitialize, MultiByteToWideChar } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004054e3(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(1048);
  const __addr_local_8 = __sp + 536;
  const __addr_local_10 = __sp + 528;
  const __addr_local_218 = __sp + 8;
  const __addr_local_c = __sp + 532;
  try {
  let uVar1 = 0;
  CoInitialize(heap, ((0x0) | 0));
  heap.setU32(__addr_local_c, (CoCreateInstance(heap, 0x005e78b0, 0x0, 1, 0x005e7c70, __addr_local_8)) >>> 0);
  if (heap.u32(__addr_local_c) < 0) {
    uVar1 = ((0) >>> 0);
  } else {
    heap.setU32(__addr_local_c, ((regs.eax = callIndirect(heap, heap.u32(heap.i32(heap.u32(__addr_local_8))), heap.u32(__addr_local_8), 0x005e7ca0, __addr_local_10))) >>> 0);
    if (heap.u32(__addr_local_c) < 0) {
      (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_8)) + 8)), heap.u32(__addr_local_8)));
      uVar1 = ((0) >>> 0);
    } else {
      heap.setU32(__addr_local_c, ((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_8)) + 0x50)), heap.u32(__addr_local_8), param_1))) >>> 0);
      if (heap.u32(__addr_local_c) < 0) {
        (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_10)) + 8)), heap.u32(__addr_local_10)));
        (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_8)) + 8)), heap.u32(__addr_local_8)));
        uVar1 = ((0) >>> 0);
      } else {
        heap.setU32(__addr_local_c, ((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_8)) + 0x1c)), heap.u32(__addr_local_8), param_3))) >>> 0);
        if (heap.u32(__addr_local_c) < 0) {
          (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_10)) + 8)), heap.u32(__addr_local_10)));
          (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_8)) + 8)), heap.u32(__addr_local_8)));
          uVar1 = ((0) >>> 0);
        } else {
          MultiByteToWideChar(heap, 0, 0, param_2, -1, __addr_local_218, 0x104);
          heap.setU32(__addr_local_c, ((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_10)) + 0x18)), heap.u32(__addr_local_10), __addr_local_218, 1))) >>> 0);
          if (heap.u32(__addr_local_c) < 0) {
            (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_10)) + 8)), heap.u32(__addr_local_10)));
            (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_8)) + 8)), heap.u32(__addr_local_8)));
            uVar1 = ((0) >>> 0);
          } else {
            (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_8)) + 8)), heap.u32(__addr_local_8)));
            (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(__addr_local_10)) + 8)), heap.u32(__addr_local_10)));
            uVar1 = ((1) >>> 0);
          }
        }
      }
    }
  }
  return uVar1;
} finally {
    heap.freeFrame(1048);
  }
}
