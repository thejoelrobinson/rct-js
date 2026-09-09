// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a611.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ClientToScreen, GetClientRect } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_0040a611(heap, param_1, param_2) {
  const __sp = heap.allocFrame(128);
  const __addr_local_28 = __sp + 0;
  const __addr_local_18 = __sp + 16;
  const __addr_local_14 = __sp + 20;
  const __addr_local_10 = __sp + 24;
  const __addr_local_c = __sp + 28;
  const __addr_local_8 = __sp + 32;
  try {
  let iVar1 = 0;
  if ((heap.u32(0x005ebf5c) != 0) && (heap.u32(0x005ebf60) != 0x0)) {
    if (heap.u32(0x005ebf54) == 0) {
      heap.setU32(__addr_local_18, (heap.i32(param_2)) >>> 0);
      heap.setU32(__addr_local_14, (heap.i32(param_2 + (1) * 4)) >>> 0);
      heap.setU32(__addr_local_10, (heap.i32(param_2 + (2) * 4)) >>> 0);
      heap.setU32(__addr_local_c, (heap.i32(param_2 + (3) * 4)) >>> 0);
      GetClientRect(heap, heap.u32(0x005e916c), __addr_local_28);
      ClientToScreen(heap, heap.u32(0x005e916c), ((__addr_local_28) | 0));
      heap.setU32(param_2, (heap.i32(param_2) + heap.u32(__addr_local_28)) & 0xffffffff);
      heap.setI32((param_2 + (1) * 4), (heap.i32(param_2 + (1) * 4) + heap.u32((__addr_local_28 + 4))) & 0xffffffff);
      heap.setI32((param_2 + (2) * 4), (heap.i32(param_2 + (2) * 4) + heap.u32(__addr_local_28)) & 0xffffffff);
      heap.setI32((param_2 + (3) * 4), (heap.i32(param_2 + (3) * 4) + heap.u32((__addr_local_28 + 4))) & 0xffffffff);
    }
    do {
      heap.setU32(__addr_local_8, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf60)) + 0x14)), heap.u32(0x005ebf60), param_2, heap.u32(0x005ebf5c), param_1, 0x1000000, 0))) >>> 0);
      if ((heap.u32(__addr_local_8) == -0x7789fe3e) && (iVar1 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar1 == 0)) {
        break;
      }
    } while (heap.u32(__addr_local_8) == -0x7789fe3e);
    if (heap.u32(0x005ebf54) == 0) {
      heap.setU32(param_2, (heap.u32(__addr_local_18)) & 0xffffffff);
      heap.setI32((param_2 + (1) * 4), (heap.u32(__addr_local_14)) & 0xffffffff);
      heap.setI32((param_2 + (2) * 4), (heap.u32(__addr_local_10)) & 0xffffffff);
      heap.setI32((param_2 + (3) * 4), (heap.u32(__addr_local_c)) & 0xffffffff);
    }
    if (heap.u32(__addr_local_8) == 0) {
      return 1;
    }
  }
  return 0;
} finally {
    heap.freeFrame(128);
  }
}
