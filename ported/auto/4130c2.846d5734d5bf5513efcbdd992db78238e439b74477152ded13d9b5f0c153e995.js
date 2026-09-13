// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4130c2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ExceptionList } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413156 } from "./413156.js";
export function FUN_004130c2(heap, param_1, param_2) {
  const __sp = heap.allocFrame(4);
  const __addr_pvStack_1c = __sp + 0;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  let puStack_18 = 0;
  let local_14 = 0;
  let iStack_10 = 0;
  iStack_10 = ((param_1) >>> 0);
  puStack_18 = ((0x004130a0) >>> 0);
  heap.setU32(__addr_pvStack_1c, (ExceptionList) >>> 0);
  void (__addr_pvStack_1c) /* assign to ExceptionList elided (SEH not modelled) */;
  while (true) {
    iVar1 = ((heap.i32((param_1 + 8))) >>> 0);
    iVar2 = ((heap.i32((param_1 + 0xc))) >>> 0);
    if (((iVar2 | 0) == -1) || (iVar2 == param_2)) {
      break;
    }
    local_14 = ((heap.u32((iVar1 + iVar2 * 0xc))) >>> 0);
    heap.setU32((param_1 + 0xc), (local_14) & 0xffffffff);
    if (heap.i32((iVar1 + 4 + iVar2 * 0xc)) == 0) {
      (regs.eax = FUN_00413156(heap, 0x101));
      (regs.eax = callIndirect(heap, heap.u32((iVar1 + 8 + iVar2 * 0xc))));
    }
  }
  void (heap.u32(__addr_pvStack_1c)) /* assign to ExceptionList elided (SEH not modelled) */;
  return;
} finally {
    heap.freeFrame(4);
  }
}
