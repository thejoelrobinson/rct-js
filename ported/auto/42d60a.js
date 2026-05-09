// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d60a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042d56c } from "./42d56c.js";
export function FUN_0042d60a(heap) {
  let uVar1 = 0;
  uVar1 = ((heap.u32(heap.u32(0x005f554c))) & 0xffff);
  heap.setU32(0x005f554c, (heap.u32(0x005f554c) + 1) >>> 0);
  if (heap.u32(0x005f5554) <= heap.u32(0x005f554c)) {
    (regs.eax = FUN_0042d56c(heap));
    heap.setU32(0x0099a4fe, (0) >>> 0);
  }
  return uVar1;
}
