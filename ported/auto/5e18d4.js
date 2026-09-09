// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e18d4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005e18d4(heap) {
  let unaff_ESI = regs.esi >>> 0;
  if (heap.i32((unaff_ESI + 8)) != 0) {
    return (regs.eax = callIndirect(heap, heap.u32((0x005e18ec) + (heap.u8(0x00991f88)) * 4)));
  }
  return;
}
