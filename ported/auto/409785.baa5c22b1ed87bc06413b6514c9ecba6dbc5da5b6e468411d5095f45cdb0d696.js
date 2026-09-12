// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409785.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_00409785(heap, param_1) {
  const __sp = heap.allocFrame(84);
  const __addr_local_68 = __sp + 0;
  const __addr_local_18 = __sp + 80;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  heap.setU32((__addr_local_68 + (0) * 4), (100) & 0xffffffff);
  heap.setU32(__addr_local_18, (0) >>> 0);
  while (iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((param_1 + 0x80))) + 0x14)), heap.u32((param_1 + 0x80)), 0, 0, 0, 0x1000400, __addr_local_68))) >>> 0), iVar1 != -0x7789fe3e || (iVar2 = (((regs.eax = FUN_00408d5d(heap))) >>> 0), iVar2 != 0)) {
    if (iVar1 != -0x7789fe3e) {
      return;
    }
  }
  return;
} finally {
    heap.freeFrame(84);
  }
}
