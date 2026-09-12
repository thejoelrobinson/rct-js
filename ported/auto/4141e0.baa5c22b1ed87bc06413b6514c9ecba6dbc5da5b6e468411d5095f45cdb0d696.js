// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4141e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00414300 } from "./414300.js";
export function FUN_004141e0(heap) {
  if (heap.u32(0x005ec288) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32(0x005ec288)));
  }
  (regs.eax = FUN_00414300(heap, 0x005e9008, 0x005e9010));
  return (regs.eax = FUN_00414300(heap, 0x005e9000, 0x005e9004));
}
