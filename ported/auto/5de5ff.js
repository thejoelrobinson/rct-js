// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5de5ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005de5ff(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e3b2b(heap));
  if (!bVar1) {
    (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  }
  return;
}
