// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e2225.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3874 } from "./5e3874.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_005e2225(heap) {
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = FUN_005e3ace(heap));
  if (unaff_ESI != 0) {
    (regs.eax = FUN_005e3874(heap));
  }
  return (regs.eax = callIndirect(heap, heap.u32((0x005e2248) + (heap.u8(0x00991f36)) * 4)));
}
