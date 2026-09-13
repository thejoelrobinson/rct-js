// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413020.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004151d0 } from "./4151d0.js";
import { FUN_00415210 } from "./415210.js";
export function FUN_00413020(heap, param_1) {
  if (heap.u32(0x005efeb4) == 1) {
    (regs.eax = FUN_004151d0(heap));
  }
  (regs.eax = FUN_00415210(heap, param_1));
  return (regs.eax = callIndirect(heap, heap.u32(0x005ec260), 0xff));
}
