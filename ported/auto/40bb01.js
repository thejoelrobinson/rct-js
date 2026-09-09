// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40bb01.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_0040bb01(heap, param_1, param_2) {
  const __sp = heap.allocFrame(40);
  const __addr_local_70 = __sp + 0;
  const __addr_local_60 = __sp + 16;
  const __addr_local_4c = __sp + 36;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  if ((heap.u32(0x005ebf64) == 0) && (heap.u32(0x005ebf34) != 0x0)) {
    _memset(heap, __addr_local_70, 0, 0x6c);
    heap.setU32((__addr_local_70 + (0) * 4), (0x6c) & 0xffffffff);
    do {
      iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 100)), heap.u32(0x005ebf34), 0, __addr_local_70, 1, 0))) >>> 0);
      if ((iVar1 == -0x7789fe3e) && (iVar2 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar2 == 0)) {
        break;
      }
    } while (iVar1 == -0x7789fe3e);
    if (iVar1 == 0) {
      heap.setU32(param_1, (heap.u32(__addr_local_4c)) & 0xffffffff);
      heap.setU32(param_2, (heap.u32(__addr_local_60)) & 0xffffffff);
      heap.setU32(0x005ebf64, (1) >>> 0);
      uVar3 = ((1) >>> 0);
    } else {
      uVar3 = ((0) >>> 0);
    }
  } else {
    uVar3 = ((0) >>> 0);
  }
  return uVar3;
} finally {
    heap.freeFrame(40);
  }
}
