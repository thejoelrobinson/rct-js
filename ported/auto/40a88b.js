// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a88b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
import { FUN_0040a611 } from "./40a611.js";
export function FUN_0040a88b(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(20);
  const __addr_local_18 = __sp + 0;
  const __addr_local_14 = __sp + 4;
  const __addr_local_10 = __sp + 8;
  const __addr_local_c = __sp + 12;
  const __addr_local_8 = __sp + 16;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  if (heap.u32(0x005ebf54) == 0) {
    heap.setU32(__addr_local_18, (param_2) >>> 0);
    heap.setU32(__addr_local_10, ((heap.u32(param_1 + (2) * 4) - heap.u32(param_1)) + param_2) >>> 0);
    heap.setU32(__addr_local_14, (param_3) >>> 0);
    heap.setU32(__addr_local_c, ((heap.u32(param_1 + (3) * 4) - heap.u32(param_1 + (1) * 4)) + param_3) >>> 0);
    uVar1 = (((regs.eax = FUN_0040a611(heap, param_1, __addr_local_18))) >>> 0);
  } else {
    if ((heap.u32(0x005ebf60) != 0x0) && (heap.u32(0x005ebf5c) != 0)) {
      do {
        heap.setU32(__addr_local_8, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf60)) + 0x1c)), heap.u32(0x005ebf60), param_2, param_3, heap.u32(0x005ebf5c), param_1, 0x10))) >>> 0);
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
    heap.freeFrame(20);
  }
}
