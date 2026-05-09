// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a006.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ClientToScreen, GetClientRect } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_0040a006(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(132);
  const __addr_local_30 = __sp + 0;
  const __addr_local_20 = __sp + 16;
  const __addr_local_1c = __sp + 20;
  const __addr_local_18 = __sp + 24;
  const __addr_local_14 = __sp + 28;
  const __addr_local_10 = __sp + 32;
  const __addr_local_c = __sp + 36;
  const __addr_local_8 = __sp + 40;
  try {
  let iVar1 = 0;
  if ((((param_1 != 0) && (param_3 != 0)) && (heap.i32((param_3 + 0x80)) != 0)) && (heap.i32((param_1 + 0x80)) != 0)) {
    if (heap.u32(0x005ebf54) == 0) {
      heap.setU32(__addr_local_18, (heap.i32(param_4)) >>> 0);
      heap.setU32(__addr_local_14, (heap.i32(param_4 + (1) * 4)) >>> 0);
      heap.setU32(__addr_local_10, (heap.i32(param_4 + (2) * 4)) >>> 0);
      heap.setU32(__addr_local_c, (heap.i32(param_4 + (3) * 4)) >>> 0);
      GetClientRect(heap, heap.u32(0x005e916c), __addr_local_30);
      ClientToScreen(heap, heap.u32(0x005e916c), ((__addr_local_30) >>> 0));
      heap.setU32(param_4, (heap.i32(param_4) + heap.u32(__addr_local_30)) & 0xffffffff);
      heap.setI32((param_4 + (1) * 4), (heap.i32(param_4 + (1) * 4) + heap.u32((__addr_local_30 + 4))) & 0xffffffff);
      heap.setI32((param_4 + (2) * 4), (heap.i32(param_4 + (2) * 4) + heap.u32(__addr_local_30)) & 0xffffffff);
      heap.setI32((param_4 + (3) * 4), (heap.i32(param_4 + (3) * 4) + heap.u32((__addr_local_30 + 4))) & 0xffffffff);
    }
    heap.setU32(__addr_local_20, (param_5) >>> 0);
    heap.setU32(__addr_local_1c, (param_5) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((param_1 + 0x80))) + 0x74)), heap.u32((param_1 + 0x80)), 8, __addr_local_20));
    do {
      heap.setU32(__addr_local_8, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((param_3 + 0x80))) + 0x14)), heap.u32((param_3 + 0x80)), param_4, heap.u32((param_1 + 0x80)), param_2, 0x1008000, 0))) >>> 0);
      if ((heap.u32(__addr_local_8) == -0x7789fe3e) && (iVar1 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar1 == 0)) {
        break;
      }
    } while (heap.u32(__addr_local_8) == -0x7789fe3e);
    if (heap.u32(0x005ebf54) == 0) {
      heap.setU32(param_4, (heap.u32(__addr_local_18)) & 0xffffffff);
      heap.setI32((param_4 + (1) * 4), (heap.u32(__addr_local_14)) & 0xffffffff);
      heap.setI32((param_4 + (2) * 4), (heap.u32(__addr_local_10)) & 0xffffffff);
      heap.setI32((param_4 + (3) * 4), (heap.u32(__addr_local_c)) & 0xffffffff);
    }
    if (heap.u32(__addr_local_8) == 0) {
      return 1;
    }
  }
  return 0;
} finally {
    heap.freeFrame(132);
  }
}
