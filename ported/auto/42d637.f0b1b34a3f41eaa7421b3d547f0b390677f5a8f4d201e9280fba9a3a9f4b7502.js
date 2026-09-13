// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d637.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408342 } from "./408342.js";
export function FUN_0042d637(heap) {
  let in_AX = regs.eax & 0xffff;
  if (0x5f593f < heap.u32(0x005f554c)) {
    (regs.eax = FUN_00408342(heap, heap.u32(0x005f5550), 0x005f5558, 1000));
    heap.setU32(0x005f554c, (0x005f5558) >>> 0);
  }
  heap.setU32(heap.u32(0x005f554c), (in_AX) & 0xffffffff);
  heap.setU32(0x005f554c, (heap.u32(0x005f554c) + 1) >>> 0);
  return;
}
