// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409af7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_00409af7(heap, param_1, param_2) {
  const __sp = heap.allocFrame(24);
  const __addr_local_1c = __sp + 0;
  const __addr_local_18 = __sp + 4;
  const __addr_local_14 = __sp + 8;
  const __addr_local_10 = __sp + 12;
  const __addr_local_c = __sp + 16;
  const __addr_local_8 = __sp + 20;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  if (((heap.u32(0x005ebf54) != 0) && (heap.u32(0x005ebf40) != 0x0)) && (param_1 != 0)) {
    heap.setU32(__addr_local_8, (heap.i32(param_2 + (2) * 4) - heap.i32(param_2)) >>> 0);
    heap.setU32(__addr_local_c, (heap.i32(param_2 + (3) * 4) - heap.i32(param_2 + (1) * 4)) >>> 0);
    if ((0 < heap.u32(__addr_local_8)) && (0 < heap.u32(__addr_local_c))) {
      if (0x40 < heap.u32(__addr_local_8)) {
        heap.setU32(__addr_local_8, (0x40) >>> 0);
        heap.setI32((param_2 + (2) * 4), (heap.i32(param_2) + 0x40) & 0xffffffff);
      }
      if (0x40 < heap.u32(__addr_local_c)) {
        heap.setU32(__addr_local_c, (0x40) >>> 0);
        heap.setI32((param_2 + (3) * 4), (heap.i32(param_2 + (1) * 4) + 0x40) & 0xffffffff);
      }
      heap.setU32(__addr_local_18, (0) >>> 0);
      heap.setU32(__addr_local_1c, (0) >>> 0);
      heap.setU32(__addr_local_14, (heap.u32(__addr_local_8)) >>> 0);
      heap.setU32(__addr_local_10, (heap.u32(__addr_local_c)) >>> 0);
      do {
        iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf40)) + 0x14)), heap.u32(0x005ebf40), __addr_local_1c, heap.u32((param_1 + 0x80)), param_2, 0x1000000, 0))) >>> 0);
        if ((iVar1 == -0x7789fe3e) && (iVar2 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar2 == 0)) {
          break;
        }
      } while (iVar1 == -0x7789fe3e);
      heap.setU32(0x005f138c, (heap.u32(__addr_local_8)) >>> 0);
      heap.setU32(0x005f12a4, (heap.u32(__addr_local_c)) >>> 0);
    }
  }
  return;
} finally {
    heap.freeFrame(24);
  }
}
