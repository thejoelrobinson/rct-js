// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458f25.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458c14 } from "./458c14.js";
export function FUN_00458f25(heap) {
  let in_AX = regs.eax & 0xffff;
  heap.setU32(0x00642fc2, ((in_AX >>> 3) + 1) >>> 0);
  heap.setU32(0x00642fc4, (in_AX & 7) >>> 0);
  return (regs.eax = FUN_00458c14(heap));
}
