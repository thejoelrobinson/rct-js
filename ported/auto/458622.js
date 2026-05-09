// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458622.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009ba943 } from "./9ba943.js";
export function FUN_00458622(heap) {
  let uVar1 = 0;
  let extraout_CX = 0;
  (regs.eax = FUN_00458bcf(heap));
  heap.setU32(0x00971e84, (0xe0) >>> 0);
  (regs.eax = FUN_00458a7c(heap, 0x0099a888));
  uVar1 = (((regs.eax = FUN_009ba943(heap, extraout_CX))) >>> 0);
  return uVar1;
}
