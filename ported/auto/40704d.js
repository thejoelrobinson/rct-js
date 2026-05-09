// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40704d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0040704d(heap) {
  let iVar1 = 0;
  if ((heap.u32(0x005ebf00) != 0x0) && (heap.u32(0x005e916c) != 0)) {
    heap.setU32(0x005ebf08, (0) >>> 0);
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf00)) + 0x34)), heap.u32(0x005ebf00), heap.u32(0x005e916c), 6))) >>> 0);
    if (iVar1 == 0) {
      iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf00)) + 0x1c)), heap.u32(0x005ebf00)))) >>> 0);
      if (iVar1 == 0) {
        heap.setU32(0x005ebf08, (1) >>> 0);
      }
    }
  }
  return;
}
