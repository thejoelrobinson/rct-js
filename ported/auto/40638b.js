// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40638b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0040638b(heap, param_1) {
  let uVar1 = 0;
  if (heap.u32(0x005ebe44) == 0) {
    heap.setU32(0x005ebe48, ((regs.eax = callIndirect(heap, heap.u32(0x005ebe78), param_1))) >>> 0);
    if (heap.u32(0x005ebe48) == 0) {
      uVar1 = ((0) >>> 0);
    } else {
      heap.setU32(0x005ebe4c, (0) >>> 0);
      heap.setU32(0x005f12b0, (param_1) >>> 0);
      heap.setU32(0x005ebe44, (1) >>> 0);
      uVar1 = ((1) >>> 0);
    }
  } else {
    uVar1 = ((0) >>> 0);
  }
  return uVar1;
}
