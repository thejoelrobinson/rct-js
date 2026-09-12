// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4270f2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e38f5 } from "./5e38f5.js";
export function FUN_004270f2(heap) {
  let in_AX = regs.eax & 0xffff;
  if (in_AX != 0) {
    heap.setU8(0x0099c163, (heap.u32(0x008d7ea4)) & 0xff);
    return (regs.eax = FUN_005e38f5(heap));
  }
  return;
}
