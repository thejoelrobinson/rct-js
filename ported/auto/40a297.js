// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a297.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
import { FUN_0040a006 } from "./40a006.js";
export function FUN_0040a297(heap, param_1, param_2, param_3, param_4, param_5, param_6) {
  const __sp = heap.allocFrame(32);
  const __addr_local_18 = __sp + 12;
  const __addr_local_20 = __sp + 4;
  const __addr_local_1c = __sp + 8;
  const __addr_local_14 = __sp + 16;
  const __addr_local_10 = __sp + 20;
  const __addr_local_c = __sp + 24;
  const __addr_local_8 = __sp + 28;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  if (heap.u32(0x005ebf54) == 0) {
    heap.setU32(__addr_local_18, (param_4) >>> 0);
    heap.setU32(__addr_local_10, ((heap.u32(param_2 + (2) * 4) - heap.u32(param_2)) + param_4) >>> 0);
    heap.setU32(__addr_local_14, (param_5) >>> 0);
    heap.setU32(__addr_local_c, ((heap.u32(param_2 + (3) * 4) - heap.u32(param_2 + (1) * 4)) + param_5) >>> 0);
    uVar1 = (((regs.eax = FUN_0040a006(heap, param_1, param_2, param_3, __addr_local_18, param_6))) >>> 0);
  } else {
    if ((((param_1 != 0) && (param_3 != 0)) && (heap.i32((param_3 + 0x80)) != 0)) && (heap.i32((param_1 + 0x80)) != 0)) {
      heap.setU32(__addr_local_20, (param_6) >>> 0);
      heap.setU32(__addr_local_1c, (param_6) >>> 0);
      (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((param_1 + 0x80))) + 0x74)), heap.u32((param_1 + 0x80)), 8, __addr_local_20));
      do {
        heap.setU32(__addr_local_8, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((param_3 + 0x80))) + 0x1c)), heap.u32((param_3 + 0x80)), param_4, param_5, heap.u32((param_1 + 0x80)), param_2, 0x11))) >>> 0);
        if ((heap.u32(__addr_local_8) == -0x7789fe3e) && (iVar2 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar2 == 0)) {
          break;
        }
      } while (heap.u32(__addr_local_8) == -0x7789fe3e);
      if (heap.u32(__addr_local_8) == 0) {
        return 1;
      }
    }
    uVar1 = ((0) >>> 0);
  }
  return uVar1;
} finally {
    heap.freeFrame(32);
  }
}
