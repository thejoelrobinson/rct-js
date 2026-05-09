// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3874.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005e3874(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let pcVar1 = 0;
  (regs.eax = callIndirect(heap, heap.u32(unaff_ESI)));
  for (pcVar1 = ((heap.u32(unaff_ESI + (7) * 4)) >>> 0); heap.i8(pcVar1) != 21; pcVar1 = (((pcVar1 + 0x10) >>> 0)) >>> 0) {
  
  }
  return;
}
