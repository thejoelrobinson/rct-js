// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d870c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005d870c(heap) {
  let unaff_ESI = regs.esi >>> 0;
  heap.setI16((unaff_ESI + 0x4e), (heap.i16((unaff_ESI + 0x4e)) + (-heap.i16((unaff_ESI + 0x4c)) >>> 6)) & 0xffff);
  return (regs.eax = callIndirect(heap, heap.u32((((0x0065de64) >>> 0) + (heap.u16((unaff_ESI + 0x36)) & 0xfffc)))));
}
