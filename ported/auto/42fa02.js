// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fa02.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408342 } from "./408342.js";
export function FUN_0042fa02(heap) {
  heap.setU8(0x005f88b0, (heap.u8(0x005f8d36) + 0x1a67c) & 0xff);
  if (heap.u8(0x005f8d35) != 0) {
    heap.setU8(0x005f88b0, (heap.u8(0x005f8d36) + -0x1a67c) & 0xff);
  }
  return (regs.eax = FUN_00408342(heap, heap.u32(0x005f88a4), 0x005f88b0, 4));
}
