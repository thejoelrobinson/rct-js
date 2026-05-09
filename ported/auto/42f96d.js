// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f96d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408210 } from "./408210.js";
export function FUN_0042f96d(heap) {
  (regs.eax = FUN_00408210(heap, heap.u32(0x005f88a4), 0));
  heap.setU8(0x005f88ae, (0) & 0xff);
  heap.setU8(0x005f88ac, (0) & 0xff);
  return;
}
